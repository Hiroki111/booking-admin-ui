import { useEffect, useState } from 'react';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Paper } from '@material-ui/core';

import { useFetchBookingsQuery } from '../../../../queries/booking';
import { Booking } from '../../../../interfaces/booking';
import { useStyles } from './useStyles';

export function CalendarWidget() {
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const fetchBookingsQuery = useFetchBookingsQuery();
  const bookings = fetchBookingsQuery.data || [];

  useEffect(() => {
    const calendarEvents = bookings?.map((booking) => convertBookingToCalendarEvent(booking));
    setCalendarEvents(calendarEvents);
  }, [bookings]);

  function convertBookingToCalendarEvent(booking: Booking) {
    const title = booking.services.map((service) => service.name).join(', ');

    return {
      title,
      start: `${booking.date}T${booking.startTime}`,
      end: `${booking.date}T${booking.endTime}`,
    };
  }

  const newButton = {
    new: {
      text: 'new',
      click: () => console.log('new event'),
    },
  };

  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay new',
  };

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
    <Paper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        customButtons={newButton}
        headerToolbar={headerToolbar}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </Paper>
  );
}
