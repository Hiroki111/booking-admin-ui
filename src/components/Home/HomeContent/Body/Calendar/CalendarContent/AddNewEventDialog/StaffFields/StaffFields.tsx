import { Grid, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';
import { useStyles } from './useStyles';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { useBookingQuery } from '../../../../../../../../queries/booking';
import { Service } from '../../../../../../../../interfaces/service';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
  isCreatingNewBooking: boolean;
}

const DEFAULT_STAFF_OPTION = { id: -1, name: '', services: [] as Service[] } as Staff;

export function StaffFields({ booking, setBooking, isCreatingNewBooking }: Props) {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const fetchBookingQuery = useBookingQuery(id);
  const fetchStaffListQuery = useStaffListQuery();
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff>(DEFAULT_STAFF_OPTION);
  const allStaffList = useMemo(() => {
    if (!fetchStaffListQuery?.data) {
      return [DEFAULT_STAFF_OPTION];
    }
    return [...fetchStaffListQuery.data, DEFAULT_STAFF_OPTION];
  }, [fetchStaffListQuery?.data]);

  function filterStaff(allStaffList: Staff[], booking: Booking) {
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

    return filteredStaffOptions;
  }

  useEffect(() => {
    const initialStaff = allStaffList.find((staff) => staff.id === booking.staffId) || DEFAULT_STAFF_OPTION;
    setSelectedStaff(initialStaff);
  }, [allStaffList, booking.staffId]);

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
          options={allStaffList}
          filterOptions={() => filterStaff(allStaffList, booking)}
          getOptionLabel={(option: Staff) => option?.name || ''}
          isOptionEqualToValue={(option: Staff, value: Staff) => option.id === value.id}
          value={selectedStaff}
          noOptionsText={'No staff available for the selected date, time and services'}
          onChange={(e: React.SyntheticEvent<Element, Event>, newStaff: Staff | null) => {
            const staffAvailability = newStaff?.availableDates?.find(
              (availableDate) => availableDate.date === booking.date,
            );
            if (!newStaff || !staffAvailability) {
              return;
            }

            setBooking({
              ...booking,
              staff: newStaff,
              staffId: newStaff.id,
              staffAvailabilityId: staffAvailability.id,
            });
            setSelectedStaff(newStaff);
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
