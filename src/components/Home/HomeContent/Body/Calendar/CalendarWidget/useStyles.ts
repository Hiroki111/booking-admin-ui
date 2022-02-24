import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  calendarWidgetContainer: {
    margin: theme.spacing(1),
  },
  eventContent: {
    overflow: 'hidden',
  },
}));
