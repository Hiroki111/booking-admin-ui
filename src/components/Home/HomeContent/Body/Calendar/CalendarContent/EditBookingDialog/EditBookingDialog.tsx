import { useEffect, useState } from 'react';
import { Grid, Typography, Divider, Dialog } from '@mui/material';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { Booking } from '../../../../../../../interfaces/booking';
import * as sx from './styles';
import { useServicesQuery } from '../../../../../../../queries/service';
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
import { FormDialogHeader } from '../../../../../../../util/FormDialog/FormDialogHeader';
import { FormDialogContent } from '../../../../../../../util/FormDialog/FormDialogContent';
import { FormDialogNotification } from '../../../../../../../util/FormDialog/FormDialogNotification';
import { FormDialogActions } from '../../../../../../../util/FormDialog/FormDialogActions';

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
  const fetchBooking = useBookingQuery(id);
  const saveBookingMutation = useSaveBookingMutation(id);
  const { refetch } = useBookingsQuery(year, month);
  const isLoadingContent = [fetchBooking].some((query) => query.isLoading);
  const hasLoadingDataError = [fetchServicesQuery, fetchStaffListQuery, fetchStaffAvailabilityQuery, fetchBooking].some(
    (query) => query.isError,
  );

  useEffect(() => {
    if (!isCreatingNewBooking && fetchBooking.data) {
      setBooking(fetchBooking.data);
    }
  }, [isCreatingNewBooking, fetchBooking.data]);

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

  return (
    <Dialog open maxWidth={'lg'}>
      <FormDialogHeader onCancel={handleCancel}>{`${isCreatingNewBooking ? 'Add' : 'Edit'} Booking`}</FormDialogHeader>
      <FormDialogContent isLoadingContent={isLoadingContent}>
        <FormDialogNotification
          hasLoadingDataError={hasLoadingDataError}
          isDataSubmissionSuccessful={saveBookingMutation.isSuccess}
          dataSubmissionError={saveBookingMutation.error}
          dataSubmissonSuccessMessage={'Booking Saved'}
        />
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
      </FormDialogContent>
      <FormDialogActions
        onCancel={handleCancel}
        onSubmitForm={handleSubmitBooking}
        isSubmittingData={saveBookingMutation.isLoading}
      />
    </Dialog>
  );
}
