import ReactCrop, { Crop } from 'react-image-crop';
import { Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';

import 'react-image-crop/dist/ReactCrop.css';
import { useState } from 'react';

interface Props {
  imageFile: File;
  onCancle: () => void;
}

export function UploadAvatarDialog({ imageFile, onCancle }: Props) {
  const [crop, setCrop] = useState<Crop>();
  return (
    <Dialog open maxWidth="md" fullWidth>
      <DialogContent>
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <img src={URL.createObjectURL(imageFile)} />
        </ReactCrop>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Button onClick={onCancle}>Cancel</Button>
          <Button>Save</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
