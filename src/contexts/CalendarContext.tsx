import { CalendarApi } from '@fullcalendar/react';
import React, { createContext, useState } from 'react';
import { CalendarView, CalendarViewKey } from '../interfaces/calendar';

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
  calendarViewKeys: CalendarViewKey[];
  setSelectedStaff: (staff: Staff | AllStaff | null) => void;
  setCalendarApi: (calendarApi: CalendarApi) => void;
  setCalendarTitle: (calendarTitle: string) => void;
  updateCalendarView: (view: CalendarViewKey) => void;
}

export const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const ALL_STAFF: AllStaff = { id: -1, name: 'ALL STAFF' };

export function CalendarContextProvider({ children }: Props) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | AllStaff | null>(ALL_STAFF);
  const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);
  const [calendarTitle, setCalendarTitle] = useState<string>('');

  const areAllStaffSelected = selectedStaff?.id === ALL_STAFF?.id;
  const calendarViewKeys = Object.keys(CalendarView) as CalendarViewKey[];

  function updateCalendarView(view: CalendarViewKey) {
    calendarApi?.changeView(CalendarView[view]);
  }

  const contextValue: CalendarContextInterface = {
    selectedStaff,
    calendarApi,
    calendarTitle,
    areAllStaffSelected,
    calendarViewKeys,
    setSelectedStaff,
    setCalendarApi,
    setCalendarTitle,
    updateCalendarView,
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
