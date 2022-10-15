import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import * as sx from './styles';
import { useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { CalendarViewKey } from '../../../../../../../../interfaces/calendar';
import { getUrlWithCalendarView } from '../../../../../../../../services/routing';
import { UseCalendarState } from '../../../../../../../../hooks/calendar';

export function ViewModeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { calendarViewKeys, updateCalendarView } = useCalendarContext();
  const { calendarViewKey } = UseCalendarState();
  const history = useHistory();

  function handleClose(view: CalendarViewKey) {
    setAnchorEl(null);
    if (view === calendarViewKey) {
      return;
    }

    updateCalendarView(view);
    history.push(getUrlWithCalendarView(view));
  }

  return (
    <>
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
        sx={sx.button}
        variant="outlined"
      >
        {calendarViewKey}
        <ArrowDropDownIcon sx={sx.dropdownIcon} />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={() => handleClose(calendarViewKey)}>
        {calendarViewKeys.map((key) => (
          <MenuItem key={key} sx={calendarViewKey === key ? sx.selectedMenuItem : {}} onClick={() => handleClose(key)}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
