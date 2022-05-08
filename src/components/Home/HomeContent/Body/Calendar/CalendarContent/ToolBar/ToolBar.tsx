import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { Button, Grid } from '@mui/material';
import clsx from 'clsx';

import { useStaffListQuery } from '../../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { ViewModeMenu } from './ViewModeMenu';
import { useStyles } from './useStyles';
import { StaffSelector } from './StaffSelector';
import { DateNavigator } from './DateNavigator';
import { ActionDrawer } from './ActionDrawer';
import { useIsSmallWindow } from '../../../../../../../hooks/window';
import { PATHS } from '../../../../../../../staticData/routes';
import { getPathWithParam, getUrlWithYearAndMonth } from '../../../../../../../services/routing';
import { NEW_BOOKING_ID } from '../../../../../../../staticData/calendar';

export function ToolBar() {
  const classes = useStyles();
  const toolbarRef: React.MutableRefObject<any> = useRef();
  const staffListQuery = useStaffListQuery();
  const { calendarApi } = useCalendarContext();
  const isSmallWindow = useIsSmallWindow();
  const history = useHistory();

  if (staffListQuery.isLoading) {
    return null;
  } else if (staffListQuery.isError) {
    return <WarningAlert />;
  }

  return (
    <Grid container justifyContent="space-between" className={classes.toolbarContainer} ref={toolbarRef}>
      {isSmallWindow ? (
        <>
          <Grid item>
            <DateNavigator />
          </Grid>
          <Grid item>
            <ActionDrawer />
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <StaffSelector />
          </Grid>
          <Grid item>
            <DateNavigator />
          </Grid>
          <Grid item>
            <Grid container className={classes.actionButtonContainer}>
              <Button
                onClick={() => {
                  if (!calendarApi) {
                    return;
                  }
                  calendarApi.today();
                  history.push(getUrlWithYearAndMonth(new Date()));
                }}
                className={clsx(classes.button, classes.whiteButton)}
                variant="outlined"
              >
                Today
              </Button>
              <ViewModeMenu />
              <Button
                onClick={() =>
                  history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(NEW_BOOKING_ID) }))
                }
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Add New
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
