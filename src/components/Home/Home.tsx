import { QueryClient, QueryClientProvider } from 'react-query';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { HomeContent } from './HomeContent/HomeContent';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HomeContent />
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
