import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkIcon from '@mui/icons-material/Work';

import { useStyles } from './useStyles';
import { PATHS } from '../../../../staticData/routes';

export function DrawerList() {
  const classes = useStyles();
  const history = useHistory();

  const listItems = [
    { icon: () => <CalendarTodayIcon />, listItemText: 'Calendar', onClick: () => history.push(PATHS.calendar) },
    { icon: () => <PeopleAltOutlinedIcon />, listItemText: 'Staff', onClick: () => history.push(PATHS.staff) },
    { icon: () => <WorkIcon />, listItemText: 'Services', onClick: () => {} },
    // NOTE: I probably don't need the following yet
    // { icon: () => <ScheduleIcon />, listItemText: 'Bookings' },
    // { icon: () => <PeopleIcon />, listItemText: 'Customers' },
  ];

  return (
    <List className={classes.list}>
      {listItems.map((listItem, i) => (
        <ListItem button key={i} onClick={listItem.onClick}>
          <ListItemIcon>
            <listItem.icon />
          </ListItemIcon>
          <ListItemText primary={listItem.listItemText} />
        </ListItem>
      ))}
    </List>
  );
}
