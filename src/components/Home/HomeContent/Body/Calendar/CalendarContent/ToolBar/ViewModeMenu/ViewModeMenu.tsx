import { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useStyles } from './useStyles';
import { useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { CalendarViewKey } from '../../../../../../../../interfaces/calendar';

export function ViewModeMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { calendarViewKeys, selectedView, updateCalendarView } = useCalendarContext();

  function handleClose(view: CalendarViewKey) {
    setAnchorEl(null);
    if (view === selectedView) {
      return;
    }

    updateCalendarView(view);
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
        {calendarViewKeys.map((calendarViewKey) => (
          <MenuItem
            key={calendarViewKey}
            className={selectedView === calendarViewKey ? classes.selectedMenuItem : ''}
            onClick={() => handleClose(calendarViewKey)}
          >
            {calendarViewKey}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
