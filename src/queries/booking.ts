import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { Booking, CreateBookingRequestBody, UpdateBookingRequestBody } from '../interfaces/booking';

import restApi from '../network/restApi';
import { NEW_BOOKING_ID } from '../staticData/calendar';

export enum bookingQuries {
  fetchBooking = 'fetchBooking',
  fetchBookings = 'fetchBookings',
  createBooking = 'createBooking',
}

export function useBookingQuery(id: string | number): UseQueryResult<Booking> {
  return useQuery(bookingQuries.fetchBooking, () => restApi.fetchBooking(id), {
    enabled: id !== String(NEW_BOOKING_ID),
  });
}

export function useBookingsQuery(year: string, month: string): UseQueryResult<Booking[]> {
  return useQuery([bookingQuries.fetchBookings, year, month], () => restApi.fetchBookings(year, month), {
    enabled: Boolean(year) && Boolean(month),
  });
}

export function useSaveBookingMutation(id: string | number) {
  return useMutation(bookingQuries.createBooking, (payload: CreateBookingRequestBody | UpdateBookingRequestBody) => {
    if (id === String(NEW_BOOKING_ID)) {
      return restApi.createBooking(payload as CreateBookingRequestBody);
    }
    return restApi.updateBooking(payload as UpdateBookingRequestBody);
  });
}
