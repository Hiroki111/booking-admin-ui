import { useEffect, useState, createRef, LegacyRef } from 'react';
import FullCalendar, { DatesSetArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayjs from 'dayjs';

import { useBookingsQuery } from '../../../../../../../queries/booking';
import { Booking } from '../../../../../../../interfaces/booking';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { UseUrlQuery } from '../../../../../../../hooks/url';
import { useStyles } from './useStyles';
import { CalendarView, CalendarViewKey } from '../../../../../../../interfaces/calendar';

export function CalendarWidget() {
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const { selectedStaff, areAllStaffSelected, setCalendarApi, setCalendarTitle } = useCalendarContext();
  const urlQuery = UseUrlQuery();
  const initialView = getInitialCalendarView(urlQuery.get('view') as CalendarViewKey);
  const year = urlQuery.get('year') || dayjs().format('YYYY');
  const month = urlQuery.get('month') || dayjs().format('MM');
  const day = dayjs().format('DD');
  const fetchBookingsQuery = useBookingsQuery(year, month);
  const calendarRef: LegacyRef<FullCalendar> | undefined = createRef();

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
      title: booking.services.map((service) => service.name).join(', '),
      start: `${booking.date}T${booking.startTime}`,
      end: `${booking.date}T${booking.endTime}`,
    };
  }

  function handleDateClick(dateInfo: DateClickArg) {
    // console.log(dateInfo);
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
