import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Grid, TextField } from '@mui/material';
import { MobileDatePicker, MobileTimePicker } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { Booking } from '../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../interfaces/service';
import { Staff } from '../../../../../../../interfaces/staff';
import { useStyles } from './useStyles';

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

export function AddNewEventDialog() {
  const classes = useStyles();
  const [booking, setBooking] = useState<Booking>(DEFAULT_BOOKING);
  const [startTime, setStartTime] = useState<Date>(dayjs().minute(0).toDate());
  const [endTime, setEndTime] = useState<Date>(dayjs().add(1, 'hour').minute(0).toDate());
  const { setIsAddingNewEvent } = useCalendarContext();

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
          <Grid item container alignItems={'center'}>
            <div className={classes.datepickerContainer}>
              <MobileDatePicker
                inputFormat={DATE_FORMAT}
                mask={'____-__-__'}
                value={booking.date}
                onChange={(newDate: string | null) => {
                  if (!newDate) {
                    return;
                  }
                  setBooking({ ...booking, date: dayjs(newDate).format(DATE_FORMAT) });
                }}
                renderInput={(params) => <TextField variant="standard" {...params} />}
              />
            </div>
            <div className={classes.timepickerContainer}>
              <MobileTimePicker
                value={startTime}
                onChange={(newStartTime: Date | null) => {
                  if (!newStartTime) {
                    return;
                  }
                  setStartTime(newStartTime);
                  setBooking({ ...booking, startTime: dayjs(newStartTime).format(TIME_FORMAT) });
                }}
                renderInput={(params) => <TextField variant="standard" {...params} />}
              />
            </div>
            <div>to</div>
            <div className={classes.timepickerContainer}>
              <MobileTimePicker
                value={endTime}
                onChange={(newEndTime: Date | null) => {
                  if (!newEndTime) {
                    return;
                  }
                  setEndTime(newEndTime);
                  setBooking({ ...booking, endTime: dayjs(newEndTime).format(TIME_FORMAT) });
                }}
                renderInput={(params) => <TextField variant="standard" {...params} />}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              className={classes.textField}
              value={booking.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBooking({ ...booking, firstName: e.target.value })
              }
              label="Customer's first name"
              variant="outlined"
              required
            />
            <TextField
              className={classes.textField}
              value={booking.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBooking({ ...booking, lastName: e.target.value })
              }
              label="Customer's last name"
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container>
            <TextField
              className={classes.textField}
              value={booking.phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBooking({ ...booking, phoneNumber: e.target.value })
              }
              label="Phone number"
              variant="outlined"
              required
            />
            <TextField
              className={classes.textField}
              value={booking.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBooking({ ...booking, email: e.target.value })}
              label="Email"
              variant="outlined"
              type={'email'}
              required
            />
          </Grid>
          <Grid item>{/** serviceIds totalPrice staffId staffAvailabilityId */}</Grid>
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
