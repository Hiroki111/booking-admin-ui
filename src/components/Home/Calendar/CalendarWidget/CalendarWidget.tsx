import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Paper } from '@material-ui/core';

export function CalendarWidget() {
  const mockEvents = [
    {
      title: 'event 1',
      start: '2022-02-14T10:00:00',
      end: '2022-02-14T12:00:00',
    },
    {
      title: 'event 2',
      start: '2022-02-18T10:00:00',
      end: '2022-02-18T12:00:00',
    },
  ];

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
      <>
        <b>{eventInfo?.timeText}</b>
        <i>{eventInfo?.event?.title}</i>
      </>
    );
  }

  return (
    <Paper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={mockEvents}
        customButtons={newButton}
        headerToolbar={headerToolbar}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
      />
    </Paper>
  );
}
