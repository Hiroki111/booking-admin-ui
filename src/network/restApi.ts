import axios, { AxiosResponse } from 'axios';

import { Booking, CreateBookingRequestBody, UpdateBookingRequestBody } from '../interfaces/booking';
import { Service } from '../interfaces/service';
import { Staff } from '../interfaces/staff';
import { StaffAvailability } from '../interfaces/staffAvailability';
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

  fetchBooking: async function (id: string | number): Promise<Booking> {
    const res: AxiosResponse<Booking> = await axios({
      method: 'GET',
      url: `/api/bookings/${id}`,
      headers: defaultHeaders,
    });
    return res.data;
  },

  fetchBookings: async function (year: string, month: string): Promise<Booking[]> {
    const res: AxiosResponse<Booking[]> = await axios({
      method: 'GET',
      url: `/api/admin/bookings?year=${year}&month=${month}`,
      headers: defaultHeaders,
    });
    return res.data;
  },

  fetchStaffList: async function (): Promise<Staff[]> {
    const res: AxiosResponse<Staff[]> = await axios({
      method: 'GET',
      url: '/api/admin/staff',
      headers: defaultHeaders,
    });
    return res.data;
  },

  fetchStaffAvailability: async function (
    staffId: number,
    date: string,
    availableBookingId: number,
  ): Promise<StaffAvailability> {
    const res: AxiosResponse<{ data: StaffAvailability[] }> = await axios({
      method: 'GET',
      url: `/api/admin/staff-availabilities?staffId=${staffId}&date=${date}&availableBookingId=${availableBookingId}`,
    });
    if (!res.data.data.length) {
      return {} as StaffAvailability;
    }
    return res.data.data[0];
  },

  fetchServices: async function (): Promise<Service[]> {
    const res: AxiosResponse<Service[]> = await axios({
      method: 'GET',
      url: '/api/services',
    });
    return res.data;
  },

  fetchTimeslots: async function (): Promise<Service[]> {
    const res: AxiosResponse<Service[]> = await axios({
      method: 'GET',
      url: '/api/admin/timeslots',
    });
    return res.data;
  },

  createBooking: async function (payload: CreateBookingRequestBody): Promise<Booking> {
    try {
      const res: AxiosResponse<Booking> = await axios({
        method: 'POST',
        url: '/api/admin/bookings',
        data: payload,
        headers: defaultHeaders,
      });
      return res.data;
    } catch (error: any) {
      if (error.isAxiosError && error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  },

  updateBooking: async function (payload: UpdateBookingRequestBody): Promise<Booking> {
    try {
      const res: AxiosResponse<Booking> = await axios({
        method: 'PUT',
        url: `/api/admin/bookings/${payload.id}`,
        data: payload,
        headers: defaultHeaders,
      });
      return res.data;
    } catch (error: any) {
      if (error.isAxiosError && error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  },
};

export default restApi;
