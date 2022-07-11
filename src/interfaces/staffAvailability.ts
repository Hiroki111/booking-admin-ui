import { Timeslot } from './timeslotSetting';

export interface StaffAvailability {
  id: number;
  date: string;
  availableTimeSlots: Timeslot[];
}
