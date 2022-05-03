import { useEffect, useMemo, useState } from 'react';
import { MobileDatePicker } from '@mui/lab';
import { Autocomplete, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { DATE_FORMAT } from '../../../../../../../../staticData/calendar';
import { useTimeslotsQuery } from '../../../../../../../../queries/timeslotSetting';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export function DateTimeFields({ booking, setBooking }: Props) {
  const [timeValidationText, setTimeValidationText] = useState<string>('');
  const fetchTimeslotsQuery = useTimeslotsQuery();
  const timeslots = useMemo(() => fetchTimeslotsQuery.data || [], [fetchTimeslotsQuery.data]);

  useEffect(() => {
    const estimatedServiceTime = booking.services.reduce((total, service) => total + service.minutes, 0) as number;
    const endTime = dayjs(booking.startTime, 'HH:mm').add(estimatedServiceTime, 'minutes').format('HH:mm');
    if (endTime === booking.endTime) {
      return;
    }
    setBooking({ ...booking, endTime });
  }, [booking, setBooking]);

  useEffect(() => {
    const lastTimeslot = timeslots[timeslots.length - 1];
    if (!lastTimeslot || booking.endTime <= lastTimeslot.endTime) {
      setTimeValidationText('');
      return;
    }

    setTimeValidationText(`It must end by the end of the last timeslot (${lastTimeslot.endTime})`);
  }, [booking.endTime, timeslots]);

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
        <Autocomplete
          options={timeslots.map((timeslot) => timeslot.startTime)}
          value={booking.startTime}
          onChange={(e: React.SyntheticEvent<Element, Event>, startTime: string | null) => {
            if (startTime) {
              setBooking({ ...booking, startTime });
            }
          }}
          renderInput={(params) => <TextField {...params} label="Start at" variant="outlined" required />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="End at"
          variant="outlined"
          value={booking.endTime}
          helperText={timeValidationText}
          error={timeValidationText.length > 0}
          required
          disabled
        />
      </Grid>
    </Grid>
  );
}
