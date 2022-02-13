import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@material-ui/core';

// example data
const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export function CalendarWidget() {
  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={7.5} endDayHour={19.5} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}
