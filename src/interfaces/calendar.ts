import { Staff } from './staff';

export enum CalendarView {
  Day = 'timeGridDay',
  Week = 'timeGridWeek',
  Month = 'dayGridMonth',
}

export type CalendarViewKey = keyof typeof CalendarView;

export type StaffOption = Pick<Staff, 'id' | 'name'>;
