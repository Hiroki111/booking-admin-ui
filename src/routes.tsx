import { RouteProps } from 'react-router-dom';

import { Calendar } from './components/Home/Calendar';
import { Login } from './components/Login';

const calendar: RouteProps = {
  path: '/',
  component: Calendar,
  exact: true,
};

const login: RouteProps = {
  path: '/login',
  component: Login,
};

export const PATHS: Record<string, string> = {
  calendar: calendar.path as string,
  login: login.path as string,
};

export const PROTECTED_ROUTES: RouteProps[] = [calendar];
