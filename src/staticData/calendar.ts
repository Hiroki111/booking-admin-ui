import dayjs from 'dayjs';

import { Booking } from '../interfaces/booking';
import { CalendarViewKey } from '../interfaces/calendar';
import { Service } from '../interfaces/service';
import { Staff } from '../interfaces/staff';

export const NEW_BOOKING_ID = -1;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DEFAULT_BOOKING = {
  id: NEW_BOOKING_ID,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  staffId: -1,
  date: dayjs().format(DATE_FORMAT),
  startTime: '10:00',
  endTime: '11:00',
  staffAvailabilityId: null as unknown as number,
  totalPrice: 0,
  staff: {
    id: -1,
    name: '',
    services: [] as Service[],
  } as Staff,
  services: [] as Service[],
} as Booking;

export const DEFAULT_CALENDAR_VIEW_KEY = 'Week' as CalendarViewKey;
