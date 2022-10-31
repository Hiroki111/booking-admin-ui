import { FormEvent, useRef, useState } from 'react';
import { Badge, Box, Divider, Popover, Typography } from '@mui/material';

import { UploadAvatarDialog } from '../UploadAvatarDialog';
import * as sx from './styles';

interface Props {
  children: JSX.Element;
}

export function StaffAvatarEditBadge({ children }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();

  function handleImageUploaded(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.files?.length) {
      return;
    }
    setImageSrc(URL.createObjectURL(e.currentTarget.files[0]));
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
        {children}
      </Badge>
      {imageSrc && (
        <UploadAvatarDialog
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
