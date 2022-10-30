import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';

import { SyntheticEvent, useState } from 'react';
import { Box } from '@mui/system';
import * as sx from './styles';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  imageSrc: string;
  onCancle: () => void;
}

// NOTE: 1 is for square, 16 / 9 is for landscape
const ASPECT_RATIO = 1;

export function UploadAvatarDialog({ imageSrc, onCancle }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [imageElement, setImageElement] = useState<HTMLImageElement>();

  function centerTheCropOnImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(makeAspectCrop({ unit: 'px', width: width }, ASPECT_RATIO, width, height), width, height);

    setCrop(crop);
    setImageElement(e.currentTarget);
  }

  function onSave() {
    if (!imageElement) {
      throw new Error("The loaded image wasn't set");
    } else if (!crop) {
      throw new Error("The loaded image wasn't cropped");
    }
    const canvas = document.createElement('canvas');
    const scaleXRatio = imageElement.naturalWidth / imageElement.width;
    const scaleYRatio = imageElement.naturalHeight / imageElement.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    let ctx: CanvasRenderingContext2D | null;
    if (!(ctx = canvas.getContext('2d'))) {
      throw new Error('2d context not supported or canvas already initialized');
    }

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imageElement,
      crop.x * scaleXRatio, // source X
      crop.y * scaleYRatio, // source Y
      crop.width * scaleXRatio, // source width
      crop.height * scaleYRatio, // source height
      0, // destination X
      0, // destination Y
      crop.width, // destination width
      crop.height, // destination height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');

    // Download the file
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = base64Image;
    downloadLink.target = '_self';
    downloadLink.download = 'test.jpeg';
    downloadLink.click();
  }

  return (
    <Dialog open maxWidth="sm" fullWidth>
      <DialogContent sx={sx.dialogContent}>
        <Box sx={sx.dialogContentWrapper}>
          <ReactCrop circularCrop aspect={1} crop={crop} onChange={(crop) => setCrop(crop)}>
            <img onLoad={centerTheCropOnImageLoad} src={imageSrc} alt="It failed to load the file" />
          </ReactCrop>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Button variant="outlined" onClick={onCancle}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
