/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from './_axios';
import { Constants } from '../helpers';

const {
  login_api,
  signup_api
} = Constants;

export const signUp = async (user, callback) => {
  try {
    const { data } = await axios.post(signup_api, user);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logIn = async (auth, callback) => {
  try {
    const { data } = await axios.post(login_api, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};


