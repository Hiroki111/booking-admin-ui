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

export function CalendarContent() {
  const fetchBookingsQuery = useBookingsQuery();
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const { calendarApi, isAddingNewEvent, setIsAddingNewEvent } = useCalendarContext();

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
            onClick={() => setIsAddingNewEvent(true)}
          >
            <AddIcon />
          </Fab>
        </>
      )}
      {isAddingNewEvent && <AddNewEventDialog />}
    </div>
  );
}
