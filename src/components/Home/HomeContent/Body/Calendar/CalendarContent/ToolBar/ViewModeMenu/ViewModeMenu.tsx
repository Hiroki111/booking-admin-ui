import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useStyles } from './useStyles';
import { useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { CalendarViewKey } from '../../../../../../../../interfaces/calendar';
import { getUrlWithCalendarView } from '../../../../../../../../services/routing';

export function ViewModeMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { calendarViewKeys, selectedView, updateCalendarView } = useCalendarContext();
  const history = useHistory();

  function handleClose(view: CalendarViewKey) {
    setAnchorEl(null);
    if (view === selectedView) {
      return;
    }

    updateCalendarView(view);
    history.push(getUrlWithCalendarView(view));
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
