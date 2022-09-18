import dayjs from 'dayjs';

import { CalendarView, CalendarViewKey } from '../interfaces/calendar';
import { DEFAULT_CALENDAR_VIEW_KEY } from '../staticData/calendar';
import { UseUrlQueryParams } from './url';

export function UseCalendarState() {
  const urlQueryParams = UseUrlQueryParams();

  const year = urlQueryParams.get('year') || dayjs().format('YYYY');
  const month = urlQueryParams.get('month') || dayjs().format('MM');
  const day = urlQueryParams.get('day') || dayjs().format('DD');
  const calendarViewKey = (urlQueryParams.get('view') as CalendarViewKey) || DEFAULT_CALENDAR_VIEW_KEY;
  const calendarView = getCalendarView(calendarViewKey);

  return { year, month, day, calendarViewKey, calendarView };
}

function getCalendarView(calendarViewKey: CalendarViewKey | null) {
  if (!calendarViewKey || !CalendarView[calendarViewKey]) {
    return CalendarView[DEFAULT_CALENDAR_VIEW_KEY];
  }

  return CalendarView[calendarViewKey];
}
