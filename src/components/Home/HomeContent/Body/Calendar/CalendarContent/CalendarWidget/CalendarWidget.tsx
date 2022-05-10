import { useEffect, useState, createRef, LegacyRef } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar, { DatesSetArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayjs from 'dayjs';

import { useBookingsQuery } from '../../../../../../../queries/booking';
import { Booking } from '../../../../../../../interfaces/booking';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { UseUrlQueryParams } from '../../../../../../../hooks/url';
import { useStyles } from './useStyles';
import { CalendarView, CalendarViewKey } from '../../../../../../../interfaces/calendar';
import { getPathWithParam } from '../../../../../../../services/routing';
import { PATHS } from '../../../../../../../staticData/routes';

export function CalendarWidget() {
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const { selectedStaff, areAllStaffSelected, setCalendarApi, setCalendarTitle } = useCalendarContext();
  const urlQueryParams = UseUrlQueryParams();
  const initialView = getInitialCalendarView(urlQueryParams.get('view') as CalendarViewKey);
  const year = urlQueryParams.get('year') || dayjs().format('YYYY');
  const month = urlQueryParams.get('month') || dayjs().format('MM');
  const day = dayjs().format('DD');
  const fetchBookingsQuery = useBookingsQuery(year, month);
  const calendarRef: LegacyRef<FullCalendar> | undefined = createRef();
  const history = useHistory();

  useEffect(() => {
    const bookings = fetchBookingsQuery.data || [];
    const calendarEvents = bookings
      ?.filter((booking) => booking.staff.id === selectedStaff?.id || areAllStaffSelected)
      .map((booking) => convertBookingToCalendarEvent(booking));
    setCalendarEvents(calendarEvents);
  }, [fetchBookingsQuery.data, selectedStaff?.id, areAllStaffSelected]);

  useEffect(() => {
    if (!calendarRef?.current) {
      return;
    }
    setCalendarApi(calendarRef.current.getApi());
  }, [calendarRef, setCalendarApi]);

  function getInitialCalendarView(calendarViewKey: CalendarViewKey | null) {
    if (calendarViewKey === 'Day') {
      return CalendarView.Day;
    } else if (calendarViewKey === 'Month') {
      return CalendarView.Month;
    }
    return CalendarView.Week;
  }

  function convertBookingToCalendarEvent(booking: Booking) {
    return {
      id: booking.id,
      title: booking.services.map((service) => service.name).join(', '),
      start: `${booking.date}T${booking.startTime}`,
      end: `${booking.date}T${booking.endTime}`,
    };
  }

  function handleDateClick(dateInfo: DateClickArg) {
    // console.log(dateInfo);
  }

  function handleEventClick(eventInfo: EventClickArg) {
    console.log({ eventInfo: eventInfo.event.id });
    history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': eventInfo.event.id }));
  }

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div className={classes.eventContent}>
        <i>
          <b>{eventInfo?.timeText}</b> {eventInfo?.event?.title}
        </i>
      </div>
    );
  }

  return (
    <div className={classes.calendarWidgetContainer}>
      {fetchBookingsQuery.isError && <WarningAlert message={'It failed to load booking data'} />}
      <FullCalendar
        ref={calendarRef}
        initialDate={`${year}-${month}-${day}`}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={initialView}
        events={calendarEvents}
        datesSet={(arg: DatesSetArg) => setCalendarTitle(arg.view.title)}
        headerToolbar={false}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </div>
  );
}
