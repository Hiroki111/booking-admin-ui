import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as sx from './styles';

const DEFAULT_TITLE = 'Attention!';

interface Props {
  isOpening: boolean;
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  text: string;
}

export function DeleteAlertDialog({ isOpening, onCancel, onDelete, title = DEFAULT_TITLE, text }: Props) {
  return (
    <Dialog
      open={isOpening}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button sx={sx.deleteButton} onClick={onDelete}>
            Delete
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
