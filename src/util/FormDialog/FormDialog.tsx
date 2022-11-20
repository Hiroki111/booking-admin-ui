import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Alert,
  Breakpoint,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import * as sx from './styles';
import { WarningAlert } from '../WarningAlert';

interface Props {
  children: JSX.Element;
  maxDialogWidth: Breakpoint | false;
  dialogTitle: string;
  hasDataLoadingError?: boolean;
  isSubmittingForm: boolean;
  isDataSubmissonSuccess: boolean;
  dataSubmissionError?: Error;
  dataSubmissonSuccessMessage: string;
  onCancel: () => void;
  onSubmitForm: () => void;
}

export function FormDialog({
  children,
  maxDialogWidth,
  dialogTitle,
  hasDataLoadingError,
  isSubmittingForm,
  isDataSubmissonSuccess,
  dataSubmissionError,
  dataSubmissonSuccessMessage,
  onCancel,
  onSubmitForm,
}: Props) {
  function getSubmissionErrorMessage(error: any) {
    if (typeof error?.details === 'object') {
      return Object.keys(error.details)
        .map((key) => `${key}: ${error.details[key]}`)
        .join(', ');
    } else if (error.message) {
      return error.message;
    }
    return 'Please try again later.';
  }

  return (
    <Dialog open maxWidth={maxDialogWidth}>
      <Grid container justifyContent="space-between">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <IconButton sx={sx.closeButton} onClick={onCancel} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        {hasDataLoadingError && (
          <WarningAlert sx={sx.alert} message="It failed to load data. Please try again later." />
        )}
        {dataSubmissionError && (
          <WarningAlert
            sx={sx.alert}
            title={'Submission failed'}
            message={getSubmissionErrorMessage(dataSubmissionError)}
          />
        )}
        {isDataSubmissonSuccess && (
          <Alert sx={sx.alert} severity="success">
            {dataSubmissonSuccessMessage}
          </Alert>
        )}
        {children}
      </DialogContent>
      <DialogActions sx={sx.dialogActions}>
        <Button data-testid="cancel-submission" color="primary" disabled={isSubmittingForm} onClick={onCancel}>
          CANCEL
        </Button>
        <Button color="primary" variant="contained" disabled={isSubmittingForm} onClick={onSubmitForm}>
          {!isSubmittingForm ? 'SUBMIT' : 'SUBMITTING...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
