import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';

import { useStyles } from './useStyles';

interface Props {
  isDrawerOpen: boolean;
  onClickCloseDrawerIcon: () => void;
}

export function Sidebar({ isDrawerOpen, onClickCloseDrawerIcon }: Props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
      }}
      open={isDrawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onClickCloseDrawerIcon}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <div>
          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
}
