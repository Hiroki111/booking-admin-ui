import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { Booking, CreateBookingRequestBody } from '../interfaces/booking';

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

export function useBookingsQuery(): UseQueryResult<Booking[]> {
  return useQuery(bookingQuries.fetchBookings, restApi.fetchBookings);
}

export function useCreateBookingMutation() {
  return useMutation(bookingQuries.createBooking, (createBookingPayload: CreateBookingRequestBody) =>
    restApi.createBooking(createBookingPayload),
  );
}
