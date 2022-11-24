import { DialogContent, Box, CircularProgress } from '@mui/material';

interface Props {
  children: JSX.Element | JSX.Element[];
  isLoadingContent?: boolean;
}

export function FormDialogContent({ children, isLoadingContent }: Props) {
  return (
    <DialogContent dividers>
      {isLoadingContent ? (
        <Box sx={{ display: 'flex' }} justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        children
      )}
    </DialogContent>
  );
}
