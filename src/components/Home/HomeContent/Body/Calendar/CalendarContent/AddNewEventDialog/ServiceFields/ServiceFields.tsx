import { Grid, Autocomplete, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Booking } from '../../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../../interfaces/service';
import { useBookingQuery } from '../../../../../../../../queries/booking';
import { useServicesQuery } from '../../../../../../../../queries/service';
import { NEW_BOOKING_ID } from '../../../../../../../../staticData/calendar';

interface Props {
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

type ServiceOption = Pick<Service, 'id' | 'name' | 'serviceType' | 'price' | 'minutes'>;

export function ServiceFields({ booking, setBooking }: Props) {
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<ServiceOption[]>([]);
  const fetchServicesQuery = useServicesQuery();
  const { id } = useParams<{ id: string }>();
  const fetchBookingQuery = useBookingQuery(id);
  const isCreatingBooking = id === String(NEW_BOOKING_ID);

  useEffect(() => {
    const serviceOptions = convertServicesToServiceOptions(fetchServicesQuery?.data || []);
    serviceOptions.sort((a, b) => a.serviceType.name.localeCompare(b.serviceType.name));
    setServiceOptions(serviceOptions);

    if (!isCreatingBooking && fetchBookingQuery.data?.services) {
      const serviceIds = fetchBookingQuery.data.services.map((service) => service.id);
      const initialSelectedServiceOptions = serviceOptions.filter((service) => serviceIds.includes(service.id));
      setSelectedServiceOptions(initialSelectedServiceOptions);
    }
  }, [fetchServicesQuery?.data, fetchBookingQuery.data?.services, isCreatingBooking, setServiceOptions]);

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
              setBooking({
                ...booking,
                services: value as Service[],
                totalPrice: (value as Service[]).reduce((total, service) => total + service.price, 0),
              });
            }}
            renderInput={(params) => <TextField {...params} label="Selected services" variant="outlined" required />}
          />
        </Grid>
      </Grid>
      <Typography paragraph textAlign="end" marginBottom="0" width="100%" paddingTop="16px">
        Total price: {`${selectedServiceOptions.reduce((total, service) => total + service.price, 0)} €`}
      </Typography>
      <Typography paragraph textAlign="end" marginBottom="0" width="100%">
        Estimated time: {`${selectedServiceOptions.reduce((total, service) => total + service.minutes, 0)} min`}
      </Typography>
    </>
  );
}
