import { Booking } from '../../interfaces/booking';
import { createMockService } from './service';
import { createMockStaff } from './staff';

const mockStaff = createMockStaff();
const mockServices = [createMockService()];
const mockBooking: Booking = {
  id: 1,
  firstName: 'Harry',
  lastName: 'Potter',
  phoneNumber: '111222333',
  email: 'test@example.com',
  staffId: mockStaff.id,
  date: '2022-12-31',
  startTime: '09:00',
  endTime: '09:30',
  staffAvailabilityId: mockStaff.availableDates[0].id,
  totalPrice: 30,
  staff: mockStaff,
  services: mockServices,
};

export function createMockBooking(params?: Partial<Booking>) {
  return { ...mockBooking, ...params };
}
