import { useEffect, useState } from 'react';
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
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Booking } from '../../../../../../../interfaces/booking';
import { useStyles } from './useStyles';
import { useServicesQuery } from '../../../../../../../queries/service';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useStaffListQuery } from '../../../../../../../queries/staff';
import { DateTimeFields } from './DateTimeFields';
import { CustomerDetailsFields } from './CustomerDetailsFields';
import { ServiceFields } from './ServiceFields';
import { StaffFields } from './StaffFields';
import { useBookingQuery, useSaveBookingMutation } from '../../../../../../../queries/booking';
import { PATHS } from '../../../../../../../staticData/routes';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT_BOOKING, NEW_BOOKING_ID } from '../../../../../../../staticData/calendar';
import { getRouteWithParam } from '../../../../../../../services/routing';

export function AddNewEventDialog() {
  const classes = useStyles();
  const [booking, setBooking] = useState<Booking>(DEFAULT_BOOKING);
  const { id } = useParams<{ id: string }>();
  const fetchServicesQuery = useServicesQuery();
  const fetchStaffListQuery = useStaffListQuery();
  const history = useHistory();
  const isCreatingNewBooking = id === String(NEW_BOOKING_ID);
  const fetchBookingQuery = useBookingQuery(id);
  const saveBookingMutation = useSaveBookingMutation(id);

  useEffect(() => () => setBooking(DEFAULT_BOOKING), []);

  useEffect(() => {
    if (!isCreatingNewBooking && fetchBookingQuery.data) {
      setBooking(fetchBookingQuery.data);
    }
  }, [isCreatingNewBooking, fetchBookingQuery?.data]);

  useEffect(() => {
    if (isCreatingNewBooking && saveBookingMutation.isSuccess && saveBookingMutation.data.id) {
      history.push(getRouteWithParam(PATHS.calendarBookingEditId, { ':id': saveBookingMutation.data.id }));
    }
  }, [history, isCreatingNewBooking, saveBookingMutation.isSuccess, saveBookingMutation.data, id]);

  function handleSubmitBooking() {
    saveBookingMutation.mutate({
      ...booking,
      serviceIds: booking.services.map((service) => service.id),
    });
  }

  return (
    <Dialog open maxWidth="lg">
      <Grid container justifyContent="space-between">
        <DialogTitle>{`${isCreatingNewBooking ? 'Add' : 'Edit'} Booking`}</DialogTitle>
        <IconButton className={classes.closeButton} onClick={() => history.push(PATHS.calendar)} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        {(fetchServicesQuery.isError || fetchStaffListQuery.isError) && (
          <WarningAlert
            message={'It failed to load services and staff due to an internal error. Please try again later.'}
          />
        )}
        {saveBookingMutation.error instanceof Error && <WarningAlert message={saveBookingMutation.error.message} />}
        {saveBookingMutation.isSuccess && <Alert severity="success">Booking Created</Alert>}
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
              <StaffFields booking={booking} setBooking={setBooking} isCreatingNewBooking={isCreatingNewBooking} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button autoFocus color="primary" onClick={() => history.push(PATHS.calendar)}>
          CANCEL
        </Button>
        <Button
          autoFocus
          color="primary"
          variant="contained"
          disabled={saveBookingMutation.isLoading}
          onClick={handleSubmitBooking}
        >
          {!saveBookingMutation.isLoading ? 'SAVE' : 'SUBMITTING...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
