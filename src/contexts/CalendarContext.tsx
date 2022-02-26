import { CalendarApi } from '@fullcalendar/react';
import React, { createContext, useState } from 'react';

import { Staff } from '../interfaces/staff';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export type AllStaff = Pick<Staff, 'id' | 'name'>;

export interface CalendarContextInterface {
  selectedStaff: Staff | AllStaff | null;
  calendarApi: CalendarApi | null;
  calendarTitle: string;
  areAllStaffSelected: boolean;
  setSelectedStaff: (staff: Staff | AllStaff | null) => void;
  setCalendarApi: (calendarApi: CalendarApi) => void;
  setCalendarTitle: (calendarTitle: string) => void;
}

export const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const ALL_STAFF: AllStaff = { id: -1, name: 'ALL STAFF' };

export function CalendarContextProvider({ children }: Props) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | AllStaff | null>(ALL_STAFF);
  const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);
  const [calendarTitle, setCalendarTitle] = useState<string>('');
  const areAllStaffSelected = selectedStaff?.id === ALL_STAFF?.id;

  const contextValue: CalendarContextInterface = {
    selectedStaff,
    calendarApi,
    calendarTitle,
    areAllStaffSelected,
    setSelectedStaff,
    setCalendarApi,
    setCalendarTitle,
  };

  return <CalendarContext.Provider value={contextValue}>{children}</CalendarContext.Provider>;
}

export function useCalendarContext() {
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('CalendarContext must be used within CalendarContextProvider');
  }
  return context;
}
