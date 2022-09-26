import { Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../../interfaces/service';
import { useServicesQuery } from '../../../../../../../../queries/service';

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export function ServiceFields({ booking, setBooking }: Props) {
  const [serviceOptions, setServiceOptions] = useState<Service[]>(booking.services);
  const fetchServicesQuery = useServicesQuery();

  useEffect(() => {
    const serviceOptions = fetchServicesQuery?.data || [];
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);
  }, [fetchServicesQuery?.data, setServiceOptions]);

  useEffect(() => {
    setBooking({
      ...booking,
      totalPrice: booking.services.reduce((total, service) => total + service.price, 0),
    });
  }, [booking.services]);

  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            data-testid="service-list"
            multiple
            options={serviceOptions}
            isOptionEqualToValue={(option: Service, value: Service) => option.id === value.id}
            groupBy={(option) => option.serviceType.name}
            getOptionLabel={(option) => `${option.name} (${option.minutes} min)`}
            value={booking.services}
            onChange={(event: React.SyntheticEvent<Element, Event>, value: Service[]) => {
              setBooking({ ...booking, services: value as Service[] });
            }}
            renderInput={(params) => <TextField {...params} label="Selected services" variant="outlined" required />}
          />
        </Grid>
      </Grid>
      <Typography paragraph textAlign="end" marginBottom="0" width="100%" paddingTop="16px">
        Total price: {`${booking.services.reduce((total, service) => total + service.price, 0)} €`}
      </Typography>
      <Typography paragraph textAlign="end" marginBottom="0" width="100%">
        Estimated time: {`${booking.services.reduce((total, service) => total + service.minutes, 0)} min`}
      </Typography>
    </>
  );
}
