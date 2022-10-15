import { SxProps, Theme } from '@mui/material';

import { TOOLBAR_HEIGHT } from '../../../../../../../styles/const';

export const toolbarContainer: SxProps<Theme> = (theme: Theme) => ({
  height: TOOLBAR_HEIGHT,
  padding: theme.spacing(1),
  flexWrap: 'initial',
});

export const actionButtonContainer: SxProps<Theme> = (theme: Theme) => ({
  '& button:not(:first-of-type)': {
    marginLeft: theme.spacing(1),
  },
});

export const addNewButton: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
});

export const button: SxProps<Theme> = {
  textTransform: 'initial',
  height: '56px',
};

export const whiteButton: SxProps<Theme> = {
  backgroundColor: 'white',
};
