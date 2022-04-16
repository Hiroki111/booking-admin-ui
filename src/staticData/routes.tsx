import { RouteProps } from 'react-router-dom';

import { Calendar } from '../components/Home/HomeContent/Body/Calendar';

export const PATHS = {
  calendar: '/calendar',
  calendarBookingEditId: '/calendar/booking/edit/:id',
  login: '/login',
};

// Used under <Body/>
export const MODULE_ROUTES: RouteProps[] = [
  {
    path: PATHS.calendar,
    component: Calendar,
  },
];

export const PROTECTED_PATHS = [PATHS.calendar, PATHS.calendarBookingEditId];
