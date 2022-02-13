import { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { useIsSmallWindow } from '../../../hooks/window';

interface Props {
  isDrawerIconClicked: boolean;
}

export function Sidebar({ isDrawerIconClicked }: Props) {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(!isSmallWindow);
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(!isSmallWindow);
  }, [isSmallWindow]);

  useEffect(() => {
    if (isComponentMounted) {
      setIsDrawerOpen(!isDrawerOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerIconClicked]);

  const listItems = [
    { icon: () => <CalendarTodayIcon />, listItemText: 'Calendar' },
    { icon: () => <ScheduleIcon />, listItemText: 'Bookings' },
    { icon: () => <PeopleIcon />, listItemText: 'Customers' },
    { icon: () => <PeopleAltOutlinedIcon />, listItemText: 'Staff' },
    { icon: () => <WorkIcon />, listItemText: 'Services' },
  ];

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
      }}
      open={isDrawerOpen}
    >
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
    </Drawer>
  );
}
