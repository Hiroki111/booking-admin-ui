import { useTheme, useMediaQuery } from '@material-ui/core';

export function useIsSmallWindow() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
}
