import { ButtonGroup, Button } from '@material-ui/core';

import { useCalendarContext } from '../../../../../../../contexts/CalendarContext';

export function DateNavigator() {
  const { calendarApi, calendarTitle } = useCalendarContext();

  return (
    <ButtonGroup color="primary" style={{ height: 56 }}>
      <Button onClick={() => calendarApi?.prev()}>{'<'}</Button>
      <Button>{calendarTitle}</Button>
      <Button onClick={() => calendarApi?.next()}>{'>'}</Button>
    </ButtonGroup>
  );
}
