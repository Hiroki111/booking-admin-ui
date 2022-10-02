import { useHistory } from 'react-router-dom';
import { Grid, Paper, Fab } from '@mui/material';
import { Route } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import clsx from 'clsx';

import { useCalendarContext } from '../../../../../../contexts/CalendarContext';
import { useIsSmallWindow } from '../../../../../../hooks/window';
import { EditBookingDialog } from './EditBookingDialog';
import { CalendarWidget } from './CalendarWidget';
import { ToolBar } from './ToolBar';
import { useStyles } from './useStyles';
import { PATHS } from '../../../../../../staticData/routes';
import { getPathWithParam } from '../../../../../../services/routing';
import { NEW_BOOKING_ID } from '../../../../../../staticData/calendar';

export function CalendarContent() {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const { calendarApi } = useCalendarContext();
  const history = useHistory();

  return (
    <div className={classes.calendarContainer}>
      <Grid container direction="column" classes={{ container: classes.gridRoot }}>
        <ToolBar />
        <Paper>
          <CalendarWidget />
        </Paper>
      </Grid>
      {isSmallWindow && (
        <>
          <Fab
            data-testid="today-icon"
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
            onClick={() =>
              history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(NEW_BOOKING_ID) }))
            }
          >
            <AddIcon data-testid="add-icon" />
          </Fab>
        </>
      )}
      <Route exact path={PATHS.calendarBookingEditId} component={EditBookingDialog} />
    </div>
  );
}
