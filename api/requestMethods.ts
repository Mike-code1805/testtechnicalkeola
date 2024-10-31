import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MESSAGE_ERROR_CONNECTION } from '@/constants';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 8000;

const userRequest = axios.create();

userRequest.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers !== undefined) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleErrorResponse = (error: any) => {
  console.log('IM IN handleErrorResponse');
  console.log(error);
  if (error.message === 'timeout of 8000ms exceeded') {
    return Promise.reject(new Error(MESSAGE_ERROR_CONNECTION));
  }

  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message;

    if (status === 400 || status === 401) {
      return Promise.reject(new Error(message));
    }
  }

  return Promise.reject(new Error(MESSAGE_ERROR_CONNECTION));
};

publicRequest.interceptors.response.use((response) => response, handleErrorResponse);

userRequest.interceptors.response.use((response) => response, handleErrorResponse);

export { publicRequest, userRequest };
