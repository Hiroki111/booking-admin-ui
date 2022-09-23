import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

import { RootThemeProvider } from '../../theme/RootThemeProvider';
import { queryClient } from '../../components/Home';

interface RenderOption {
  pathName?: string;
}

export function renderWithBaseWrapper(ui: ReactElement, option?: RenderOption) {
  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <RootThemeProvider>
        <MemoryRouter initialEntries={[option?.pathName || '/']}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>
    );
  }

  render(ui, { wrapper: Wrapper });
}
