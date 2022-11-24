import { useParams } from 'react-router-dom';
import { SyntheticEvent, useState, useEffect } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { Dialog, Grid } from '@mui/material';
import { Box } from '@mui/system';

import * as sx from './styles';
import { Staff } from '../../../../../../../../../../interfaces/staff';
import { useStaffQuery, useUploadAvatarImageMutation } from '../../../../../../../../../../queries/staff';
import { FormDialogActions } from '../../../../../../../../../../util/FormDialog/FormDialogActions';
import { FormDialogContent } from '../../../../../../../../../../util/FormDialog/FormDialogContent';
import { FormDialogHeader } from '../../../../../../../../../../util/FormDialog/FormDialogHeader';
import { FormDialogNotification } from '../../../../../../../../../../util/FormDialog/FormDialogNotification';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  staff: Staff;
  imageSrc: string;
  onCancle: () => void;
}

// NOTE: 1 is for square, 16 / 9 is for landscape
const ASPECT_RATIO = 1;

export function UploadAvatarDialog({ staff, imageSrc, onCancle }: Props) {
  // TODO: Create Context API and get staff from there
  const [crop, setCrop] = useState<Crop>();
  const [imageElement, setImageElement] = useState<HTMLImageElement>();
  const uploadAvatarImageMutation = useUploadAvatarImageMutation();
  const { id } = useParams<{ id: string }>();
  const { refetch } = useStaffQuery(id);

  useEffect(() => {
    if (uploadAvatarImageMutation.isSuccess) {
      refetch();
    }
  }, [uploadAvatarImageMutation.isSuccess]);

  function centerTheCropOnImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(makeAspectCrop({ unit: 'px', width: width }, ASPECT_RATIO, width, height), width, height);

    setCrop(crop);
    setImageElement(e.currentTarget);
  }

  function handleSubmitImage() {
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

    uploadAvatarImageMutation.mutate({ staffId: staff.id, base64Image });
  }

  return (
    <Dialog open maxWidth={'sm'}>
      <FormDialogHeader onCancel={onCancle}>{'Upload Avatar'}</FormDialogHeader>
      <FormDialogContent>
        <FormDialogNotification
          isDataSubmissionSuccessful={uploadAvatarImageMutation.isSuccess}
          dataSubmissionError={uploadAvatarImageMutation.error}
          dataSubmissonSuccessMessage={'Image uploaded'}
        />
        <Box sx={sx.dialogContentWrapper}>
          <Grid item container justifyContent="center" xs={12}>
            <ReactCrop circularCrop aspect={1} crop={crop} onChange={(crop) => setCrop(crop)}>
              <img onLoad={centerTheCropOnImageLoad} src={imageSrc} alt="It failed to load the file" />
            </ReactCrop>
          </Grid>
        </Box>
      </FormDialogContent>
      <FormDialogActions
        onCancel={onCancle}
        onSubmitForm={handleSubmitImage}
        isSubmittingData={uploadAvatarImageMutation.isLoading}
      />
    </Dialog>
  );
}
