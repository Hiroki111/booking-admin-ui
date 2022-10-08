import { CalendarContextProvider } from '../../../../../contexts/CalendarContext';
import { CalendarContent } from './CalendarContent';

export function Calendar() {
  return (
    <CalendarContextProvider>
      <CalendarContent />
    </CalendarContextProvider>
  );
}
