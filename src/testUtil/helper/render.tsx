import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

import { RootThemeProvider } from '../../theme/RootThemeProvider';
import { queryClient } from '../../components/Home';
import { CalendarContext } from '../../contexts/CalendarContext';
import { getMockCalendarContextValue } from '../../staticData/CalendarContext';
interface RenderOption {
  pathName?: string;
  inCalendarContext?: boolean;
}

export function renderWithBaseWrapper(ui: ReactElement, option?: RenderOption) {
  const pathName = option?.pathName || '/';
  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <RootThemeProvider>
        <MemoryRouter initialEntries={[pathName]}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
          </QueryClientProvider>
        </MemoryRouter>
      </RootThemeProvider>
    );
  }

  if (option?.inCalendarContext) {
    ui = wrapInCalendarContext(ui);
  }

  const rendered = render(ui, { wrapper: Wrapper });

  return {
    ...rendered,
    rerender: (ui: ReactElement) => rendered.rerender(Wrapper({ children: ui })),
  };
}

function wrapInCalendarContext(ui: ReactElement) {
  const defaultContextValue = getMockCalendarContextValue();
  return <CalendarContext.Provider value={defaultContextValue}>{ui}</CalendarContext.Provider>;
}
