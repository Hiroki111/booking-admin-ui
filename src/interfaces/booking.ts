import { Service } from './service';
import { Staff } from './staff';

export interface Booking {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
  staffAvailabilityId: number;
  totalPrice: number;
  staff: Staff;
  services: Service[];
}

export interface BookingEditFieldObject {
  label: string;
  fieldName: keyof Booking;
}
