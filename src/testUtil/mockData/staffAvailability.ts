import { StaffAvailability } from '../../interfaces/staffAvailability';

const mockStaffAvailability: StaffAvailability = {
  id: 1,
  date: '2022-12-31',
  availableTimeSlots: [
    {
      startTime: '09:00',
      endTime: '09:30',
    },
  ],
};

export function createMockStaffAvailability(params?: Partial<StaffAvailability>) {
  return { ...mockStaffAvailability, ...params };
}
