import { Alert, AlertTitle } from '@material-ui/lab';

interface Props {
  title?: string;
  message?: string;
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
