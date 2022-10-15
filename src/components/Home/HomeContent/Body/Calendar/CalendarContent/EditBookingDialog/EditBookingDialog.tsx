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
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Booking } from '../../../../../../../interfaces/booking';
import * as sx from './styles';
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
import { useStaffAvailabilityQuery } from '../../../../../../../queries/staffAvailability';

export function EditBookingDialog() {
  const { year, month, day } = UseCalendarState();
  const [booking, setBooking] = useState<Booking>({
    ...DEFAULT_BOOKING,
    date: `${year}-${month}-${day}`,
  });
  const { id } = useParams<{ id: string }>();
  const fetchServicesQuery = useServicesQuery();
  const fetchStaffListQuery = useStaffListQuery();
  const fetchStaffAvailabilityQuery = useStaffAvailabilityQuery(booking.staff.id, booking.date, booking.id);
  const history = useHistory();
  const { search } = useLocation();
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
    const searchParams = new URLSearchParams(search);
    if (!searchParams.toString()?.length) {
      history.push(PATHS.calendar);
      return;
    }
    history.push(`${PATHS.calendar}?${searchParams.toString()}`);
  }

  function getSubmissionErrorMessage(error: any) {
    let message = 'Please try again later.';
    if (error?.details && typeof error.details === 'object') {
      const keys = Object.keys(error.details);
      message = keys.map((key) => `${key}: ${error.details[key]}`).join(', ');
    } else if (error?.message) {
      message = error.message;
    }
    return message;
  }

  return (
    <Dialog open maxWidth="lg">
      <Grid container justifyContent="space-between">
        <DialogTitle>{`${isCreatingNewBooking ? 'Add' : 'Edit'} Booking`}</DialogTitle>
        <IconButton sx={sx.closeButton} onClick={handleCancel} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        {(fetchServicesQuery.isError || fetchStaffListQuery.isError || fetchStaffAvailabilityQuery.isError) && (
          <WarningAlert
            message={
              <div data-testid="fetching-data-failed-alert">
                It failed to load data due to an internal error. Please try again later.
              </div>
            }
          />
        )}
        {saveBookingMutation.error instanceof Error && (
          <WarningAlert
            title={'Error occurred'}
            message={
              <div data-testid="submission-failed-alert">{getSubmissionErrorMessage(saveBookingMutation.error)}</div>
            }
          />
        )}
        {saveBookingMutation.isSuccess && <Alert severity="success">Booking Saved</Alert>}
        <Grid container sx={sx.dialogContainer}>
          <Grid container spacing={2} item alignContent="start" md={6} sm={12}>
            <Grid item container rowSpacing={2} sx={sx.fieldGroup}>
              <Typography paragraph sx={sx.dividerText}>
                Date and time
              </Typography>
              <DateTimeFields booking={booking} setBooking={setBooking} />
            </Grid>
            <Grid item container rowSpacing={2} sx={sx.fieldGroup}>
              <Typography paragraph sx={sx.dividerText}>
                Customer details
              </Typography>
              <CustomerDetailsFields booking={booking} setBooking={setBooking} />
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem sx={sx.centralDivider} />
          <Grid container spacing={2} item alignContent="start" md={6} sm={12}>
            <Grid item container rowSpacing={2} sx={sx.fieldGroup}>
              <Typography paragraph sx={sx.dividerText}>
                Service
              </Typography>
              <ServiceFields booking={booking} setBooking={setBooking} />
            </Grid>
            <Grid item container rowSpacing={2} sx={sx.fieldGroup}>
              <Typography paragraph sx={sx.dividerText}>
                Staff
              </Typography>
              <StaffFields booking={booking} setBooking={setBooking} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={sx.dialogActions}>
        <Button data-testid="cancel-submission" color="primary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button
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
