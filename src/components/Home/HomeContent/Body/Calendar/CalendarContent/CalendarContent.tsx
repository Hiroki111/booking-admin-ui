import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import clsx from 'clsx';

import { useCalendarContext } from '../../../../../../contexts/CalendarContext';
import { useIsSmallWindow } from '../../../../../../hooks/window';
import { useBookingsQuery } from '../../../../../../queries/booking';
import { WarningAlert } from '../../../../../../util/WarningAlert';
import { AddNewEventDialog } from './AddNewEventDialog';
import { CalendarWidget } from './CalendarWidget';
import { ToolBar } from './ToolBar';
import { useStyles } from './useStyles';
import { Route } from 'react-router-dom';
import { PATHS } from '../../../../../../staticData/routes';
import { getRouteWithParam } from '../../../../../../services/routing';
import { NEW_BOOKING_ID } from '../../../../../../staticData/calendar';

export function CalendarContent() {
  const fetchBookingsQuery = useBookingsQuery();
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const { calendarApi } = useCalendarContext();
  const history = useHistory();

  return (
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
        <>
          <Fab
            variant="extended"
            className={clsx(classes.floatingButton, classes.todayButton)}
            onClick={() => calendarApi?.today()}
          >
            <NavigationIcon />
            Today
          </Fab>
          <Fab
            color="primary"
            className={clsx(classes.floatingButton, classes.addNewButton)}
            onClick={() => history.push(getRouteWithParam(PATHS.calendarBookingEditId, { ':id': NEW_BOOKING_ID }))}
          >
            <AddIcon />
          </Fab>
        </>
      )}
      <Route exact path={PATHS.calendarBookingEditId} component={AddNewEventDialog} />
    </div>
  );
}
