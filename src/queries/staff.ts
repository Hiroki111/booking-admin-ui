import { useQuery, UseQueryResult } from 'react-query';
import { Staff } from '../interfaces/staff';

import restApi from '../network/restApi';

export enum staffQuries {
  fetchStaffList = 'fetchStaffList',
}

export function useFetchStaffListQuery(): UseQueryResult<Staff[]> {
  return useQuery(staffQuries.fetchStaffList, restApi.fetchStaffList);
}
