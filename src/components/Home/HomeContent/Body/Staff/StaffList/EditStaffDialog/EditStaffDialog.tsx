import { useState, useEffect } from 'react';
import {
  Dialog,
  Grid,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { DEFAULT_STAFF, NEW_STAFF_ID } from '../../../../../../../staticData/staff';
import { PATHS } from '../../../../../../../staticData/routes';
import { Staff } from '../../../../../../../interfaces/staff';
import { Service } from '../../../../../../../interfaces/service';
import { useServicesQuery } from '../../../../../../../queries/service';
import { useStaffQuery, useSaveStaffMutation } from '../../../../../../../queries/staff';
import { StaffAvatar } from './StaffAvatar';
import * as sx from './styles';
import { getPathWithParam } from '../../../../../../../services/routing';

export function EditStaffDialog() {
  const [staff, setStaff] = useState<Staff>(DEFAULT_STAFF);
  const [serviceOptions, setServiceOptions] = useState<Service[]>(staff.services);
  const fetchServicesQuery = useServicesQuery();
  const history = useHistory();
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data: existingStaff } = useStaffQuery(id);
  const isCreatingNewStaff = id === String(NEW_STAFF_ID);
  const saveStaffMutation = useSaveStaffMutation(id);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isCreatingNewStaff && existingStaff) {
      setStaff(existingStaff);
    }
  }, [isCreatingNewStaff, existingStaff]);

  useEffect(() => {
    if (isCreatingNewStaff && saveStaffMutation.isSuccess && saveStaffMutation.data?.id) {
      history.push(getPathWithParam(PATHS.staffEditId, { ':id': String(saveStaffMutation.data.id) }));
    }
  }, [history, isCreatingNewStaff, saveStaffMutation.isSuccess, saveStaffMutation.data, id]);

  useEffect(() => {
    const serviceOptions = fetchServicesQuery?.data || [];
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);
  }, [fetchServicesQuery?.data, setServiceOptions]);

  useEffect(() => {
    if (saveStaffMutation.error instanceof Error) {
      enqueueSnackbar(getSubmissionErrorMessage(saveStaffMutation.error), { variant: 'error' });
    }
  }, [saveStaffMutation.error]);

  useEffect(() => {
    if (saveStaffMutation.isSuccess) {
      enqueueSnackbar('Staff saved', { variant: 'info' });
    }
  }, [saveStaffMutation.isSuccess]);

  function handleCancel() {
    const searchParams = new URLSearchParams(search);
    if (!searchParams.toString()?.length) {
      history.push(PATHS.staff);
      return;
    }
    history.push(`${PATHS.staff}?${searchParams.toString()}`);
  }

  function handleSubmitStaff() {
    saveStaffMutation.mutate({
      ...staff,
      serviceIds: staff.services.map((service) => service.id),
    });
  }

  function getSubmissionErrorMessage(error: any) {
    if (error.details) {
      return Object.keys(error.details)
        .map((key) => `${key}: ${error.details[key]}`)
        .join(', ');
    } else if (error.message) {
      return error.message;
    }
    return 'Please try again later.';
  }

  return (
    <Dialog open maxWidth="md" fullWidth>
      <Grid container justifyContent="space-between">
        <DialogTitle>{`${isCreatingNewStaff ? 'Add' : 'Edit'} Staff`}</DialogTitle>
        <IconButton sx={sx.closeButton} onClick={handleCancel} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item container justifyContent="center" xs={12}>
            <StaffAvatar staff={staff} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              sx={{ width: '100%' }}
              value={staff.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStaff((currentStaff) => ({
                  ...currentStaff,
                  name: e.target.value,
                }))
              }
              label="Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              sx={{ width: '100%' }}
              value={staff.title || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStaff((currentStaff) => ({
                  ...currentStaff,
                  title: e.target.value,
                }))
              }
              label="Title"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              data-testid="service-list"
              multiple
              options={serviceOptions}
              isOptionEqualToValue={(option: Service, value: Service) => option.id === value.id}
              groupBy={(option) => option.serviceType.name}
              getOptionLabel={(option) => `${option.name} (${option.minutes} min)`}
              value={staff.services || ''}
              onChange={(event: React.SyntheticEvent<Element, Event>, value: Service[]) => {
                setStaff((currentStaff) => ({ ...currentStaff, services: value as Service[] }));
              }}
              renderInput={(params) => <TextField {...params} label="Services" variant="outlined" required />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={sx.dialogActions}>
        <Button data-testid="cancel-submission" variant="outlined" color="primary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button
          data-testid="submit-staff"
          color="primary"
          variant="contained"
          disabled={saveStaffMutation.isLoading}
          onClick={handleSubmitStaff}
        >
          {!saveStaffMutation.isLoading ? 'SAVE' : 'SUBMITTING...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
