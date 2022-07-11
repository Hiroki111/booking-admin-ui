import { Staff } from '../../interfaces/staff';
import { createMockService } from './service';

const mockStaff: Staff = {
  id: 1,
  name: 'John Smith',
  profilePhotoUrl: null,
  title: null,
  services: [createMockService()],
};

export function createMockStaff(params?: Partial<Staff>) {
  return { ...mockStaff, ...params };
}
