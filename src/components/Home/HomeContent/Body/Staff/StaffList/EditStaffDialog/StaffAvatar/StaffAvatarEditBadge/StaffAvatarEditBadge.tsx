import { FormEvent, useRef, useState } from 'react';
import { Badge, Box, Divider, Popover, Typography } from '@mui/material';

import { UploadAvatarDialog } from './UploadAvatarDialog';
import * as sx from './styles';
import { Staff } from '../../../../../../../../../interfaces/staff';
import { DeleteAlertDialog } from '../../../../../../../../../util/DeleteAlertDialog';
import { useDeleteAvatarImageMutation } from '../../../../../../../../../queries/staff';

interface Props {
  staff: Staff;
  children: JSX.Element;
}

export function StaffAvatarEditBadge({ staff, children }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const [isOpeningDeleteDialog, setIsOpeningDeleteDialog] = useState(false);
  const deleteAvatarImageMutation = useDeleteAvatarImageMutation();

  function handleImageUploaded(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.files?.length) {
      return;
    }
    setImageSrc(URL.createObjectURL(e.currentTarget.files[0]));
  }

  function handleDeleteImage() {
    deleteAvatarImageMutation.mutate(staff.id);
    setIsOpeningDeleteDialog(false);
    setAnchorEl(null);
  }

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        badgeContent={
          <>
            <Box
              sx={sx.inputLabel}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => setAnchorEl(event.currentTarget)}
            >
              Edit
            </Box>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Box sx={sx.popoverContent}>
                <input ref={fileInputRef} onChange={handleImageUploaded} type="file" />
                <Typography component="p" onClick={() => fileInputRef?.current?.click()}>
                  Upload image
                </Typography>
                <Divider />
                <Typography component="p" onClick={() => setIsOpeningDeleteDialog(true)}>
                  Delete image
                </Typography>
              </Box>
            </Popover>
            <DeleteAlertDialog
              isOpening={isOpeningDeleteDialog}
              onCancel={() => setIsOpeningDeleteDialog(false)}
              onDelete={handleDeleteImage}
              text={`You're going to delete ${staff.name}'s avatar image. Deleted images can't be restored. Do you really wish to delete it?`}
            />
          </>
        }
      >
        {children}
      </Badge>
      {imageSrc && (
        <UploadAvatarDialog
          staff={staff}
          imageSrc={imageSrc}
          onCancle={() => {
            setImageSrc(undefined);
            setAnchorEl(null);
          }}
        />
      )}
    </>
  );
}
