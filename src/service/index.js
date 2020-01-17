import axios from 'axios';
export const getListBubbleTea = async () =>
  await fetch('https://boba.ansuzdev.com/api/bubbleTeas').then(res =>
    res.json()
  );

export const getListOrder = async () =>
  await fetch('https://boba.ansuzdev.com/api/orders?classCode=wd01').then(res =>
    res.json()
  );

export const lockOrder = async () =>
  await axios.put('https://boba.ansuzdev.com/api/orders/lock?classCode=wd01');

export const createOrder = async param => {
  try {
    await axios
      .post('https://boba.ansuzdev.com/api/orders', param)
      .then(res => res);
  } catch (error) {}
};
