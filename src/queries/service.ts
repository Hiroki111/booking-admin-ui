import { useQuery, UseQueryResult } from 'react-query';

import { Service } from '../interfaces/service';
import restApi from '../network/restApi';

export enum serviceQuries {
  fetchServices = 'fetchServices',
}

export function useServicesQuery(): UseQueryResult<Service[]> {
  return useQuery(serviceQuries.fetchServices, restApi.fetchServices);
}
