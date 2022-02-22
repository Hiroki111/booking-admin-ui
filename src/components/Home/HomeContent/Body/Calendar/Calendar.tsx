import { Grid, Typography } from '@material-ui/core';

import { CalendarWidget } from './CalendarWidget';
import { useFetchBookingsQuery } from '../../../../../queries/booking';

export function Calendar() {
  const fetchBookingsQuery = useFetchBookingsQuery();

  return (
    <Grid container direction="column">
      <div>Top</div>
      {fetchBookingsQuery.isLoading && (
        <Typography component="p" color="inherit">
          Loading...
        </Typography>
      )}
      {fetchBookingsQuery.isError && (
        <Typography component="p" color="inherit">
          Internal error occurred
        </Typography>
      )}
      {fetchBookingsQuery.isSuccess && <CalendarWidget />}
    </Grid>
  );
}
