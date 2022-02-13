import { Grid } from '@material-ui/core';

import { CalendarWidget } from './CalendarWidget';
import { useStyles } from './useStyles';

export function Calendar() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>Top</div>
      <CalendarWidget />
    </Grid>
  );
}
