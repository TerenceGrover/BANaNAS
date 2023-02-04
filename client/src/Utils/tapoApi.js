import {
  loginDeviceByIp,
  getDeviceInfo,
  turnOn,
  turnOff,
  setBrightness,
} from 'tp-link-tapo-connect';

export async function tapoConnect(email, password, ip) {

  const deviceToken = await loginDeviceByIp(
    email,
    password,
    ip
  );

  return deviceToken;

  // turnOff(deviceToken);
  // setBrightness(deviceToken, 100);
}

export async function tapoTurnOn(deviceToken) {
  turnOn(deviceToken);
}

