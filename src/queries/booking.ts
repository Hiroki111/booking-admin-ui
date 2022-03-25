import { useQuery, UseQueryResult } from 'react-query';
import { Booking } from '../interfaces/booking';

import restApi from '../network/restApi';

export enum bookingQuries {
  fetchBookings = 'fetchBookings',
}

export function useBookingsQuery(): UseQueryResult<Booking[]> {
  return useQuery(bookingQuries.fetchBookings, restApi.fetchBookings);
}
