import axios, { AxiosResponse } from 'axios';

import { Booking, CreateBookingRequestBody, UpdateBookingRequestBody } from '../interfaces/booking';
import { Service } from '../interfaces/service';
import { CreateStaffRequestBody, Staff, UpdateStaffRequestBody } from '../interfaces/staff';
import { StaffAvailability } from '../interfaces/staffAvailability';
import { User } from '../interfaces/user';
import { BookingRequestError } from './error';

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

  // NOTE: Shouldn't it use "/api/admin/bookings/{id}" ?
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

  fetchStaff: async function (id: string | number): Promise<Staff> {
    const res: AxiosResponse<Staff> = await axios({
      method: 'GET',
      url: `/api/admin/staff/${id}`,
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

  uploadAvatarImageMutation: async function (staffId: string | number, base64Image: string): Promise<void> {
    await axios({
      method: 'PUT',
      url: `/api/admin/staff/avatar/${staffId}`,
      data: { base64Image },
      headers: defaultHeaders,
    });
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
      if (error.isAxiosError) {
        throw new BookingRequestError(
          error?.response?.data?.message || 'API request failed',
          error?.response?.data?.details,
        );
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
      if (error.isAxiosError) {
        throw new BookingRequestError(
          error?.response?.data?.message || 'API request failed',
          error?.response?.data?.details,
        );
      }
      throw new Error(error);
    }
  },

  createStaff: async function (payload: CreateStaffRequestBody): Promise<Staff> {
    try {
      const res: AxiosResponse<Staff> = await axios({
        method: 'POST',
        url: '/api/admin/staff',
        data: payload,
        headers: defaultHeaders,
      });
      return res.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new BookingRequestError(
          error?.response?.data?.message || 'API request failed',
          error?.response?.data?.details,
        );
      }
      throw error;
    }
  },

  updateStaff: async function (payload: UpdateStaffRequestBody): Promise<Staff> {
    try {
      const res: AxiosResponse<Staff> = await axios({
        method: 'PUT',
        url: `/api/admin/staff/${payload.id}`,
        data: payload,
        headers: defaultHeaders,
      });
      return res.data;
    } catch (error: any) {
      if (error.isAxiosError && error?.response?.data?.details) {
        // TODO: Don't use BookingRequestError.
        // This isn't for booking requests
        throw new BookingRequestError(
          error?.response?.data?.message || 'API request failed',
          error?.response?.data?.details,
        );
      }
      throw error;
    }
  },
};

export default restApi;
