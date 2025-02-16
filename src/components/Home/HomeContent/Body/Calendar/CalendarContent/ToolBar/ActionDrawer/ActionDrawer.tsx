import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';

import * as sx from './styles';
import { ALL_STAFF, useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { CalendarViewKey, StaffOption } from '../../../../../../../../interfaces/calendar';
import { createStaffOptions } from '../../../../../../../../services/calendar';
import { Staff } from '../../../../../../../../interfaces/staff';
import { getUrlWithCalendarView } from '../../../../../../../../services/routing';
import { UseCalendarState } from '../../../../../../../../hooks/calendar';

export function ActionDrawer() {
  const [isShowingDrawer, setIsShowingDrawer] = useState(false);
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const { selectedStaff, setSelectedStaff, updateCalendarView } = useCalendarContext();
  const { calendarViewKey } = UseCalendarState();
  const staffListQuery = useStaffListQuery();
  const history = useHistory();

  const calendarViewItems = [
    { icon: () => <ViewDayOutlinedIcon />, calendarViewKey: 'Day' as CalendarViewKey },
    { icon: () => <ViewWeekOutlinedIcon />, calendarViewKey: 'Week' as CalendarViewKey },
    { icon: () => <ViewComfyOutlinedIcon />, calendarViewKey: 'Month' as CalendarViewKey },
  ];

  useEffect(() => {
    const options = createStaffOptions(staffListQuery.data || []);
    setStaffOptions(options);
  }, [staffListQuery.data]);

  function getAvatarContent(staff: StaffOption) {
    if (!staff?.name || staff.id === ALL_STAFF.id) {
      return <PeopleIcon className="people-icon" />;
    }

    const nameArray = staff.name.trim().split(' ') || [];

    if (nameArray.length === 0) {
      return '';
    } else if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    }

    const firstChar = nameArray[0].charAt(0).toUpperCase();
    const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    return `${firstChar}${lastChar}`;
  }

  return (
    <>
      <IconButton aria-label="drawer-switch" onClick={() => setIsShowingDrawer(!isShowingDrawer)} size="large">
        <MenuIcon />
      </IconButton>
      <Drawer sx={sx.drawerRoot} anchor={'right'} open={isShowingDrawer} onClose={() => setIsShowingDrawer(false)}>
        <Box sx={sx.list}>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={() => setIsShowingDrawer(false)} size="large">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography variant="h6" sx={sx.listTitle}>
            Calendar View
          </Typography>
          <Grid container justifyContent="space-between" sx={sx.viewListContainer}>
            {calendarViewItems.map((calendarViewItem, i) => (
              <Grid
                key={i}
                item
                sx={sx.viewListItem}
                onClick={() => {
                  updateCalendarView(calendarViewItem.calendarViewKey);
                  history.push(getUrlWithCalendarView(calendarViewItem.calendarViewKey));
                }}
              >
                <IconButton
                  sx={
                    {
                      ...sx.iconButtonRoot,
                      ...(calendarViewKey === calendarViewItem.calendarViewKey && sx.selectedItem),
                    } as SxProps<Theme>
                  }
                  size="large"
                  aria-label={`${calendarViewItem.calendarViewKey.toLocaleLowerCase()}-icon-button`}
                >
                  <calendarViewItem.icon />
                </IconButton>
                <Typography paragraph>{calendarViewItem.calendarViewKey}</Typography>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Typography variant="h6" sx={sx.listTitle}>
            Staff
          </Typography>
          <List data-testid="staff-options">
            {staffOptions.map((staff) => (
              <ListItem button key={staff.id} onClick={() => setSelectedStaff(staff as Staff | null)}>
                <Avatar
                  sx={
                    {
                      ...sx.staffIcon,
                      ...(selectedStaff?.id === staff.id && sx.selectedItem),
                    } as SxProps<Theme>
                  }
                >
                  {getAvatarContent(staff)}
                </Avatar>
                <ListItemText primary={staff.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
