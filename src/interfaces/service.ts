import { ServiceType } from './serviceType';

export interface Service {
  id: number;
  minutes: number;
  name: string;
  price: number;
  serviceTypeId: number;
  tax: number;
  serviceType: ServiceType;
}
