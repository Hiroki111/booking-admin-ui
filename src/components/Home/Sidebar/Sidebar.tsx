import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { useIsSmallWindow } from '../../../hooks/window';
import { useEffect, useState } from 'react';

interface Props {
  isDrawerIconClicked: boolean;
}

export function Sidebar({ isDrawerIconClicked }: Props) {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(!isSmallWindow);
  const [isDrawerStatusInitialized, setIsDrawerStatusInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsDrawerStatusInitialized(true);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(!isSmallWindow);
  }, [isSmallWindow]);

  useEffect(() => {
    if (isDrawerStatusInitialized) {
      setIsDrawerOpen(!isDrawerOpen && isDrawerStatusInitialized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerIconClicked]);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
      }}
      open={isDrawerOpen}
    >
      <List className={classes.list}>
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
      </List>
    </Drawer>
  );
}
