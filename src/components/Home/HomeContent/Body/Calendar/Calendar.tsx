import { Grid, Paper, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { CalendarWidget } from './CalendarWidget';
import { ToolBar } from './ToolBar';
import { useFetchBookingsQuery } from '../../../../../queries/booking';
import { WarningAlert } from '../../../../../util/WarningAlert';
import { CalendarContextProvider } from '../../../../../contexts/CalendarContext';
import { useIsSmallWindow } from '../../../../../hooks/window';
import { useStyles } from './useStyles';

export function Calendar() {
  const fetchBookingsQuery = useFetchBookingsQuery();
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();

  // TODO: Create CalendarContent component and move everything under CalendarContextProvider to there
  return (
    <CalendarContextProvider>
      <div className={classes.calendarContainer}>
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
        {isSmallWindow && (
          <Fab color="primary" className={classes.floatingButton}>
            <AddIcon />
          </Fab>
        )}
      </div>
    </CalendarContextProvider>
  );
}
