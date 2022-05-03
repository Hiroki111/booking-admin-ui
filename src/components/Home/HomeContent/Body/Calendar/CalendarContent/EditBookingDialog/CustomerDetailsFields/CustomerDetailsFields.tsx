import { Grid, TextField } from '@mui/material';

import { Booking, BookingEditFieldObject } from '../../../../../../../../interfaces/booking';

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export function CustomerDetailsFields({ booking, setBooking }: Props) {
  const upperRowFields: BookingEditFieldObject[] = [
    { label: 'First name', fieldName: 'firstName' },
    { label: 'Last name', fieldName: 'lastName' },
  ];
  const lowerRowFields: BookingEditFieldObject[] = [
    { label: 'Phone number', fieldName: 'phoneNumber' },
    { label: 'Email', fieldName: 'email' },
  ];

  function renderCustomerDetailField(fieldObj: BookingEditFieldObject) {
    return (
      <Grid item xs={12} sm={6} key={fieldObj.fieldName}>
        <TextField
          label={fieldObj.label}
          value={booking[fieldObj.fieldName]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBooking({ ...booking, [fieldObj.fieldName]: e.target.value })
          }
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
    );
  }

  return (
    <>
      <Grid item container spacing={2}>
        {upperRowFields.map((field) => renderCustomerDetailField(field))}
      </Grid>
      <Grid item container spacing={2}>
        {lowerRowFields.map((field) => renderCustomerDetailField(field))}
      </Grid>
    </>
  );
}
