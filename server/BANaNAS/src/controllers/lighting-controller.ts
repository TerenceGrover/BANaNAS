import { Request, Response, NextFunction } from 'express';
import tapo, { TapoDeviceKey } from 'tp-link-tapo-connect';
import User from '../models/user-model.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, ip } = req.body;
    const userExists = await User.findOne({ where: { username: username } });

    if (userExists) {
      //@ts-ignore
      const deviceToken = format(userExists);
      flicker(deviceToken);
    } else {
      const deviceToken = await tapo.loginDeviceByIp(username, password, ip);
      if (!deviceToken) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      saveUser(username, password, deviceToken);
      //@ts-ignore
      flicker(deviceToken);
    }
    res.status(200).json({ message: 'Success', username: username });
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
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      //@ts-ignore
      const deviceToken = format(user);

      if (+rIndex >= 0.5 || +rIndex <= -0.5) {
        const done = await tapo.setColour(deviceToken, 'yellow');
        res.status(200).json({
          message:
            'grab a tinfoil hat mate, you just found yourself some sweet sweet causation.',
        });
      } else {
        flicker(deviceToken);

        res.status(200).json({
          message: 'keep fishing, you are getting closer to the truth.',
        });
      }
    } else {
      res
        .status(401)
        .json({ message: 'user has not linked their tapo account' });
    }
  } catch (err) {
    console.log(err);
    // @ts-ignore
    if (err.message === 'Device token expired or invalid') {
      console.log('fuck');
      //@ts-ignore
      await updateToken(req, res);
    }
    //@ts-ignore
    if (err.message === 'Invalid request or credentials') {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

async function updateToken(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      //@ts-ignore
      const { password, ip } = user;
      const deviceToken = await tapo.loginDeviceByIp(username, password, ip);

      const updateInfo = {
        username,
        password,
        deviceToken: JSON.stringify(deviceToken),
      };
      await User.update(updateInfo, { where: { username: username } });
      color(req, res);
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
}

async function flicker(deviceToken: TapoDeviceKey) {
  await tapo.setBrightness(deviceToken, 50);
  setTimeout(async () => {
    await tapo.setBrightness(deviceToken, 10);
  }, 1000);
}

async function saveUser(
  username: string,
  password: string,
  deviceToken: TapoDeviceKey
) {
  const user = {
    username,
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
