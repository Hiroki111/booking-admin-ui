import { AvailableDate } from '../../interfaces/staff';

const mockAvailableDate: AvailableDate = {
  id: 1,
  date: '2022-12-31',
  availableTimeSlots: [
    {
      startTime: '09:00',
      endTime: '09:30',
    },
  ],
};

export function createMockAvailableDate(params?: Partial<AvailableDate>) {
  return { ...mockAvailableDate, ...params };
}
