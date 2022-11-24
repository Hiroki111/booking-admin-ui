import { DialogActions, Button } from '@mui/material';

import * as sx from './styles';

interface Props {
  onCancel: () => void;
  onSubmitForm: () => void;
  isSubmittingData: boolean;
}

export function FormDialogActions({ onCancel, onSubmitForm, isSubmittingData }: Props) {
  return (
    <DialogActions sx={sx.dialogActions}>
      <Button data-testid="cancel-submission" color="primary" onClick={onCancel}>
        CANCEL
      </Button>
      <Button
        data-testid="submission"
        color="primary"
        variant="contained"
        disabled={isSubmittingData}
        onClick={onSubmitForm}
      >
        {!isSubmittingData ? 'SUBMIT' : 'SUBMITTING...'}
      </Button>
    </DialogActions>
  );
}
