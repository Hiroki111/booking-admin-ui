import { Alert, AlertTitle } from '@mui/material';

interface Props {
  title?: string;
  message?: string | JSX.Element;
}

export function WarningAlert({
  title = 'Internal error occurred',
  message = 'Please refresh the browser later',
}: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>
        <strong>{title}</strong>
      </AlertTitle>
      {message}
    </Alert>
  );
}
