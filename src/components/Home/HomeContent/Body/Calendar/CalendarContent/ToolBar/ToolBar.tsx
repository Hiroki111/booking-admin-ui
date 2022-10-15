import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { Button, Grid, SxProps, Theme } from '@mui/material';

import { useStaffListQuery } from '../../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../../util/WarningAlert';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';
import { ViewModeMenu } from './ViewModeMenu';
import * as sx from './styles';
import { StaffSelector } from './StaffSelector';
import { DateNavigator } from './DateNavigator';
import { ActionDrawer } from './ActionDrawer';
import { useIsSmallWindow } from '../../../../../../../hooks/window';
import { PATHS } from '../../../../../../../staticData/routes';
import { getPathWithParam, getUrlWithDate } from '../../../../../../../services/routing';
import { NEW_BOOKING_ID } from '../../../../../../../staticData/calendar';

export function ToolBar() {
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
    <Grid container justifyContent="space-between" sx={sx.toolbarContainer} ref={toolbarRef}>
      {isSmallWindow ? (
        <>
          <Grid item data-testid="date-navigator-grid">
            <DateNavigator />
          </Grid>
          <Grid item data-testid="action-drawer-grid">
            <ActionDrawer />
          </Grid>
        </>
      ) : (
        <>
          <Grid item data-testid="staff-selector-grid">
            <StaffSelector />
          </Grid>
          <Grid item data-testid="date-navigator-grid">
            <DateNavigator />
          </Grid>
          <Grid item data-testid="today-add-new-grid">
            <Grid container sx={sx.actionButtonContainer}>
              <Button
                onClick={() => {
                  if (!calendarApi) {
                    return;
                  }
                  calendarApi.today();
                  history.push(getUrlWithDate(new Date()));
                }}
                sx={{ ...sx.button, ...sx.whiteButton } as SxProps<Theme>}
                variant="outlined"
              >
                Today
              </Button>
              <ViewModeMenu />
              <Button
                onClick={() =>
                  history.push(getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(NEW_BOOKING_ID) }))
                }
                sx={sx.button}
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
