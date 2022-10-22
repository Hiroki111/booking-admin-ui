import { Dialog, Grid, DialogTitle, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import * as sx from './styles';
import { NEW_STAFF_ID } from '../../../../../../../staticData/staff';
import { PATHS } from '../../../../../../../staticData/routes';

export function EditStaffDialog() {
  const history = useHistory();
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreatingNewStaff = id === String(NEW_STAFF_ID);

  function handleCancel() {
    const searchParams = new URLSearchParams(search);
    if (!searchParams.toString()?.length) {
      history.push(PATHS.staff);
      return;
    }
    history.push(`${PATHS.staff}?${searchParams.toString()}`);
  }

  return (
    <Dialog open maxWidth="lg">
      <Grid container justifyContent="space-between">
        <DialogTitle>{`${isCreatingNewStaff ? 'Add' : 'Edit'} Staff`}</DialogTitle>
        <IconButton sx={sx.closeButton} onClick={handleCancel} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent>content</DialogContent>
    </Dialog>
  );
}
