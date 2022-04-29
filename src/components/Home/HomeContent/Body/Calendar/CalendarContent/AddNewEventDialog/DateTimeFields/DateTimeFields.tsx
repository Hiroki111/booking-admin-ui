import { useEffect, useMemo, useState } from 'react';
import { MobileDatePicker } from '@mui/lab';
import { Autocomplete, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { DATE_FORMAT, NEW_BOOKING_ID } from '../../../../../../../../staticData/calendar';
import { useParams } from 'react-router-dom';
import { useBookingQuery } from '../../../../../../../../queries/booking';
import { useTimeslotsQuery } from '../../../../../../../../queries/timeslotSetting';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export function DateTimeFields({ booking, setBooking }: Props) {
  const [startTime, setStartTime] = useState<string>(booking.startTime);
  const [endTime, setEndTime] = useState<string>(booking.endTime);
  const [timeValidationText, setTimeValidationText] = useState<string>('');
  const fetchTimeslotsQuery = useTimeslotsQuery();
  const timeslots = useMemo(() => fetchTimeslotsQuery.data || [], [fetchTimeslotsQuery.data]);
  // I put these lines in 3 components. How do I avoid it?
  const { id } = useParams<{ id: string }>();
  const fetchBookingQuery = useBookingQuery(id);
  const isCreatingBooking = id === String(NEW_BOOKING_ID);

  useEffect(() => {
    if (!isCreatingBooking && fetchBookingQuery.data) {
      setStartTime(fetchBookingQuery.data.startTime);
      setEndTime(fetchBookingQuery.data.endTime);
    }
  }, [isCreatingBooking, fetchBookingQuery.data]);

  useEffect(() => {
    if (!timeslots?.length) {
      return;
    }

    const estimatedServiceTime = booking.services.reduce((total, service) => total + service.minutes, 0) as number;
    const newEndTime = dayjs(startTime, 'HH:mm').add(estimatedServiceTime, 'minutes').format('HH:mm');
    setEndTime(newEndTime);
    const lastTimeslot = timeslots[timeslots.length - 1];
    if (lastTimeslot.endTime < newEndTime) {
      setTimeValidationText(`It must end by the end of the last timeslot (${lastTimeslot.endTime})`);
    } else {
      setTimeValidationText('');
    }
  }, [startTime, booking.services, timeslots]);

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
          value={startTime}
          onChange={(e: React.SyntheticEvent<Element, Event>, startTime: string | null) => {
            if (startTime) {
              setBooking({ ...booking, startTime });
              setStartTime(startTime);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Start at" variant="outlined" required />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="End at"
          variant="outlined"
          value={endTime}
          helperText={timeValidationText}
          error={timeValidationText.length > 0}
          required
          disabled
        />
      </Grid>
    </Grid>
  );
}
