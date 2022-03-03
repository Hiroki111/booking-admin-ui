import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  button: {
    textTransform: 'initial',
    width: '92px',
    height: '56px',
  },
  listTitle: {
    marginLeft: '16px',
    fontWeight: 800,
    height: '48px',
    lineHeight: '48px',
    marginTop: '8px',
  },
  staffIcon: {
    marginRight: '16px',
  },
  viewListContainer: {
    padding: '0 16px',
  },
  viewListItem: {
    width: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconButtonRoot: {
    height: '48px',
    width: '48px',
    padding: '12px 0',
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
  },
  selectedItem: {
    backgroundColor: theme.palette.info.light,
  },
  iconButtonLabel: {
    flexDirection: 'column',
  },
  checkIcon: {
    height: '40px',
    width: '40px',
    marginRight: '16px',
  },
}));
