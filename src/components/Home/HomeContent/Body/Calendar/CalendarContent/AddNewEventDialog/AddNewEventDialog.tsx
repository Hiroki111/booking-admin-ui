import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { MobileDatePicker, MobileTimePicker } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { Booking } from '../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../interfaces/service';
import { Staff } from '../../../../../../../interfaces/staff';
import { useStyles } from './useStyles';
import { useServicesQuery } from '../../../../../../../queries/service';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useStaffListQuery } from '../../../../../../../queries/staff';
import { findTimeSlotByStartAndEndTime } from '../../../../../../../services/staff';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:00';
const DEFAULT_BOOKING = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  staffId: null as unknown as number,
  date: dayjs().format(DATE_FORMAT),
  startTime: '10:00:00',
  endTime: '12:00:00',
  staffAvailabilityId: null as unknown as number,
  totalPrice: 0,
  staff: {} as Staff,
  services: [] as Service[],
} as Booking;

type ServiceOption = Pick<Service, 'id' | 'name' | 'serviceType' | 'price' | 'minutes'>;

export function AddNewEventDialog() {
  const classes = useStyles();
  const [booking, setBooking] = useState<Booking>(DEFAULT_BOOKING);
  const [startTime, setStartTime] = useState<Date>(dayjs().minute(0).toDate());
  const [endTime, setEndTime] = useState<Date>(dayjs().add(1, 'hour').minute(0).toDate());
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [staffOptions, setStaffOptions] = useState<Staff[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<ServiceOption[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
    staffOptions.find((staff) => staff.id === booking.staffId) || null,
  );
  const { setIsAddingNewEvent } = useCalendarContext();
  const fetchServicesQuery = useServicesQuery();
  const fetchStaffListQuery = useStaffListQuery();

  useEffect(() => {
    const serviceOptions = convertServicesToServiceOptions(fetchServicesQuery?.data || ([] as Service[]));
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);
  }, [fetchServicesQuery?.data]);

  useEffect(() => {
    const selectedStaff = staffOptions.find((staffOption) => staffOption.id === booking?.staffId);
    const staffAvailability = selectedStaff?.availableDates?.find(
      (availableDate) => availableDate.date === booking.date,
    );
    if (!staffAvailability) {
      // TODO Show warning: selectedStaff isn't available on ${booking.date}
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    const selectedStaffServiceIds = selectedStaff?.services.map((service) => service.id);
    const selectedServiceIds = booking.services.map((service) => service.id);
    if (!selectedServiceIds.every((serviceId) => selectedStaffServiceIds?.includes(serviceId))) {
      // TODO Show warning: This staff can't do all the selected services
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
      return;
    }

    const timeslot = findTimeSlotByStartAndEndTime(
      staffAvailability.availableTimeSlots,
      booking.startTime,
      booking.endTime,
    );

    if (!timeslot) {
      // TODO Show warning: This staff doesn't have available time slot on ${booking.date} from ${booking.startTime} to ${booking.endTime}.
      // Change the date, start/end time, or select a different staff
      setBooking({ ...booking, staffAvailabilityId: null as unknown as number });
    } else {
      setBooking({ ...booking, staffAvailabilityId: staffAvailability.id });
    }
  }, [booking.staffId, booking.date, booking.startTime, booking.endTime, booking.services]);

  useEffect(() => {
    const staffList = fetchStaffListQuery?.data || ([] as Staff[]);
    setStaffOptions(staffList);
  }, [fetchStaffListQuery?.data, selectedServiceOptions]);

  function convertServicesToServiceOptions(services: Service[]) {
    return services.map((service) => ({
      id: service.id,
      name: service.name,
      serviceType: service.serviceType,
      price: service.price,
      minutes: service.minutes,
    })) as ServiceOption[];
  }

  if (fetchServicesQuery.isError || fetchStaffListQuery.isError) {
    return <WarningAlert message={'It failed to load data'} />;
  } else if (fetchServicesQuery.isFetching || fetchStaffListQuery.isFetching) {
    return (
      <Typography component="p" color="inherit">
        Loading...
      </Typography>
    );
  }

  return (
    <Dialog onClose={() => {}} open maxWidth="lg" fullWidth>
      <Grid container justifyContent="space-between">
        <DialogTitle>Add new event</DialogTitle>
        <IconButton className={classes.closeButton} onClick={() => setIsAddingNewEvent(false)} size="large">
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
        <Grid container>
          <Grid container item md={6} sm={12}>
            <Grid item className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Date and time
              </Typography>
              <div className={classes.row}>
                <div className={classes.dateContainer}>
                  <MobileDatePicker
                    label="Date"
                    inputFormat={DATE_FORMAT}
                    mask={'____-__-__'}
                    value={booking.date}
                    onChange={(newDate: string | null) => {
                      if (newDate) {
                        setBooking({ ...booking, date: dayjs(newDate).format(DATE_FORMAT) });
                      }
                    }}
                    renderInput={(params) => <TextField variant="outlined" {...params} />}
                  />
                </div>
                <div className={classes.timeContainer}>
                  <MobileTimePicker
                    label="Start at"
                    value={startTime}
                    onChange={(newStartTime: Date | null) => {
                      if (newStartTime) {
                        setBooking({ ...booking, startTime: dayjs(newStartTime).format(TIME_FORMAT) });
                        setStartTime(newStartTime);
                      }
                    }}
                    renderInput={(params) => <TextField variant="outlined" {...params} />}
                  />
                </div>
                <div className={classes.timeContainer}>
                  <MobileTimePicker
                    label="End at"
                    value={endTime}
                    onChange={(newEndTime: Date | null) => {
                      if (newEndTime) {
                        setBooking({ ...booking, endTime: dayjs(newEndTime).format(TIME_FORMAT) });
                        setEndTime(newEndTime);
                      }
                    }}
                    renderInput={(params) => <TextField variant="outlined" {...params} />}
                  />
                </div>
              </div>
            </Grid>
            <Grid item className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Customer details
              </Typography>
              <div className={classes.row}>
                <TextField
                  label="First Name"
                  className={classes.textField}
                  value={booking.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBooking({ ...booking, firstName: e.target.value })
                  }
                  variant="outlined"
                  required
                />
                <TextField
                  label="Last Name"
                  className={classes.textField}
                  value={booking.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBooking({ ...booking, lastName: e.target.value })
                  }
                  variant="outlined"
                  required
                />
              </div>
              <div className={classes.row}>
                <TextField
                  label="Phone Number"
                  className={classes.textField}
                  value={booking.phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBooking({ ...booking, phoneNumber: e.target.value })
                  }
                  variant="outlined"
                  required
                />
                <TextField
                  label="Email"
                  className={classes.textField}
                  value={booking.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBooking({ ...booking, email: e.target.value })
                  }
                  variant="outlined"
                  required
                />
              </div>
            </Grid>
          </Grid>
          <Grid container item md={6} sm={12}>
            <Grid item className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Service
              </Typography>
              <div className={classes.row}>
                <Autocomplete
                  multiple
                  classes={{ root: classes.textField }}
                  options={serviceOptions}
                  groupBy={(option) => option.serviceType.name}
                  getOptionLabel={(option) => `${option.name} (${option.minutes} min)`}
                  value={selectedServiceOptions}
                  onChange={(event: React.SyntheticEvent<Element, Event>, value: ServiceOption[]) => {
                    setSelectedServiceOptions(value);
                    setBooking({ ...booking, services: value as Service[] });
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" required />}
                />
              </div>
              <div className={classes.row}>
                <TextField
                  className={classes.textField}
                  value={`${selectedServiceOptions.reduce(
                    (totalPrice, serviceOption) => totalPrice + serviceOption.price,
                    0,
                  )} €`}
                  label="Total price"
                  variant="standard"
                  disabled
                />
                <TextField
                  className={classes.textField}
                  value={`${selectedServiceOptions.reduce(
                    (totalMinutes, serviceOption) => totalMinutes + serviceOption.minutes,
                    0,
                  )} min`}
                  label="Required time"
                  variant="standard"
                  disabled
                />
              </div>
            </Grid>
            <Grid item className={classes.fieldGroup}>
              <Typography paragraph className={classes.dividerText}>
                Staff
              </Typography>
              <div className={classes.row}>
                <Autocomplete
                  options={staffOptions}
                  classes={{ root: classes.textField }}
                  getOptionLabel={(staff) => staff.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={selectedStaff}
                  onChange={(e: React.SyntheticEvent<Element, Event>, value: Staff | null) => {
                    setSelectedStaff(value);
                    setBooking({ ...booking, staffId: value?.id || (null as unknown as number) });
                  }}
                  renderInput={(params) => <TextField {...params} variant="outlined" required />}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button autoFocus color="primary" onClick={() => setIsAddingNewEvent(false)}>
          Cancel
        </Button>
        <Button autoFocus color="primary" variant="contained" onClick={() => {}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
