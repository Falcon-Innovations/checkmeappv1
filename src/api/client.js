import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://67.205.166.151/';

let token;
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (err) {
    Promise.reject(err);
  }
  return token;
};

getToken()
  .then((result) => {
    token = result;
  })
  .catch((err) => {
    Promise.reject(err);
  });

const headers = {
  'Content-type': 'Application/json',
  Authorization: `Bearer ${token}`,
};

export default axios.create({
  baseURL: BASE_URL,
  headers: { ...headers },
});
