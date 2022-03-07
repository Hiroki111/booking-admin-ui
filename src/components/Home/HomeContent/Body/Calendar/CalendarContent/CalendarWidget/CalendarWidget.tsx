import { useEffect, useState, createRef, LegacyRef } from 'react';
import FullCalendar, { DatesSetArg, EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { useFetchBookingsQuery } from '../../../../../../../queries/booking';
import { Booking } from '../../../../../../../interfaces/booking';
import { useStyles } from './useStyles';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';

export function CalendarWidget() {
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const { selectedStaff, areAllStaffSelected, setCalendarApi, setCalendarTitle } = useCalendarContext();
  const fetchBookingsQuery = useFetchBookingsQuery();
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

  function convertBookingToCalendarEvent(booking: Booking) {
    return {
      title: booking.services.map((service) => service.name).join(', '),
      start: `${booking.date}T${booking.startTime}`,
      end: `${booking.date}T${booking.endTime}`,
    };
  }

  function handleDateClick(dateInfo: DateClickArg) {
    console.log(dateInfo);
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
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
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
