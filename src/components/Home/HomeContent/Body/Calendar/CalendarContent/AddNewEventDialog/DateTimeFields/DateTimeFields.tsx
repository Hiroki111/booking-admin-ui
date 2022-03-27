import { useState } from 'react';
import { MobileDatePicker, MobileTimePicker } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '../AddNewEventDialog';
import { Booking } from '../../../../../../../../interfaces/booking';

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

const TIME_FORMAT = 'HH:mm:00';

export function DateTimeFields({ booking, setBooking }: Props) {
  const [startTime, setStartTime] = useState<Date>(dayjs().minute(0).toDate());
  const [endTime, setEndTime] = useState<Date>(dayjs().add(1, 'hour').minute(0).toDate());

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} sm={4}>
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
          renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <MobileTimePicker
          label="Start at"
          value={startTime}
          onChange={(newStartTime: Date | null) => {
            if (newStartTime) {
              setBooking({ ...booking, startTime: dayjs(newStartTime).format(TIME_FORMAT) });
              setStartTime(newStartTime);
            }
          }}
          renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <MobileTimePicker
          label="End at"
          value={endTime}
          onChange={(newEndTime: Date | null) => {
            if (newEndTime) {
              setBooking({ ...booking, endTime: dayjs(newEndTime).format(TIME_FORMAT) });
              setEndTime(newEndTime);
            }
          }}
          renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
        />
      </Grid>
    </Grid>
  );
}
