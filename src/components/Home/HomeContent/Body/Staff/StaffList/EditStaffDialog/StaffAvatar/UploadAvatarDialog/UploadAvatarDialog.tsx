import { Dialog, DialogActions, DialogContent } from '@mui/material';

export function UploadAvatarDialog() {
  return (
    <Dialog open maxWidth="md" fullWidth>
      <DialogContent>Photo</DialogContent>
      <DialogActions>Cancel Save</DialogActions>
    </Dialog>
  );
}
