import { Request, Response, NextFunction } from 'express';
import tapo, { TapoDeviceKey } from 'tp-link-tapo-connect';
import User from '../models/user-model.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, ip } = req.body;
    if (!username || !password || !ip) {
      res.status(400).json({
        message: 'Invalid request, make sure you send username password and ip',
      });
    } else {
      const userExists = await User.findOne({ where: { username: username } });

      if (userExists) {
        // @ts-ignore
        if (userExists.password !== password || userExists.ip !== ip) {
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          const deviceToken = format(userExists);
          await tapo.setBrightness(deviceToken, 50);
          setTimeout(async () => {
            await tapo.setBrightness(deviceToken, 10);
          }, 1000);
          res.status(200).json({
            message: 'Account successfully linked',
            username: username,
          });
        }
      } else {
        const deviceToken = await tapo.loginDeviceByIp(username, password, ip);
        if (!deviceToken) {
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          saveUser(username, password, ip, deviceToken);
          //@ts-ignore
          await tapo.setBrightness(deviceToken, 50);
          setTimeout(async () => {
            await tapo.setBrightness(deviceToken, 10);
          }, 1000);
          res.status(200).json({
            message: 'Account successfully linked',
            username: username,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    // @ts-ignore
    if (err.message === 'Invalid request or credentials') {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const color = async (req: Request, res: Response) => {
  try {
    const { rIndex, username } = req.body;
    if (!rIndex || !username) {
      res
        .status(400)
        .json({
          message: 'Invalid request, make sure you send rIndex and username',
        });
    } else {
      const user = await User.findOne({ where: { username: username } });
      if (user) {
        //@ts-ignore
        const deviceToken = format(user);
        if (+rIndex >= 0.5 || +rIndex <= -0.5) {
          await tapo.setColour(deviceToken, 'yellow');
          await tapo.setBrightness(deviceToken, 50);
          setTimeout(async () => {
            await tapo.setBrightness(deviceToken, 10);
          }, 1000);
        } else {
          await tapo.setColour(deviceToken, 'white');
          await tapo.setBrightness(deviceToken, 50);
          setTimeout(async () => {
            await tapo.setBrightness(deviceToken, 10);
          }, 1000);
        }
        res.status(200).json({ message: 'Success' });
      } else {
        res
          .status(401)
          .json({ message: 'user has not linked their tapo account' });
      }
    }
  } catch (err) {
    console.log(err);
    // @ts-ignore
    if (err.message === 'Device token expired or invalid') {
      console.log('fuck');
      //@ts-ignore
      await updateToken(req, res);
    }
    //@ts-ignor
    else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

async function updateToken(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username: username } });
    console.log('user in update', user);
    //@ts-ignore
    const { password, ip } = user;
    const deviceToken = await tapo.loginDeviceByIp(username, password, ip);

    user?.set({ deviceToken: JSON.stringify(deviceToken) });
    await user?.save();

    color(req, res);
  } catch (err) {
    console.log(err);
    // @ts-ignore
  }
}

// (async function fuckurtoken() {
//   const username = 'alexryanjones@gmx.com';
//   const user = await User.findOne({ where: { username: username } });
//   //@ts-ignore
//   const deviceToken = JSON.parse(user?.deviceToken);
//   deviceToken.token = 'CBDC9F9128B39F92C7C29C9236B51C93';
//   user?.set({ deviceToken: JSON.stringify(deviceToken) });
//   await user?.save();
// })();

async function saveUser(
  username: string,
  password: string,
  ip: string,
  deviceToken: TapoDeviceKey
) {
  const user = {
    username,
    password,
    ip,
    deviceToken: JSON.stringify(deviceToken),
  };
  await User.create(user);
}

function format(userExists: any) {
  const deviceToken = JSON.parse(userExists.deviceToken);
  const keyData = deviceToken.key.data;
  const ivData = deviceToken.iv.data;
  deviceToken.key = Buffer.from(keyData);
  deviceToken.iv = Buffer.from(ivData);
  return deviceToken;
}
