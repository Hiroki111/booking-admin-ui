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
import { useHistory, useParams } from 'react-router-dom';

import { Booking } from '../../../../../../../interfaces/booking';
import { useStyles } from './useStyles';
import { useServicesQuery } from '../../../../../../../queries/service';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useStaffListQuery } from '../../../../../../../queries/staff';
import { DateTimeFields } from './DateTimeFields';
import { CustomerDetailsFields } from './CustomerDetailsFields';
import { ServiceFields } from './ServiceFields';
import { StaffFields } from './StaffFields';
import { useBookingQuery, useBookingsQuery, useSaveBookingMutation } from '../../../../../../../queries/booking';
import { PATHS } from '../../../../../../../staticData/routes';
import { DEFAULT_BOOKING, NEW_BOOKING_ID } from '../../../../../../../staticData/calendar';
import { getPathWithParam } from '../../../../../../../services/routing';
import { UseCalendarState } from '../../../../../../../hooks/calendar';

export function EditBookingDialog() {
  const classes = useStyles();
  const { year, month, day } = UseCalendarState();
  const [booking, setBooking] = useState<Booking>({
    ...DEFAULT_BOOKING,
    date: `${year}-${month}-${day}`,
  });
  const { id } = useParams<{ id: string }>();
  const fetchServicesQuery = useServicesQuery();
  const fetchStaffListQuery = useStaffListQuery();
  const history = useHistory();
  const isCreatingNewBooking = id === String(NEW_BOOKING_ID);
  const { data: existingBooking } = useBookingQuery(id);
  const saveBookingMutation = useSaveBookingMutation(id);
  const { refetch } = useBookingsQuery(year, month);

  useEffect(() => {
    if (!isCreatingNewBooking && existingBooking) {
      setBooking(existingBooking);
    }
  }, [isCreatingNewBooking, existingBooking]);

  useEffect(() => {
    if (isCreatingNewBooking && saveBookingMutation.isSuccess && saveBookingMutation.data?.id) {
      history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(saveBookingMutation.data.id) }));
    }
  }, [history, isCreatingNewBooking, saveBookingMutation.isSuccess, saveBookingMutation.data, id]);

  useEffect(() => {
    if (saveBookingMutation.isSuccess) {
      refetch();
    }
  }, [saveBookingMutation.isSuccess, refetch]);

  function handleSubmitBooking() {
    saveBookingMutation.mutate({
      ...booking,
      serviceIds: booking.services.map((service) => service.id),
    });
  }

  function handleCancel() {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.toString()?.length) {
      history.push(PATHS.calendar);
      return;
    }
    history.push(`${PATHS.calendar}?${searchParams.toString()}`);
  }

  function getSubmissionError(error: any) {
    let message = 'Please try again later.';
    if (error?.details && typeof error.details === 'object') {
      const keys = Object.keys(error.details);
      message = keys.map((key) => `${key}: ${error.details[key]}`).join(', ');
    } else if (error?.message) {
      message = error.message;
    }
    return {
      message,
      title: 'Error occurred',
    };
  }

  return (
    <Dialog open maxWidth="lg">
      <Grid container justifyContent="space-between">
        <DialogTitle>{`${isCreatingNewBooking ? 'Add' : 'Edit'} Booking`}</DialogTitle>
        <IconButton className={classes.closeButton} onClick={handleCancel} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        {(fetchServicesQuery.isError || fetchStaffListQuery.isError) && (
          <WarningAlert
            message={'It failed to load services and staff due to an internal error. Please try again later.'}
          />
        )}
        {saveBookingMutation.error instanceof Error && (
          <WarningAlert {...getSubmissionError(saveBookingMutation.error)} />
        )}
        {saveBookingMutation.isSuccess && <Alert severity="success">Booking Saved</Alert>}
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
        <Button autoFocus color="primary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button
          autoFocus
          data-testid="submit-booking"
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
