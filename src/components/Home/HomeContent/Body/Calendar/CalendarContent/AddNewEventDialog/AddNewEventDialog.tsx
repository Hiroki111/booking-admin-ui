import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { Booking } from '../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../interfaces/service';
import { Staff } from '../../../../../../../interfaces/staff';
import { useStyles } from './useStyles';
import { useServicesQuery } from '../../../../../../../queries/service';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useStaffListQuery } from '../../../../../../../queries/staff';
import { DateTimeFields } from './DateTimeFields';
import { CustomerDetailsFields } from './CustomerDetailsFields';
import { ServiceFields } from './ServiceFields';
import { StaffFields } from './StaffFields';

export const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_BOOKING = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  staffId: null as unknown as number,
  date: dayjs().format(DATE_FORMAT),
  startTime: '10:00:00',
  endTime: '11:00:00',
  staffAvailabilityId: null as unknown as number,
  totalPrice: 0,
  staff: {} as Staff,
  services: [] as Service[],
} as Booking;

export function AddNewEventDialog() {
  const classes = useStyles();
  const [booking, setBooking] = useState<Booking>(DEFAULT_BOOKING);
  const { isAddingNewEvent, setIsAddingNewEvent } = useCalendarContext();
  const fetchServicesQuery = useServicesQuery();
  const fetchStaffListQuery = useStaffListQuery();

  return (
    <Dialog open={isAddingNewEvent} maxWidth="lg">
      <Grid container justifyContent="space-between">
        <DialogTitle>Add new booking</DialogTitle>
        <IconButton className={classes.closeButton} onClick={() => setIsAddingNewEvent(false)} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        {(fetchServicesQuery.isError || fetchStaffListQuery.isError) && (
          <WarningAlert
            message={'It failed to load services and staff due to an internal error. Please try again later.'}
          />
        )}
        <Grid container classes={{ root: classes.dialogContainer }}>
          <Grid container spacing={2} item alignContent="start" md={6} sm={12}>
            <Grid item container rowSpacing={2} className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Date and time
              </Typography>
              <DateTimeFields booking={booking} setBooking={setBooking} />
            </Grid>
            <Grid item container rowSpacing={2} className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Customer details
              </Typography>
              <CustomerDetailsFields booking={booking} setBooking={setBooking} />
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem className={classes.centralDivider} />
          <Grid container spacing={2} item alignContent="start" md={6} sm={12}>
            <Grid item container rowSpacing={2} className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Service
              </Typography>
              <ServiceFields booking={booking} setBooking={setBooking} />
            </Grid>
            <Grid item container rowSpacing={2} className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Staff
              </Typography>
              <StaffFields booking={booking} setBooking={setBooking} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button autoFocus color="primary" onClick={() => setIsAddingNewEvent(false)}>
          Cancel
        </Button>
        <Button autoFocus color="primary" variant="contained" onClick={() => {}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
