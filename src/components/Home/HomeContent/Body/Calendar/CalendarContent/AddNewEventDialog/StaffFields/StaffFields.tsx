import { Grid, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';
import { useStyles } from './useStyles';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { useParams } from 'react-router-dom';
import { useBookingQuery } from '../../../../../../../../queries/booking';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
  isCreatingNewBooking: boolean;
}

export function StaffFields({ booking, setBooking, isCreatingNewBooking }: Props) {
  const classes = useStyles();
  const fetchStaffListQuery = useStaffListQuery();
  const allStaffList = useMemo(() => fetchStaffListQuery?.data || [], [fetchStaffListQuery?.data]);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [staffOptions, setStaffOptions] = useState<Staff[]>([]);
  const { id } = useParams<{ id: string }>();
  const fetchBookingQuery = useBookingQuery(id);

  // Filter staffOptions by date/time, services
  useEffect(() => {
    const selectedServiceIds = booking.services.map((service) => service.id);
    let filteredStaffOptions = allStaffList.filter((staff) => {
      const staffServiceIds = staff.services.map((service) => service.id);
      if (!selectedServiceIds.every((id) => staffServiceIds.includes(id))) {
        return false;
      }

      const staffAvailability = staff.availableDates?.find((availableDate) => availableDate.date === booking.date);
      if (!staffAvailability) {
        return false;
      }
      const timeslot = findTimeSlotByStartAndEndTime(
        staffAvailability?.availableTimeSlots || [],
        booking.startTime,
        booking.endTime,
      );
      return !!timeslot;
    });

    if (booking.staff?.id && !filteredStaffOptions.map((staff) => staff.id).includes(booking.staff.id)) {
      filteredStaffOptions = [...filteredStaffOptions, booking.staff];
    }

    setStaffOptions(filteredStaffOptions);
  }, [allStaffList, booking.staff, booking.date, booking.startTime, booking.endTime, booking.services]);

  // Validate the selected staff
  useEffect(() => {
    setValidationMessages([]);
    const selectedStaff = allStaffList.find((staff) => staff.id === booking?.staff?.id) || null;
    if (!selectedStaff) {
      return;
    }

    const messages = [];
    const selectedStaffServiceIds = selectedStaff.services.map((service) => service.id);
    const unavailableServices = booking.services.filter((service) => !selectedStaffServiceIds?.includes(service.id));
    const staffAvailability = selectedStaff.availableDates?.find((availableDate) => {
      if (isCreatingNewBooking) {
        return availableDate.date === booking.date;
      }
      return availableDate.date === fetchBookingQuery.data?.date || availableDate.date === booking.date;
    });
    const timeslot = findTimeSlotByStartAndEndTime(
      staffAvailability?.availableTimeSlots || [],
      booking.startTime,
      booking.endTime,
    );
    let hasAvailableTimeslot;
    if (isCreatingNewBooking) {
      hasAvailableTimeslot = !!timeslot;
    } else {
      hasAvailableTimeslot =
        !!timeslot ||
        (fetchBookingQuery.data?.startTime === booking.startTime &&
          fetchBookingQuery.data?.endTime === booking.endTime);
    }

    if (unavailableServices?.length) {
      messages.push(`${selectedStaff.name} can't do ${unavailableServices.map((service) => service.name).join(', ')}`);
    }
    if (!staffAvailability) {
      messages.push(`${selectedStaff.name} isn't available on ${booking.date}`);
    } else if (!hasAvailableTimeslot) {
      messages.push(
        `${selectedStaff.name} isn't available from ${booking.startTime} to ${booking.endTime} on ${booking.date}`,
      );
    }

    setValidationMessages(messages);
  }, [
    allStaffList,
    fetchBookingQuery.data,
    isCreatingNewBooking,
    booking.staff,
    booking.date,
    booking.startTime,
    booking.endTime,
    booking.services,
  ]);

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          options={staffOptions}
          getOptionLabel={(option: Staff) => option?.name || ''}
          isOptionEqualToValue={(option: Staff, value: Staff) => option.id === value.id}
          value={booking.staff}
          noOptionsText={'No staff available for the selected date, time and services'}
          onChange={(e: React.SyntheticEvent<Element, Event>, value: Staff | null) => {
            if (!value) {
              return;
            }

            const staffAvailability = value?.availableDates?.find(
              (availableDate) => availableDate.date === booking.date,
            );
            setBooking({
              ...booking,
              staff: value,
              staffId: value.id,
              staffAvailabilityId: staffAvailability?.id || (null as unknown as number),
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              required
              error={validationMessages.length > 0}
              helperText={validationMessages?.map((message, i) => (
                <span key={i} data-testid="staff-validation" className={classes.errorMessage}>
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
