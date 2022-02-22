import { Service } from './service';
import { Staff } from './staff';

export interface Booking {
  date: string;
  startTime: string;
  endTime: string;
  staff: Staff;
  services: Service[];
}
