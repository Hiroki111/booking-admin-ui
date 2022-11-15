import { Service } from './service';

export interface Staff {
  id: number;
  name: string;
  profilePhotoUrl: string | null;
  title: string | null;
  services: Service[];
}

export interface UploadAvatarImagePayload {
  staffId: string | number;
  base64Image: string;
}

export interface CreateStaffRequestBody {
  name: string;
  profilePhotoUrl: string | null;
  title: string | null;
  serviceIds: number[];
}

export type UpdateStaffRequestBody = CreateStaffRequestBody & {
  id: number;
};
