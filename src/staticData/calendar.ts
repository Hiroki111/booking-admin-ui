import dayjs from 'dayjs';

import { Booking } from '../interfaces/booking';
import { Service } from '../interfaces/service';
import { Staff } from '../interfaces/staff';

export const NEW_BOOKING_ID = -1;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DEFAULT_BOOKING = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  staffId: null as unknown as number,
  date: dayjs().format(DATE_FORMAT),
  startTime: '10:00',
  endTime: '11:00',
  staffAvailabilityId: null as unknown as number,
  totalPrice: 0,
  staff: {} as Staff,
  services: [] as Service[],
} as Booking;
