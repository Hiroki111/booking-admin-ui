import { ButtonGroup, Button } from '@material-ui/core';

import { useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { useStyles } from './useStyles';

export function DateNavigator() {
  const classes = useStyles();
  const { calendarApi, calendarTitle } = useCalendarContext();

  return (
    <ButtonGroup className={classes.dateNavigatorContainer}>
      <Button onClick={() => calendarApi?.prev()}>{'<'}</Button>
      <Button>{calendarTitle}</Button>
      <Button onClick={() => calendarApi?.next()}>{'>'}</Button>
    </ButtonGroup>
  );
}
