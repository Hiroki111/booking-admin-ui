import dayjs from 'dayjs';

import { AvailableTimeSlotDto } from '../interfaces/staff';

// not tested yet
export function findTimeSlotByStartAndEndTime(timeslots: AvailableTimeSlotDto[], startTime: string, endTime: string) {
  const start = dayjs(`2000-01-01 ${startTime}`);
  const end = dayjs(`2000-01-01 ${endTime}`);
  const totalMinutesRequired = end.diff(start, 'minute');
  const availableTimeSlot = timeslots.find((availableTimeSlot, i) =>
    hasEnoughLengthOfTimeslots(availableTimeSlot, timeslots, i, totalMinutesRequired, 0),
  );

  return availableTimeSlot;
}

// not tested yet
export function hasEnoughLengthOfTimeslots(
  currentTimeslot: AvailableTimeSlotDto,
  allTimeslots: AvailableTimeSlotDto[],
  currentTimeslotIndex: number,
  totalMinutesRequired: number,
  accumlatedTimeslotLength: number,
): boolean {
  const start = dayjs(`2000-01-01 ${currentTimeslot.startTime}`);
  const end = dayjs(`2000-01-01 ${currentTimeslot.endTime}`);
  const length = end.diff(start, 'minute');

  if (totalMinutesRequired <= length + accumlatedTimeslotLength) {
    return true;
  }

  const nextTimeslot = allTimeslots[currentTimeslotIndex + 1];
  if (!nextTimeslot) {
    return false;
  }

  if (currentTimeslot.endTime !== nextTimeslot.startTime) {
    return false;
  }

  return hasEnoughLengthOfTimeslots(
    nextTimeslot,
    allTimeslots,
    currentTimeslotIndex + 1,
    totalMinutesRequired,
    length + accumlatedTimeslotLength,
  );
}
