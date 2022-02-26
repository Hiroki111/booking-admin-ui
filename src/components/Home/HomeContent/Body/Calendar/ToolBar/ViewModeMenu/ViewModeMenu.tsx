import { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useStyles } from './useStyles';
import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';

enum CalendarView {
  Day = 'timeGridDay',
  Week = 'timeGridWeek',
  Month = 'dayGridMonth',
}

type CalendarViewKey = keyof typeof CalendarView;

export function ViewModeMenu() {
  const VIEW_NAMES = Object.keys(CalendarView) as CalendarViewKey[];
  const DEFAULT_VIEW = 'Week' as CalendarViewKey;

  const classes = useStyles();
  const [selectedView, setSelectedView] = useState<CalendarViewKey>(DEFAULT_VIEW);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { calendarApi } = useCalendarContext();

  function handleClose(view: CalendarViewKey) {
    setAnchorEl(null);
    if (view === selectedView) {
      return;
    }

    setSelectedView(view);
    calendarApi?.changeView(CalendarView[view]);
  }

  return (
    <>
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
        className={classes.button}
        variant="outlined"
      >
        {selectedView}
        <ArrowDropDownIcon className={classes.dropdownIcon} />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={() => handleClose(selectedView)}>
        {VIEW_NAMES.map((viewName, i) => (
          <MenuItem
            key={i}
            className={selectedView === viewName ? classes.selectedMenuItem : ''}
            onClick={() => handleClose(viewName)}
          >
            {viewName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
