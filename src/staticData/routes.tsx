import { RouteProps } from 'react-router-dom';

import { Calendar } from '../components/Home/HomeContent/Body/Calendar';
import { Staff } from '../components/Home/HomeContent/Body/Staff';

export const PATHS = {
  login: '/login',
  calendar: '/calendar',
  calendarBookingEditId: '/calendar/booking/edit/:id',
  staff: '/staff',
};

// Used under <Body/>
export const MODULE_ROUTES: RouteProps[] = [
  {
    path: PATHS.calendar,
    component: Calendar,
  },
  {
    path: PATHS.staff,
    component: Staff,
  },
];

export const PROTECTED_PATHS = [PATHS.calendar, PATHS.calendarBookingEditId, PATHS.staff];
