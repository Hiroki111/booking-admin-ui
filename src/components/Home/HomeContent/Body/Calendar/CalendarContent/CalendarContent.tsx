import { useHistory } from 'react-router-dom';
import { Grid, Paper, Box, Avatar, IconButton, Fab, SxProps, Theme } from '@mui/material';
import { Route } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';

import { useCalendarContext } from '../../../../../../contexts/CalendarContext';
import { useIsSmallWindow } from '../../../../../../hooks/window';
import { EditBookingDialog } from './EditBookingDialog';
import { CalendarWidget } from './CalendarWidget';
import { ToolBar } from './ToolBar';
import { sx } from './useStyles';
import { PATHS } from '../../../../../../staticData/routes';
import { getPathWithParam } from '../../../../../../services/routing';
import { NEW_BOOKING_ID } from '../../../../../../staticData/calendar';

export function CalendarContent() {
  const isSmallWindow = useIsSmallWindow();
  const { calendarApi } = useCalendarContext();
  const history = useHistory();

  return (
    <Box sx={sx.calendarContainer}>
      <Grid container direction="column" sx={sx.gridRoot}>
        <ToolBar />
        <Paper>
          <CalendarWidget />
        </Paper>
      </Grid>
      {isSmallWindow && (
        <>
          <Fab
            data-testid="today-icon-button"
            variant="extended"
            onClick={() => calendarApi?.today()}
            sx={{ ...sx.floatingButton, ...sx.todayFloatingButton } as SxProps<Theme>}
          >
            <NavigationIcon />
            Today
          </Fab>
          <Fab
            color="primary"
            onClick={() =>
              history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(NEW_BOOKING_ID) }))
            }
            sx={{ ...sx.floatingButton, ...sx.addNewFloatingButton } as SxProps<Theme>}
          >
            <AddIcon data-testid="add-icon" />
          </Fab>
        </>
      )}
      <Route exact path={PATHS.calendarBookingEditId} component={EditBookingDialog} />
    </Box>
  );
}
