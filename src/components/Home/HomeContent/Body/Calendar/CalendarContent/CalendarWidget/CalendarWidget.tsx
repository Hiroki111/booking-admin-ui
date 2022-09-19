import { useEffect, useState, createRef, LegacyRef } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar, { DatesSetArg, EventClickArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { useBookingsQuery } from '../../../../../../../queries/booking';
import { Booking } from '../../../../../../../interfaces/booking';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useStyles } from './useStyles';
import { getPathWithParam } from '../../../../../../../services/routing';
import { PATHS } from '../../../../../../../staticData/routes';
import { UseCalendarState } from '../../../../../../../hooks/calendar';
import { CalendarView } from '../../../../../../../interfaces/calendar';

export function CalendarWidget() {
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const { selectedStaff, areAllStaffSelected, calendarApi, setCalendarApi, setCalendarTitle } = useCalendarContext();
  const { year, month, day, calendarView } = UseCalendarState();
  const fetchBookingsQuery = useBookingsQuery(year, month);
  const calendarRef: LegacyRef<FullCalendar> | undefined = createRef();
  const history = useHistory();

  useEffect(() => {
    const bookings = fetchBookingsQuery.data || [];
    const calendarEvents = bookings
      .filter((booking) => booking.staff.id === selectedStaff?.id || areAllStaffSelected)
      .map((booking) => convertBookingToCalendarEvent(booking));
    setCalendarEvents(calendarEvents);
  }, [fetchBookingsQuery.data, selectedStaff?.id, areAllStaffSelected]);

  useEffect(() => {
    if (!calendarRef?.current) {
      return;
    }
    setCalendarApi(calendarRef.current.getApi());
  }, [calendarRef, setCalendarApi]);

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
    history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': eventInfo.event.id }));
  }

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div className={classes.eventContent}>
        {calendarApi?.view?.type === CalendarView.Month && (
          <span>
            <b>{eventInfo?.timeText}</b>{' '}
          </span>
        )}
        {eventInfo?.event?.title}
        {calendarApi?.view?.type !== CalendarView.Month && (
          <span>
            {' '}
            <b>{eventInfo?.timeText}</b>
          </span>
        )}
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
        initialView={calendarView}
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
