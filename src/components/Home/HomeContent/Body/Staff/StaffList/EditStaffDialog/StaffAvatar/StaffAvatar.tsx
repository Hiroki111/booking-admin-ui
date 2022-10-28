// NOTE: This component may well be reusable in the enitre project,
// so that the avatar looks always the same based on the staff
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Box, Divider, Popover, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

import { Staff } from '../../../../../../../../interfaces/staff';
import { NEW_STAFF_ID } from '../../../../../../../../staticData/staff';
import * as sx from './styles';
import { UploadAvatarDialog } from './UploadAvatarDialog';

interface Props {
  staff: Staff;
}

export function StaffAvatar({ staff }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isImageInvalid, setIsImageInvalid] = useState(false);
  const [imageFile, seTimageFile] = useState<File>();

  useEffect(() => {
    setIsImageInvalid(false);
  }, [staff.id, staff?.profilePhotoUrl]);

  function getInitials(staff: Staff) {
    const nameArray = staff.name.trim().split(' ');
    let initials: string;
    if (nameArray.length === 0) {
      initials = '';
    } else if (nameArray.length === 1) {
      initials = nameArray[0].charAt(0).toUpperCase();
    } else {
      const firstChar = nameArray[0].charAt(0).toUpperCase();
      const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
      initials = `${firstChar}${lastChar}`;
    }
    return initials;
  }

  function getAvatar(staff: Staff, isImageInvalid: boolean) {
    if (staff.id === NEW_STAFF_ID) {
      return (
        <Avatar data-testid="new-staff-icon" sx={sx.avatar}>
          <PeopleIcon />
        </Avatar>
      );
    } else if (!staff?.profilePhotoUrl || isImageInvalid) {
      return (
        <Avatar data-testid="staff-initials" sx={sx.initials}>
          {getInitials(staff)}
        </Avatar>
      );
    }
    // NOTE:
    // <Avatar/>'s onError doesn't fire correctly if a new src is provided
    // Thus, <img/> is used
    return (
      <Box sx={sx.imageWrapper}>
        <img data-testid="staff-photo" src={staff.profilePhotoUrl} onError={(e) => setIsImageInvalid(true)} />
      </Box>
    );
  }

  function handleImageUploaded(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.files?.length) {
      return;
    }
    seTimageFile(e.currentTarget.files[0]);
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={sx.popoverContent}>
                <input ref={fileInputRef} onChange={handleImageUploaded} type="file" />
                <Typography component="p" onClick={() => fileInputRef?.current?.click()}>
                  Upload image
                </Typography>
                <Divider />
                <Typography component="p" onClick={() => {}}>
                  Delete image
                </Typography>
              </Box>
            </Popover>
          </>
        }
      >
        {getAvatar(staff, isImageInvalid)}
      </Badge>
      {imageFile && (
        <UploadAvatarDialog
          imageFile={imageFile}
          onCancle={() => {
            seTimageFile(undefined);
            setAnchorEl(null);
          }}
        />
      )}
    </>
  );
}
