// NOTE: This component may well be reusable in the enitre project,
// so that the avatar looks always the same based on the staff
import { useEffect, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

import { Staff } from '../../../../../../../../interfaces/staff';
import { NEW_STAFF_ID } from '../../../../../../../../staticData/staff';
import * as sx from './styles';

interface Props {
  staff: Staff;
}

export function StaffAvatar({ staff }: Props) {
  const [isImageInvalid, setIsImageInvalid] = useState(false);

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
  return (
    <Box sx={sx.imageWrapper}>
      <img data-testid="staff-photo" src={staff.profilePhotoUrl} onError={(e) => setIsImageInvalid(true)} />
    </Box>
  );
}
