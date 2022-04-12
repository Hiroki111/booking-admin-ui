import { Grid, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';
import { useStyles } from './useStyles';
import { useStaffListQuery } from '../../../../../../../../queries/staff';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export function StaffFields({ booking, setBooking }: Props) {
  const classes = useStyles();
  const fetchStaffListQuery = useStaffListQuery();
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [staffOptions, setStaffOptions] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
    staffOptions.find((staff) => staff.id === booking.staffId) || null,
  );

  useEffect(() => {
    setStaffOptions(fetchStaffListQuery?.data || []);
  }, [fetchStaffListQuery?.data]);

  useEffect(() => {
    const staffAvailability = selectedStaff?.availableDates?.find(
      (availableDate) => availableDate.date === booking.date,
    );
    setBooking({ ...booking, staffAvailabilityId: staffAvailability?.id || (null as unknown as number) });
  }, [selectedStaff]);

  useEffect(() => {
    setValidationMessages([]);
    const selectedStaff = staffOptions.find((staffOption) => staffOption.id === booking.staffId);
    if (!selectedStaff) {
      return;
    }

    const messages = [];
    const selectedStaffServiceIds = selectedStaff.services.map((service) => service.id);
    const unavailableServices = booking.services.filter((service) => !selectedStaffServiceIds?.includes(service.id));
    const staffAvailability = selectedStaff.availableDates?.find(
      (availableDate) => availableDate.date === booking.date,
    );
    const timeslot = findTimeSlotByStartAndEndTime(
      staffAvailability?.availableTimeSlots || [],
      booking.startTime,
      booking.endTime,
    );

    if (unavailableServices?.length) {
      messages.push(`${selectedStaff.name} can't do ${unavailableServices.map((service) => service.name).join(', ')}`);
    }
    if (!staffAvailability) {
      messages.push(`${selectedStaff.name} isn't available on ${booking.date}`);
    } else if (!timeslot) {
      const startTimeStr = dayjs(booking.startTime, 'HH:mm:ss').format('HH:mm');
      const endTimeStr = dayjs(booking.endTime, 'HH:mm:ss').format('HH:mm');
      messages.push(`${selectedStaff.name} isn't available from ${startTimeStr} to ${endTimeStr} on ${booking.date}`);
    }

    setValidationMessages([...messages]);
  }, [staffOptions, setBooking, booking.staffId, booking.date, booking.startTime, booking.endTime, booking.services]);

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          options={staffOptions}
          getOptionLabel={(staff) => staff.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedStaff}
          onChange={(e: React.SyntheticEvent<Element, Event>, value: Staff | null) => {
            setSelectedStaff(value);
            setBooking({ ...booking, staffId: value?.id || (null as unknown as number) });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              required
              error={validationMessages.length > 0}
              helperText={validationMessages?.map((message, i) => (
                <span key={i} className={classes.errorMessage}>
                  {message}
                </span>
              ))}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
