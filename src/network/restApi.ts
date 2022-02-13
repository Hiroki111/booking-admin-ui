import axios, { AxiosResponse } from 'axios';

import { User } from '../interfaces/user';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  authenticate: function (email: string, password: string): Promise<AxiosResponse<User>> {
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: { email, password },
      headers: defaultHeaders,
    });
  },

  logout: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'POST',
      url: '/api/auth/logout',
      headers: defaultHeaders,
    });
  },

  fetchLoggedInUser: function (): Promise<AxiosResponse<User>> {
    return axios({
      method: 'GET',
      url: '/api/auth/loggedInUser',
    });
  },
};

export default restApi;
