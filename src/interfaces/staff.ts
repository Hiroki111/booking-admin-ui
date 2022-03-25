import { Service } from './service';

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
  availableTimeSlots: AvailableTimeSlotDto[];
}

export interface AvailableTimeSlotDto {
  startTime: string;
  endTime: string;
}
