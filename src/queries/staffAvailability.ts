import { UseQueryResult, useQuery } from 'react-query';

import { StaffAvailability } from '../interfaces/staffAvailability';
import restApi from '../network/restApi';

export enum staffAvailabilityQuries {
  fetchStaffAvailability = 'fetchStaffAvailability',
}

export function useStaffAvailabilityQuery(
  staffId: number,
  date: string,
  availableBookingId: number,
): UseQueryResult<StaffAvailability> {
  return useQuery([staffAvailabilityQuries.fetchStaffAvailability, staffId, date, availableBookingId], () =>
    restApi.fetchStaffAvailability(staffId, date, availableBookingId),
  );
}
