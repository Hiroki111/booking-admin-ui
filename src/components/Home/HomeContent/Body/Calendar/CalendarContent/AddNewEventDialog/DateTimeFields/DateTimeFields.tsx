import { useEffect, useState } from 'react';
import { MobileDatePicker, MobileTimePicker } from '@mui/lab';
import { Autocomplete, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Booking } from '../../../../../../../../interfaces/booking';
import { DATE_FORMAT, NEW_BOOKING_ID } from '../../../../../../../../staticData/calendar';
import { useParams } from 'react-router-dom';
import { useBookingQuery } from '../../../../../../../../queries/booking';

dayjs.extend(customParseFormat);

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

const TIME_FORMAT = 'HH:mm:00';

export function DateTimeFields({ booking, setBooking }: Props) {
  const [startTime, setStartTime] = useState<Date>(dayjs(booking.startTime, 'HH:mm:ss').toDate());
  const [endTime, setEndTime] = useState<Date>(dayjs(booking.endTime, 'HH:mm:ss').toDate());
  const [timeValidationText, setTimeValidationText] = useState<string>('');
  const fetchTimeslotsQuery = useTimeslotsQuery();
  const timeslots = (fetchTimeslotsQuery.data || []).map((timeslotString) =>
    dayjs(timeslotString, 'HH:mm:ss').toDate(),
  );
  // I put these lines in 3 components. How do I avoid it?
  const { id } = useParams<{ id: string }>();
  const fetchBookingQuery = useBookingQuery(id);
  const isCreatingBooking = id === String(NEW_BOOKING_ID);

  useEffect(() => {
    if (!isCreatingBooking && fetchBookingQuery.data) {
      setStartTime(dayjs(fetchBookingQuery.data.startTime, 'HH:mm:ss').toDate());
      setEndTime(dayjs(fetchBookingQuery.data.endTime, 'HH:mm:ss').toDate());
    }
  }, [isCreatingBooking, fetchBookingQuery.data]);

  useEffect(() => {
    if (!booking?.services) {
      return;
    }
    if (startTime >= endTime) {
      setTimeValidationText('Booking end time must be after the start time');
      return;
    }

    const estimatedServiceTime = booking.services.reduce((total, service) => total + service.minutes, 0) as number;
    const timeslotLength = dayjs(endTime).diff(dayjs(startTime), 'minutes');
    if (estimatedServiceTime > timeslotLength) {
      setTimeValidationText(`It'll take ${estimatedServiceTime} min to complete the service(s)`);
      return;
    }
    setTimeValidationText('');
  }, [startTime, endTime, booking.services]);

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
          options={timeslots}
          // options={[dayjs('11:00:00', 'HH:mm:ss').toDate(), dayjs('11:30:00', 'HH:mm:ss').toDate()]}
          getOptionLabel={(time) => dayjs(time).format('HH:mm')}
          value={startTime}
          onChange={(e: React.SyntheticEvent<Element, Event>, newStartTime: Date | null) => {
            if (newStartTime) {
              setBooking({ ...booking, startTime: dayjs(newStartTime).format(TIME_FORMAT) });
              setStartTime(newStartTime);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Start at" variant="outlined" required />}
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
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              error={timeValidationText.length > 0}
              helperText={timeValidationText}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
