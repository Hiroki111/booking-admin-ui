import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Paper } from '@material-ui/core';

export function CalendarWidget() {
  return (
    <Paper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2022-02-15' },
          { title: 'event 2', date: '2022-02-22' },
        ]}
      />
    </Paper>
  );
}
