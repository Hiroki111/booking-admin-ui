import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkIcon from '@mui/icons-material/Work';

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
