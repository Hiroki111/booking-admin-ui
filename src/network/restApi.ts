import axios, { AxiosResponse } from 'axios';

import { AuthenticateResponseBodyDto } from '../interfaces/authenticate';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  authenticate: function (email: string, password: string): Promise<AxiosResponse<AuthenticateResponseBodyDto>> {
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

  checkLoginStatus: function (): Promise<AxiosResponse<string>> {
    return axios({
      method: 'GET',
      url: '/api/auth/checkToken',
    });
  },
};

export default restApi;
