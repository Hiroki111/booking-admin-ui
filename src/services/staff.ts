import dayjs from 'dayjs';

import { Timeslot } from '../interfaces/timeslotSetting';

// not tested yet
export function findTimeSlotByStartAndEndTime(timeslots: Timeslot[], startTime: string, endTime: string) {
  if (!timeslots?.length) {
    return undefined;
  }
  const start = dayjs(`2000-01-01 ${startTime}`);
  const end = dayjs(`2000-01-01 ${endTime}`);
  const totalMinutesRequired = end.diff(start, 'minute');

  const earliestTimeInTimeslots = dayjs(`2000-01-01 ${timeslots[0].startTime}`);
  const latestTimeInTimeslots = dayjs(`2000-01-01 ${timeslots[timeslots.length - 1].endTime}`);
  if (start < earliestTimeInTimeslots) {
    return undefined;
  } else if (latestTimeInTimeslots < end) {
    return undefined;
  }

  const availableTimeSlot = timeslots.find((availableTimeSlot, i) =>
    hasEnoughLengthOfTimeslots(availableTimeSlot, timeslots, i, totalMinutesRequired, 0),
  );

  return availableTimeSlot;
}

// not tested yet
export function hasEnoughLengthOfTimeslots(
  currentTimeslot: Timeslot,
  allTimeslots: Timeslot[],
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
