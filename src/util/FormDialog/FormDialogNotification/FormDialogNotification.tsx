import { Alert } from '@mui/material';

import { WarningAlert } from '../../WarningAlert';
import * as sx from './styles';

interface Props {
  hasLoadingDataError?: boolean;
  isDataSubmissionSuccessful: boolean;
  dataSubmissionError?: unknown;
  dataSubmissonSuccessMessage: string;
}

export function FormDialogNotification({
  hasLoadingDataError,
  isDataSubmissionSuccessful,
  dataSubmissionError,
  dataSubmissonSuccessMessage,
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

  if (hasLoadingDataError) {
    return (
      <WarningAlert
        sx={sx.alert}
        data-testid="loading-data-failed-alert"
        title="Loading data failed"
        message="Please try again later."
      />
    );
  } else if (isDataSubmissionSuccessful) {
    return (
      <Alert sx={sx.alert} severity="success">
        {dataSubmissonSuccessMessage}
      </Alert>
    );
  } else if (dataSubmissionError instanceof Error) {
    return (
      <WarningAlert
        sx={sx.alert}
        data-testid="submitting-data-failed-alert"
        title="Submission failed"
        message={getSubmissionErrorMessage(dataSubmissionError)}
      />
    );
  }
  return null;
}
