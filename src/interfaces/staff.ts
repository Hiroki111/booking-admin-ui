import { Service } from './service';
import { Timeslot } from './timeslotSetting';

export interface Staff {
  id: number;
  name: string;
  profilePhotoUrl: string | null;
  title: string | null;
  services: Service[];
  availableDates: AvailableDate[];
}

export interface AvailableDate {
  id: number;
  date: string;
  availableTimeSlots: Timeslot[];
}
