import { ALL_STAFF, CalendarContextInterface } from '../contexts/CalendarContext';
import { CalendarView, CalendarViewKey } from '../interfaces/calendar';

export const mockCalendarContextValue: CalendarContextInterface = {
  selectedStaff: ALL_STAFF,
  calendarApi: null,
  calendarTitle: '',
  areAllStaffSelected: true, // selectedStaff.id === ALL_STAFF.id
  calendarViewKeys: Object.keys(CalendarView) as CalendarViewKey[],
  setSelectedStaff: jest.fn(),
  setCalendarApi: jest.fn(),
  setCalendarTitle: jest.fn(),
  updateCalendarView: jest.fn(),
};

export function getMockCalendarContextValue(params?: Partial<CalendarContextInterface>) {
  return { ...mockCalendarContextValue, ...params };
}
