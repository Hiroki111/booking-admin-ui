import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { Booking } from '../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../interfaces/service';
import { Staff } from '../../../../../../../interfaces/staff';

import { useStyles } from './useStyles';

const DEFAULT_BOOKING = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  staffId: null as unknown as number,
  date: '', // today yyyy-mm-dd
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
  const { setIsAddingNewEvent } = useCalendarContext();

  return (
    <Dialog onClose={() => {}} open maxWidth="lg" fullWidth>
      <Grid container justifyContent="space-between">
        <DialogTitle>Modal title</DialogTitle>
        <IconButton className={classes.closeButton} onClick={() => setIsAddingNewEvent(false)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <DialogContent dividers>
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
