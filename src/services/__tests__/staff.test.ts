import { findTimeSlotByStartAndEndTime } from '../staff';

describe('services/staff', () => {
  describe('findTimeSlotByStartAndEndTime', () => {
    it('should return the earliest available timeslot', () => {
      const timeslots = [
        { startTime: '10:00', endTime: '10:30' },
        { startTime: '10:30', endTime: '11:00' },
        { startTime: '11:00', endTime: '11:30' },
        { startTime: '11:30', endTime: '12:00' },
      ];
      const startTime = '10:30';
      const endTime = '11:10';
      const availableTimeslot = findTimeSlotByStartAndEndTime(timeslots, startTime, endTime);
      expect(availableTimeslot).toEqual({ startTime: '10:30', endTime: '11:00' });
    });

    it('should return undefined if no timeslot is available for the start/end time', () => {
      const timeslots = [
        { startTime: '10:00', endTime: '10:30' },
        { startTime: '10:30', endTime: '11:00' },
        { startTime: '11:30', endTime: '12:00' },
      ];
      const startTime = '10:00';
      const endTime = '11:10';
      const availableTimeslot = findTimeSlotByStartAndEndTime(timeslots, startTime, endTime);
      expect(availableTimeslot).toEqual(undefined);
    });

    it('should return undefined if the start time is not covered', () => {
      const timeslots = [
        { startTime: '10:00', endTime: '10:30' },
        { startTime: '10:30', endTime: '11:00' },
      ];
      const startTime = '09:00';
      const endTime = '10:10';
      const availableTimeslot = findTimeSlotByStartAndEndTime(timeslots, startTime, endTime);
      expect(availableTimeslot).toEqual(undefined);
    });

    it('should return undefined if the end time is not covered', () => {
      const timeslots = [
        { startTime: '10:00', endTime: '10:30' },
        { startTime: '10:30', endTime: '11:00' },
      ];
      const startTime = '10:00';
      const endTime = '11:10';
      const availableTimeslot = findTimeSlotByStartAndEndTime(timeslots, startTime, endTime);
      expect(availableTimeslot).toEqual(undefined);
    });
  });
});
