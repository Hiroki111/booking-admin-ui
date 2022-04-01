import { Grid, Autocomplete, TextField, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
  staffList: Staff[];
}

export function StaffFields({ booking, setBooking, staffList }: Props) {
  const [isInvalidStaffSelected, setIsInvalidStaffSelected] = useState<boolean>(false);
  const [validationText, setValidationText] = useState<string>('');
  const [staffOptions, setStaffOptions] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
    staffOptions.find((staff) => staff.id === booking.staffId) || null,
  );

  useEffect(() => {
    setStaffOptions(staffList);
  }, [staffList]);

  useEffect(() => {
    const selectedStaff = staffOptions.find((staffOption) => staffOption.id === booking?.staffId);
    if (!selectedStaff) {
      setIsInvalidStaffSelected(false);
      setValidationText('');
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    const staffAvailability = selectedStaff?.availableDates?.find(
      (availableDate) => availableDate.date === booking.date,
    );
    if (!staffAvailability) {
      setIsInvalidStaffSelected(true);
      setValidationText(`${selectedStaff.name} isn't available on ${booking.date}`);
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    const selectedStaffServiceIds = selectedStaff?.services.map((service) => service.id);
    const unavailableServices = booking.services.filter((service) => !selectedStaffServiceIds?.includes(service.id));
    if (unavailableServices.length) {
      setIsInvalidStaffSelected(true);
      setValidationText(
        `${selectedStaff.name} can't do ${unavailableServices.map((service) => service.name).join(', ')}`,
      );
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    const timeslot = findTimeSlotByStartAndEndTime(
      staffAvailability.availableTimeSlots,
      booking.startTime,
      booking.endTime,
    );
    if (!timeslot) {
      setIsInvalidStaffSelected(true);
      setValidationText(
        `${selectedStaff.name} doesn't have available time slot on ${booking.date} from ${dayjs(
          booking.startTime,
          'HH:mm:ss',
        ).format('HH:mm')} to ${dayjs(booking.endTime, 'HH:mm:ss').format('HH:mm')}`,
      );
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    setIsInvalidStaffSelected(false);
    setValidationText('');
    setBooking({ ...booking, staffAvailabilityId: staffAvailability.id });
  }, [setBooking, booking.staffId, booking.date, booking.startTime, booking.endTime, booking.services]);

  return (
    <Grid item container spacing={2}>
      {isInvalidStaffSelected && (
        <Grid item xs={12}>
          <Alert severity="error">{validationText}</Alert>
        </Grid>
      )}
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
          renderInput={(params) => <TextField {...params} variant="outlined" required error={isInvalidStaffSelected} />}
        />
      </Grid>
    </Grid>
  );
}
