import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkIcon from '@mui/icons-material/Work';

import { useStyles } from './useStyles';

export function DrawerList() {
  const classes = useStyles();

  const listItems = [
    { icon: () => <CalendarTodayIcon />, listItemText: 'Calendar' },
    { icon: () => <PeopleAltOutlinedIcon />, listItemText: 'Staff' },
    { icon: () => <WorkIcon />, listItemText: 'Services' },
    // NOTE: I probably don't need the following yet
    // { icon: () => <ScheduleIcon />, listItemText: 'Bookings' },
    // { icon: () => <PeopleIcon />, listItemText: 'Customers' },
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
