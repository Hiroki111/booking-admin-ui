import { ButtonGroup, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { useStyles } from './useStyles';
import { getUrlWithDate } from '../../../../../../../../services/routing';

export function DateNavigator() {
  const classes = useStyles();
  const history = useHistory();
  const { calendarApi, calendarTitle } = useCalendarContext();

  function handleClickNavButton(functionName: 'prev' | 'next') {
    if (!calendarApi) {
      return;
    }
    if (functionName === 'prev') {
      calendarApi.prev();
    } else if (functionName === 'next') {
      calendarApi.next();
    }

    history.push(getUrlWithDate(calendarApi.getDate()));
  }

  return (
    <ButtonGroup className={classes.dateNavigatorContainer}>
      <Button onClick={() => handleClickNavButton('prev')}>{'<'}</Button>
      <Button>{calendarTitle}</Button>
      <Button onClick={() => handleClickNavButton('next')}>{'>'}</Button>
    </ButtonGroup>
  );
}
