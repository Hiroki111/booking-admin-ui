import { useQuery, UseQueryResult } from 'react-query';

import { Staff } from '../interfaces/staff';
import restApi from '../network/restApi';
import { NEW_STAFF_ID } from '../staticData/staff';

export enum staffQuries {
  fetchStaffList = 'fetchStaffList',
  fetchStaff = 'fetchStaff',
}

export function useStaffListQuery(): UseQueryResult<Staff[]> {
  return useQuery(staffQuries.fetchStaffList, restApi.fetchStaffList);
}

export function useStaffQuery(id: string | number): UseQueryResult<Staff> {
  return useQuery(staffQuries.fetchStaff, () => restApi.fetchStaff(id), {
    enabled: id !== String(NEW_STAFF_ID),
  });
}
