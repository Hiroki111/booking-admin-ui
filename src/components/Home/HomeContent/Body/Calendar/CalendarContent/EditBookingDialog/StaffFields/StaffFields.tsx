import { Grid, Autocomplete, TextField, Box } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Staff } from '../../../../../../../../interfaces/staff';
import * as sx from './styles';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { useStaffAvailabilityQuery } from '../../../../../../../../queries/staffAvailability';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../../services/staff';
import { DEFAULT_BOOKING } from '../../../../../../../../staticData/calendar';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
}

interface StaffFieldsValidation {
  service: string | null;
  date: string | null;
}

const INITIAL_VALIDATION = {
  service: null,
  date: null,
};

// TODO: ESLint is warning of missing dependencies
export function StaffFields({ booking, setBooking }: Props) {
  const defaultStaff = { ...DEFAULT_BOOKING.staff };
  const [staffNameInputValue, setStaffNameInputValue] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff>(defaultStaff);
  const [validation, setValidation] = useState<StaffFieldsValidation>(INITIAL_VALIDATION);
  const { data: staffList } = useStaffListQuery();
  const { data: staffAvailability, isLoading: isLoadingStaffAvailability } = useStaffAvailabilityQuery(
    selectedStaff.id,
    booking.date,
    booking.id,
  );

  const allStaffList = useMemo(() => {
    // NOTE: Without including defaultStaff in allStaffList,
    // Autocomplet will warn that the selected value can't be found in the options
    if (!staffList) {
      return [defaultStaff];
    }
    return [...staffList, defaultStaff];
  }, [staffList]);

  const validationMessages = Object.values(validation).filter((message) => Boolean(message));

  function filterAndSortStaff(allStaffList: Staff[], booking: Booking) {
    const filteredStaffList = allStaffList.filter(
      (staff) =>
        staff.name.toLocaleLowerCase().includes(staffNameInputValue.toLocaleLowerCase()) &&
        staff.id !== defaultStaff.id,
    );

    if (
      booking.staff.id !== defaultStaff.id &&
      !filteredStaffList.map((staff) => staff.id).includes(booking.staff.id)
    ) {
      filteredStaffList.push(booking.staff);
    }

    return filteredStaffList.sort((a: Staff, b: Staff) => a.name.localeCompare(b.name));
  }

  useEffect(() => {
    const initialStaff = allStaffList.find((staff) => staff.id === booking.staffId) || defaultStaff;
    setSelectedStaff(initialStaff);
  }, [allStaffList, booking.staffId]);

  useEffect(() => {
    setValidation((validation) => ({ ...validation, service: null }));
    if (selectedStaff.id === defaultStaff.id) {
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
    if (isLoadingStaffAvailability || selectedStaff.id === defaultStaff.id) {
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

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          options={allStaffList}
          inputValue={staffNameInputValue}
          filterOptions={() => filterAndSortStaff(allStaffList, booking)}
          getOptionLabel={(option: Staff) => option.name}
          renderOption={(props, option) => {
            const key = `listItem-${option.id}`;
            return (
              <li {...props} key={key}>
                {option.name}
              </li>
            );
          }}
          isOptionEqualToValue={(option: Staff, value: Staff) => option.id === value.id}
          value={selectedStaff}
          noOptionsText={'No staff available for the selected services'}
          onChange={(e: React.SyntheticEvent<Element, Event>, newStaff: Staff | null) => {
            if (!newStaff) {
              setBooking({
                ...booking,
                staff: { ...DEFAULT_BOOKING.staff },
                staffId: DEFAULT_BOOKING.staffId,
              });
              setSelectedStaff({ ...defaultStaff });
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
                <Box component="span" key={i} data-testid="staff-validation" sx={sx.errorMessage}>
                  {message}
                </Box>
              ))}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
