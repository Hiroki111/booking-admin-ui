import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CalendarContextProvider } from '../../../../../contexts/CalendarContext';
import { CalendarContent } from './CalendarContent';

export function Calendar() {
  return (
    <CalendarContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarContent />
      </LocalizationProvider>
    </CalendarContextProvider>
  );
}
