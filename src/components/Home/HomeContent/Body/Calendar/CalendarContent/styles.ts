import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const sx: Record<string, SxProps<Theme>> = {
  calendarContainer: {
    position: 'relative',
  },
  gridRoot: {
    padding: 0,
  },
  floatingButton: {
    position: 'fixed',
    zIndex: 1,
    right: 40,
  },
  todayFloatingButton: {
    bottom: 40,
    backgroundColor: 'white',
  },
  addNewFloatingButton: {
    bottom: 100,
  },
};
