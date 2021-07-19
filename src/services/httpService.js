import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;
axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  const expectedError = response && response.status >= 400 && response.status < 500;

  if (expectedError) {
    toast.error(response.data);
  } else {
    toast.error('Ocorreu algum erro inesperado!');
  }

  return Promise.reject(error);
});

export default {
  ...axios,
};
