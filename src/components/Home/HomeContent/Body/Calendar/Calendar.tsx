import { Grid, Paper, Typography } from '@material-ui/core';

import { CalendarWidget } from './CalendarWidget';
import { useFetchBookingsQuery } from '../../../../../queries/booking';
import { ToolBar } from './ToolBar';
import { WarningAlert } from '../../../../../util/WarningAlert';
import { CalendarContextProvider } from '../../../../../contexts/CalendarContext';
import { useStyles } from './useStyles';

export function Calendar() {
  const fetchBookingsQuery = useFetchBookingsQuery();
  const classes = useStyles();

  // TODO: Create CalendarContent component and move everything under CalendarContextProvider to there
  return (
    <CalendarContextProvider>
      <Grid container direction="column" classes={{ container: classes.gridRoot }}>
        <ToolBar />
        <Paper>
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
