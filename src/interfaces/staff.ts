import { Service } from './service';

export interface Staff {
  id: number;
  name: string;
  profilePhotoUrl: string | null;
  title: string | null;
  services: Service[];
}
