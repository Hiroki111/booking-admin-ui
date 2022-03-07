import { makeStyles } from '@material-ui/core/styles';

import { TOOLBAR_HEIGHT } from '../../../../../../../styles/const';

export const useStyles = makeStyles((theme) => ({
  toolbarContainer: {
    height: TOOLBAR_HEIGHT,
    padding: theme.spacing(1),
    flexWrap: 'initial',
  },
  actionButtonContainer: {
    '& button:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
  },
  button: {
    textTransform: 'initial',
    height: '56px',
  },
  whiteButton: {
    backgroundColor: 'white',
  },
  addNewButton: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));
