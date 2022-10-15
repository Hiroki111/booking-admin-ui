import { SxProps, Theme } from '@mui/material';

export const drawerRoot: SxProps<Theme> = {
  zIndex: 1300,
};

export const list: SxProps<Theme> = {
  width: 250,
};

export const button: SxProps<Theme> = {
  textTransform: 'initial',
  width: '92px',
  height: '56px',
};

export const listTitle: SxProps<Theme> = {
  marginLeft: '16px',
  fontWeight: 800,
  height: '48px',
  lineHeight: '48px',
  marginTop: '8px',
};

export const staffIcon: SxProps<Theme> = {
  marginRight: '16px',
};

export const viewListContainer: SxProps<Theme> = {
  padding: '0 16px',
};

export const viewListItem: SxProps<Theme> = {
  width: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
};

export const iconButtonRoot: SxProps<Theme> = {
  height: '48px',
  width: '48px',
  padding: '12px 0',
  '&:hover': {
    backgroundColor: 'info.light',
  },
};

export const selectedItem: SxProps<Theme> = {
  backgroundColor: 'info.light',
};

export const iconButtonLabel: SxProps<Theme> = {
  flexDirection: 'column',
};

export const checkIcon: SxProps<Theme> = {
  height: '40px',
  width: '40px',
  marginRight: '16px',
};
