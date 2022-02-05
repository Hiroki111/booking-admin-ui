import { RouteComponentProps } from 'react-router-dom';

import { Calendar } from './components/Calendar';
import { Login } from './components/Login';

export interface Route {
  path: string;
  component: React.FC<RouteComponentProps<any>> | React.FC<any>;
  exact?: boolean;
}

const calendar: Route = {
  path: '/',
  component: Calendar,
  exact: true,
};

const login: Route = {
  path: '/login',
  component: Login,
};

export const ROUTES = {
  calendar: calendar.path,
  login: login.path,
};
