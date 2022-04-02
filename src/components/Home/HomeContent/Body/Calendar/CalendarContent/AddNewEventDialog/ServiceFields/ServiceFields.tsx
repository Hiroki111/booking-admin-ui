import { Grid, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../../interfaces/service';

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
  services: Service[];
}

type ServiceOption = Pick<Service, 'id' | 'name' | 'serviceType' | 'price' | 'minutes'>;

export function ServiceFields({ booking, setBooking, services }: Props) {
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<ServiceOption[]>([]);

  useEffect(() => {
    const serviceOptions = convertServicesToServiceOptions(services);
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);
  }, [services, setServiceOptions]);

  function convertServicesToServiceOptions(services: Service[]) {
    return services.map((service) => ({
      id: service.id,
      name: service.name,
      serviceType: service.serviceType,
      price: service.price,
      minutes: service.minutes,
    })) as ServiceOption[];
  }

  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={serviceOptions}
            groupBy={(option) => option.serviceType.name}
            getOptionLabel={(option) => `${option.name} (${option.minutes} min)`}
            value={selectedServiceOptions}
            onChange={(event: React.SyntheticEvent<Element, Event>, value: ServiceOption[]) => {
              setSelectedServiceOptions(value);
              setBooking({ ...booking, services: value as Service[] });
            }}
            renderInput={(params) => <TextField {...params} label="Selected services" variant="outlined" required />}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={6}>
          <TextField
            value={`${selectedServiceOptions.reduce(
              (totalPrice, serviceOption) => totalPrice + serviceOption.price,
              0,
            )} €`}
            label="Total price"
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={`${selectedServiceOptions.reduce(
              (totalMinutes, serviceOption) => totalMinutes + serviceOption.minutes,
              0,
            )} min`}
            label="Estimated time"
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
