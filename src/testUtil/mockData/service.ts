import { Service } from '../../interfaces/service';
import { mockServiceType } from './serviceType';

const mockService: Service = {
  id: 1,
  minutes: 30,
  name: 'Mock Service',
  price: 10,
  serviceTypeId: mockServiceType.id,
  tax: 5,
  serviceType: mockServiceType,
};

export function createMockService(params?: Partial<Service>) {
  return { ...mockService, ...params };
}
