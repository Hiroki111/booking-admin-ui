import { UseQueryResult, useQuery } from 'react-query';

import restApi from '../network/restApi';
import { Timeslot } from '../interfaces/timeslotSetting';

export enum timeslotSettingQuries {
  fetchTimeslots = 'fetchTimeslots',
}

export function useTimeslotsQuery(): UseQueryResult<Timeslot[]> {
  return useQuery(timeslotSettingQuries.fetchTimeslots, restApi.fetchTimeslots);
}
