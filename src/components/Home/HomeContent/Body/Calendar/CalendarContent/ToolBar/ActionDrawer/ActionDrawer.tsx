import { useEffect, useState } from 'react';
import { Avatar, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import ViewComfyOutlinedIcon from '@material-ui/icons/ViewComfyOutlined';

import { useStyles } from './useStyles';
import { ALL_STAFF, useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { useFetchStaffListQuery } from '../../../../../../../../queries/staff';
import { CalendarViewKey, StaffOption } from '../../../../../../../../interfaces/calendar';
import { createStaffOptions } from '../../../../../../../../services/calendar';
import clsx from 'clsx';
import { Staff } from '../../../../../../../../interfaces/staff';

export function ActionDrawer() {
  const classes = useStyles();
  const [isShowingDrawer, setIsShowingDrawer] = useState(false);
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const { selectedView, selectedStaff, setSelectedStaff, updateCalendarView } = useCalendarContext();
  const fetchStaffListQuery = useFetchStaffListQuery();

  const calendarViewItems = [
    { icon: () => <ViewDayOutlinedIcon />, calendarViewKey: 'Day' as CalendarViewKey },
    { icon: () => <ViewWeekOutlinedIcon />, calendarViewKey: 'Week' as CalendarViewKey },
    { icon: () => <ViewComfyOutlinedIcon />, calendarViewKey: 'Month' as CalendarViewKey },
  ];

  useEffect(() => {
    const options = createStaffOptions(fetchStaffListQuery.data || []);
    setStaffOptions(options);
  }, [fetchStaffListQuery.data]);

  function getAvatarContent(staff: StaffOption) {
    if (!staff?.name || staff.id === ALL_STAFF.id) {
      return <PeopleIcon />;
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
      <IconButton onClick={() => setIsShowingDrawer(!isShowingDrawer)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'right'} open={isShowingDrawer} onClose={() => setIsShowingDrawer(false)}>
        <div className={classes.list}>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={() => setIsShowingDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography variant="h6" className={classes.listTitle}>
            Calendar View
          </Typography>
          <Grid container justifyContent="space-between" className={classes.viewListContainer}>
            {calendarViewItems.map((calendarViewItem, i) => (
              <Grid
                key={i}
                item
                className={classes.viewListItem}
                onClick={() => updateCalendarView(calendarViewItem.calendarViewKey)}
              >
                <IconButton
                  classes={{
                    root: clsx([
                      classes.iconButtonRoot,
                      selectedView === calendarViewItem.calendarViewKey ? classes.selectedItem : '',
                    ]),
                    label: classes.iconButtonLabel,
                  }}
                >
                  <calendarViewItem.icon />
                </IconButton>
                <Typography paragraph>{calendarViewItem.calendarViewKey}</Typography>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Typography variant="h6" className={classes.listTitle}>
            Staff
          </Typography>
          <List>
            {staffOptions.map((staff) => (
              <ListItem button key={staff.id} onClick={() => setSelectedStaff(staff as Staff | null)}>
                <Avatar
                  className={clsx([classes.staffIcon, selectedStaff?.id === staff.id ? classes.selectedItem : ''])}
                >
                  {getAvatarContent(staff)}
                </Avatar>
                <ListItemText primary={staff.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
