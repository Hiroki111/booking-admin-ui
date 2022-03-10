import makeStyles from '@mui/styles/makeStyles';

import { hoverableOption } from '../../../../../../../../styles/sharedStyles';

export const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'initial',
    height: '56px',
    backgroundColor: 'white',
  },
  dropdownIcon: {
    marginRight: '-6px',
  },
  selectedMenuItem: {
    ...hoverableOption(theme),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));
