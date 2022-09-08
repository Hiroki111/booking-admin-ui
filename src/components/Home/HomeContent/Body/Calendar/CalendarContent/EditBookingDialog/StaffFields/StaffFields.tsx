import { Grid, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import { useStyles } from './useStyles';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { Service } from '../../../../../../../../interfaces/service';
import { useStaffAvailabilityQuery } from '../../../../../../../../queries/staffAvailability';
import { WarningAlert } from '../../../../../../../../util/WarningAlert';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
}

interface StaffFieldsValidation {
  service: string | null;
  date: string | null;
}

const DEFAULT_STAFF_OPTION = {
  id: -1,
  name: '',
  services: [] as Service[],
} as Staff;

const INITIAL_VALIDATION = {
  service: null,
  date: null,
};

export function StaffFields({ booking, setBooking }: Props) {
  const classes = useStyles();
  const [staffNameInputValue, setStaffNameInputValue] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff>(DEFAULT_STAFF_OPTION);
  const [validation, setValidation] = useState<StaffFieldsValidation>(INITIAL_VALIDATION);
  const { data: staffList, isError: isLoadingStaffListFailed } = useStaffListQuery();
  const {
    data: staffAvailability,
    isLoading: isLoadingStaffAvailability,
    isError: isLoadingStaffAvailabilityFailed,
  } = useStaffAvailabilityQuery(selectedStaff.id, booking.date, booking.id);

  const allStaffList = useMemo(() => {
    if (!staffList) {
      return [DEFAULT_STAFF_OPTION];
    }
    return [...staffList, DEFAULT_STAFF_OPTION];
  }, [staffList]);

  const validationMessages = Object.values(validation).filter((message) => Boolean(message));

  function filterStaff(allStaffList: Staff[], booking: Booking) {
    const filteredStaffList = allStaffList.filter((staff) =>
      staff.name.toLocaleLowerCase().includes(staffNameInputValue.toLocaleLowerCase()),
    );

    if (booking.staff?.id && !filteredStaffList.map((staff) => staff.id).includes(booking.staff.id)) {
      filteredStaffList.push(booking.staff);
    }

    return filteredStaffList;
  }

  useEffect(() => {
    const initialStaff = allStaffList.find((staff) => staff.id === booking.staffId) || DEFAULT_STAFF_OPTION;
    setSelectedStaff(initialStaff);
  }, [allStaffList, booking.staffId]);

  useEffect(() => {
    setValidation((validation) => ({ ...validation, service: null }));
    if (selectedStaff.id === DEFAULT_STAFF_OPTION.id) {
      return;
    }

    const selectedStaffServiceIds = selectedStaff.services.map((service) => service.id);
    const unavailableServices = booking.services.filter((service) => !selectedStaffServiceIds?.includes(service.id));

    if (unavailableServices?.length) {
      setValidation((validation) => ({
        ...validation,
        service: `${selectedStaff.name} can't do ${unavailableServices.map((service) => service.name).join(', ')}`,
      }));
    }
  }, [selectedStaff, booking.services]);

  useEffect(() => {
    setValidation((validation) => ({ ...validation, date: null }));
    if (isLoadingStaffAvailability || selectedStaff.id === DEFAULT_STAFF_OPTION.id) {
      return;
    }

    if (!staffAvailability?.id) {
      setValidation((validation) => ({
        ...validation,
        date: `${selectedStaff.name} isn't available on ${booking.date}`,
      }));
      setBooking((booking: Booking) => ({ ...booking, staffAvailabilityId: null as unknown as number }));
      return;
    }

    setBooking((booking: Booking) => ({ ...booking, staffAvailabilityId: staffAvailability.id }));

    const timeslot = findTimeSlotByStartAndEndTime(
      staffAvailability?.availableTimeSlots || [],
      booking.startTime,
      booking.endTime,
    );

    if (!timeslot) {
      setValidation((validation) => ({
        ...validation,
        date: `${selectedStaff.name} isn't available from ${booking.startTime} to ${booking.endTime} on ${booking.date}`,
      }));
    }
  }, [
    selectedStaff,
    staffAvailability,
    isLoadingStaffAvailability,
    booking.date,
    booking.startTime,
    booking.endTime,
    setBooking,
  ]);

  if (isLoadingStaffAvailabilityFailed || isLoadingStaffListFailed) {
    return <WarningAlert message={'It failed to load staff data'} />;
  }

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          options={allStaffList}
          inputValue={staffNameInputValue}
          filterOptions={() => filterStaff(allStaffList, booking)}
          getOptionLabel={(option: Staff) => option?.name || ''}
          isOptionEqualToValue={(option: Staff, value: Staff) => option.id === value.id}
          value={selectedStaff}
          noOptionsText={'No staff available for the selected services'}
          onChange={(e: React.SyntheticEvent<Element, Event>, newStaff: Staff | null) => {
            if (!newStaff) {
              return;
            }

            setBooking({ ...booking, staff: newStaff, staffId: newStaff.id });
            setSelectedStaff(newStaff);
          }}
          onInputChange={(event, newInputValue) => setStaffNameInputValue(newInputValue)}
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
