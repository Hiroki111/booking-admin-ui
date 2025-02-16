import { Tabs, Tab, Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { invert } from 'lodash';

import { PATHS } from '../../../../../../staticData/routes';
import * as sx from './styles';

export function Nagivation() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const mapPathToTabIndex: { [path: string]: number } = {
    [PATHS.staff]: 0,
    [PATHS.staffAvailabilities]: 1,
  };
  const mapTabIndexToPath = invert(mapPathToTabIndex);

  useEffect(() => {
    if (mapPathToTabIndex.hasOwnProperty(location.pathname)) {
      setSelectedTabIndex(mapPathToTabIndex[location.pathname]);
    }
  }, [location.pathname]);

  function handleChange(event: React.SyntheticEvent, newIndex: number) {
    setSelectedTabIndex(newIndex);
    history.push(mapTabIndexToPath[newIndex]);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTabIndex} onChange={handleChange}>
          <Tab sx={sx.tab} label="Staff List" />
          <Tab sx={sx.tab} label="Staff Availabilities" />
        </Tabs>
      </Box>
    </Box>
  );
}
