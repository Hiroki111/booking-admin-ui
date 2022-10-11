import { Box } from '@mui/material';
import { Body } from './Body';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function HomeContent() {
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Body />
      </Box>
    </div>
  );
}
