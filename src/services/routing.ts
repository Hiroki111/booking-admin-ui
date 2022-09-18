import dayjs from 'dayjs';
import { CalendarViewKey } from '../interfaces/calendar';

interface PathParam {
  [pathName: string]: string;
}

export function getPathWithParam(path: string, pathParam: PathParam) {
  const searchParams = new URLSearchParams(window.location.search);
  const newPath = Object.keys(pathParam).reduce((newPath, pathName) => {
    const paramValue = pathParam[pathName];
    return newPath.replace(pathName, paramValue);
  }, path);

  if (searchParams.toString()?.length) {
    return `${newPath}?${searchParams.toString()}`;
  }
  return newPath;
}

export function getUrlWithDate(date: Date) {
  const searchParams = new URLSearchParams(window.location.search);
  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MM');
  const day = dayjs(date).format('DD');
  searchParams.set('year', year);
  searchParams.set('month', month);
  searchParams.set('day', day);

  return `${window.location.pathname}?${searchParams.toString()}`;
}

export function getUrlWithCalendarView(view: CalendarViewKey) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('view', view);

  return `${window.location.pathname}?${searchParams.toString()}`;
}
