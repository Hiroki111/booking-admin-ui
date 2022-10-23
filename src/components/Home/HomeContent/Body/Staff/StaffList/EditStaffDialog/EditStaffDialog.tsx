import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PeopleIcon from '@mui/icons-material/People';
import { Dialog, Grid, DialogTitle, IconButton, DialogContent, TextField, Autocomplete, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { DEFAULT_STAFF, NEW_STAFF_ID } from '../../../../../../../staticData/staff';
import { PATHS } from '../../../../../../../staticData/routes';
import { Staff } from '../../../../../../../interfaces/staff';
import { Service } from '../../../../../../../interfaces/service';
import { useServicesQuery } from '../../../../../../../queries/service';
import * as sx from './styles';
import { useStaffQuery } from '../../../../../../../queries/staff';

export function EditStaffDialog() {
  const [staff, setStaff] = useState<Staff>(DEFAULT_STAFF);
  const [serviceOptions, setServiceOptions] = useState<Service[]>(staff.services);
  const [isImageInvalid, setIsImageInvalid] = useState(false);
  const fetchServicesQuery = useServicesQuery();
  const history = useHistory();
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { data: existingStaff } = useStaffQuery(id);
  const isCreatingNewStaff = id === String(NEW_STAFF_ID);

  function handleCancel() {
    const searchParams = new URLSearchParams(search);
    if (!searchParams.toString()?.length) {
      history.push(PATHS.staff);
      return;
    }
    history.push(`${PATHS.staff}?${searchParams.toString()}`);
  }

  useEffect(() => {
    if (!isCreatingNewStaff && existingStaff) {
      setStaff(existingStaff);
    }
  }, [isCreatingNewStaff, existingStaff]);

  useEffect(() => {
    const serviceOptions = fetchServicesQuery?.data || [];
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);
  }, [fetchServicesQuery?.data, setServiceOptions]);

  // copied from home-ui
  function displayPhoto(staff: Staff) {
    return (
      <Avatar
        sx={sx.imageWrapper}
        data-testid="staff-photo"
        alt="_"
        src={staff?.profilePhotoUrl || ''}
        onError={(e) => setIsImageInvalid(true)}
      />
    );
  }

  // copied from home-ui
  function displayAvatar(staff: Staff) {
    if (staff.id === NEW_STAFF_ID) {
      return (
        <Avatar data-testid="no-preference-staff-avatar" sx={sx.avatar}>
          <PeopleIcon />
        </Avatar>
      );
    }

    const nameArray = staff.name.trim().split(' ');
    let initials: string;
    if (nameArray.length === 0) {
      initials = '';
    } else if (nameArray.length === 1) {
      initials = nameArray[0].charAt(0).toUpperCase();
    } else {
      const firstChar = nameArray[0].charAt(0).toUpperCase();
      const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
      initials = `${firstChar}${lastChar}`;
    }

    return (
      <Avatar data-testid="staff-avatar" sx={sx.initials}>
        {initials}
      </Avatar>
    );
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
          <Grid item xs={12}>
            {staff.profilePhotoUrl && !isImageInvalid ? displayPhoto(staff as Staff) : displayAvatar(staff as Staff)}
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ width: '100%' }}
              value={staff.name}
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
          <Grid item sm={6}>
            <TextField
              sx={{ width: '100%' }}
              value={staff.title}
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
              value={staff.services}
              onChange={(event: React.SyntheticEvent<Element, Event>, value: Service[]) => {
                setStaff((currentStaff) => ({ ...currentStaff, services: value as Service[] }));
              }}
              renderInput={(params) => <TextField {...params} label="Services" variant="outlined" required />}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
