import { useState } from 'react';
import { Avatar, Popover, Typography, Divider, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

import * as sx from './styles';
import { useAuthContext } from '../../../../../contexts/AuthContext';

interface Props {
  onClickLogout: () => void;
}

export function UserAvatar({ onClickLogout }: Props) {
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const isOpenUserPopover = Boolean(anchorEl);

  function getAvatarContent() {
    if (!user?.name) {
      return <PeopleIcon />;
    }

    const nameArray = user.name.trim().split(' ') || [];

    if (nameArray.length === 0) {
      return '';
    } else if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    }

    const firstChar = nameArray[0].charAt(0).toUpperCase();
    const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    return `${firstChar}${lastChar}`;
  }

  return (
    <>
      <Avatar sx={sx.avatar} onClick={(event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget)}>
        {getAvatarContent()}
      </Avatar>
      <Popover
        open={isOpenUserPopover}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={sx.popoverContent}>
          <Typography component="p">
            Logged in as <strong>{user?.name}</strong>
          </Typography>
          <Divider />
          <Typography component="p" sx={sx.popoverLogoutText} onClick={onClickLogout}>
            Log out
          </Typography>
        </Box>
      </Popover>
    </>
  );
}
