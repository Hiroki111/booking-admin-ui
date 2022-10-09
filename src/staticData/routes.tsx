import { RouteProps } from 'react-router-dom';

import { Calendar } from '../components/Home/HomeContent/Body/Calendar';
import { Staff } from '../components/Home/HomeContent/Body/Staff';

export const LOGIN_PAGE_PATH = '/login';

export enum PATHS {
  calendar = '/calendar',
  calendarBookingEditId = '/calendar/booking/edit/:id',
  staff = '/staff',
  staffAvailabilities = '/staff/availabilities',
}

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
