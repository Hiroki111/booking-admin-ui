import { useQuery, UseQueryResult, useMutation } from 'react-query';
import { Booking, CreateBookingRequestBody } from '../interfaces/booking';

import restApi from '../network/restApi';

export enum bookingQuries {
  fetchBookings = 'fetchBookings',
  createBooking = 'createBooking',
}

export function useBookingsQuery(): UseQueryResult<Booking[]> {
  return useQuery(bookingQuries.fetchBookings, restApi.fetchBookings);
}

export function useCreateBookingMutation() {
  return useMutation(bookingQuries.createBooking, (createBookingPayload: CreateBookingRequestBody) =>
    restApi.createBooking(createBookingPayload),
  );
}
