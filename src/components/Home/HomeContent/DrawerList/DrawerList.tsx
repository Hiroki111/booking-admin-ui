import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkIcon from '@material-ui/icons/Work';

import { useStyles } from './useStyles';

export function DrawerList() {
  const classes = useStyles();

  const listItems = [
    { icon: () => <CalendarTodayIcon />, listItemText: 'Calendar' },
    { icon: () => <ScheduleIcon />, listItemText: 'Bookings' },
    { icon: () => <PeopleIcon />, listItemText: 'Customers' },
    { icon: () => <PeopleAltOutlinedIcon />, listItemText: 'Staff' },
    { icon: () => <WorkIcon />, listItemText: 'Services' },
  ];

  return (
    <List className={classes.list}>
      {listItems.map((listItem, i) => (
        <ListItem button key={i}>
          <ListItemIcon>
            <listItem.icon />
          </ListItemIcon>
          <ListItemText primary={listItem.listItemText} />
        </ListItem>
      ))}
    </List>
  );
}
