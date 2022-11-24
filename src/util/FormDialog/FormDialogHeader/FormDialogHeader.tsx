import { DialogTitle, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import * as sx from './styles';

interface Props {
  children: string | JSX.Element;
  onCancel: () => void;
}

export function FormDialogHeader({ children, onCancel }: Props) {
  return (
    <Grid container justifyContent="space-between">
      <DialogTitle>{children}</DialogTitle>
      <IconButton sx={sx.closeButton} onClick={onCancel} size="large">
        <CloseIcon />
      </IconButton>
    </Grid>
  );
}
