import { useMutation, useQuery, UseQueryResult } from 'react-query';

import { Staff, UploadAvatarImagePayload, CreateStaffRequestBody, UpdateStaffRequestBody } from '../interfaces/staff';
import restApi from '../network/restApi';
import { NEW_STAFF_ID } from '../staticData/staff';

export enum staffQuries {
  fetchStaffList = 'fetchStaffList',
  fetchStaff = 'fetchStaff',
  uploadAvatarImage = 'uploadAvatarImage',
  saveStaff = 'saveStaff',
}

export function useStaffListQuery(): UseQueryResult<Staff[]> {
  return useQuery(staffQuries.fetchStaffList, restApi.fetchStaffList);
}

export function useStaffQuery(id: string | number): UseQueryResult<Staff> {
  return useQuery(staffQuries.fetchStaff, () => restApi.fetchStaff(id), {
    enabled: id !== String(NEW_STAFF_ID),
  });
}

export function useUploadAvatarImageMutation() {
  return useMutation(staffQuries.uploadAvatarImage, (payload: UploadAvatarImagePayload) =>
    restApi.uploadAvatarImage(payload.staffId, payload.base64Image),
  );
}

export function useDeleteAvatarImageMutation() {
  return useMutation(staffQuries.uploadAvatarImage, (id: number) => restApi.deleteAvatarImage(id));
}

export function useSaveStaffMutation(id: string | number) {
  return useMutation(staffQuries.saveStaff, (payload: CreateStaffRequestBody | UpdateStaffRequestBody) => {
    if (id === String(NEW_STAFF_ID)) {
      return restApi.createStaff(payload as CreateStaffRequestBody);
    }
    return restApi.updateStaff(payload as UpdateStaffRequestBody);
  });
}
