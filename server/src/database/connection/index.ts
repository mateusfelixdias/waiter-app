import { connect } from 'mongoose';

export const connection = async () => {
  try {
    await connect('mongodb://localhost:27017/waiter-app');

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
