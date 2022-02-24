import { Grid, Paper, Typography } from '@material-ui/core';

import { CalendarWidget } from './CalendarWidget';
import { useFetchBookingsQuery } from '../../../../../queries/booking';
import { SearchCondition } from './SearchCondition';
import { WarningAlert } from '../../../../../util/WarningAlert';
import { CalendarContextProvider } from '../../../../../contexts/CalendarContext';

export function Calendar() {
  const fetchBookingsQuery = useFetchBookingsQuery();

  // TODO: Create CalendarContent component and move everything under CalendarContextProvider to there
  return (
    <CalendarContextProvider>
      <Grid container direction="column">
        <Paper>
          <SearchCondition />
          {fetchBookingsQuery.isLoading && (
            <Typography component="p" color="inherit">
              Loading...
            </Typography>
          )}
          {fetchBookingsQuery.isError && <WarningAlert message={'It failed to load booking data'} />}
          {fetchBookingsQuery.isSuccess && <CalendarWidget />}
        </Paper>
      </Grid>
    </CalendarContextProvider>
  );
}
