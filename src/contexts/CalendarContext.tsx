import React, { createContext, useState } from 'react';
import { Staff } from '../interfaces/staff';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export type AllStaff = Pick<Staff, 'id' | 'name'>;

export interface CalendarContextInterface {
  selectedStaff: Staff | AllStaff | null;
  setSelectedStaff: (staff: Staff | AllStaff | null) => void;
  areAllStaffSelected: boolean;
}

export const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const ALL_STAFF: AllStaff = { id: -1, name: 'ALL STAFF' };

export function CalendarContextProvider({ children }: Props) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | AllStaff | null>(ALL_STAFF);
  const areAllStaffSelected = selectedStaff?.id === ALL_STAFF?.id;

  const contextValue: CalendarContextInterface = {
    selectedStaff,
    setSelectedStaff,
    areAllStaffSelected,
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
