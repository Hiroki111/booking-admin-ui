import { Alert, AlertTitle, SxProps, Theme } from '@mui/material';

interface Props {
  title?: string;
  message?: string | JSX.Element;
  sx?: SxProps<Theme>;
}

export function WarningAlert({
  title = 'Internal error occurred',
  message = 'Please refresh the browser later',
  sx = {},
}: Props) {
  return (
    <Alert severity="error" sx={sx}>
      <AlertTitle>
        <strong>{title}</strong>
      </AlertTitle>
      {message}
    </Alert>
  );
}
