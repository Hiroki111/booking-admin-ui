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

export function ToolBar() {
  const classes = useStyles();
  const toolbarRef: React.MutableRefObject<any> = useRef();
  const staffListQuery = useStaffListQuery();
  const { calendarApi, setIsAddingNewEvent } = useCalendarContext();
  const isSmallWindow = useIsSmallWindow();

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
                onClick={() => calendarApi?.today()}
                className={clsx(classes.button, classes.whiteButton)}
                variant="outlined"
              >
                Today
              </Button>
              <ViewModeMenu />
              <Button
                onClick={() => setIsAddingNewEvent(true)}
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
