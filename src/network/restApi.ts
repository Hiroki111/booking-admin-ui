import axios, { AxiosResponse } from 'axios';

import { Booking, CreateBookingRequestBody } from '../interfaces/booking';
import { Service } from '../interfaces/service';
import { Staff } from '../interfaces/staff';
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

  fetchBookings: async function (): Promise<Booking[]> {
    const res: AxiosResponse<Booking[]> = await axios({
      method: 'GET',
      url: '/api/bookings',
      headers: defaultHeaders,
    });
    return res.data;
  },

  fetchStaffList: async function (): Promise<Staff[]> {
    const res: AxiosResponse<Staff[]> = await axios({
      method: 'GET',
      url: '/api/staff',
    });
    return res.data;
  },

  fetchServices: async function (): Promise<Service[]> {
    const res: AxiosResponse<Service[]> = await axios({
      method: 'GET',
      url: '/api/services',
    });
    return res.data;
  },

  createBooking: async function (createBookingPayload: CreateBookingRequestBody): Promise<void> {
    // Note: I haven't made this endpoint
    try {
      await axios({
        method: 'POST',
        url: '/api/bookings-admin',
        data: createBookingPayload,
        headers: defaultHeaders,
      });
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  },
};

export default restApi;
