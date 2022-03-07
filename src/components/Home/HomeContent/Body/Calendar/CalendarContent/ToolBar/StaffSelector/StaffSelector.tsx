import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { ALL_STAFF, useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { Staff } from '../../../../../../../../interfaces/staff';
import { useFetchStaffListQuery } from '../../../../../../../../queries/staff';
import { StaffOption } from '../../../../../../../../interfaces/calendar';
import { createStaffOptions } from '../../../../../../../../services/calendar';
import { useStyles } from './useStyles';

export function StaffSelector() {
  const classes = useStyles();
  const fetchStaffListQuery = useFetchStaffListQuery();
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const [inputValue, setInputValue] = useState<string>(ALL_STAFF.name);
  const { selectedStaff, setSelectedStaff } = useCalendarContext();

  useEffect(() => {
    const options = createStaffOptions(fetchStaffListQuery.data || []);
    setStaffOptions(options);
  }, [fetchStaffListQuery.data]);

  return (
    <Autocomplete
      className={classes.staffSelectorContainer}
      value={selectedStaff}
      inputValue={inputValue}
      onChange={(event: React.ChangeEvent<{}>, newSelectedStaff: StaffOption | null) =>
        setSelectedStaff(newSelectedStaff as Staff | null)
      }
      onInputChange={(event: React.ChangeEvent<{}>, newInputString: string) => setInputValue(newInputString)}
      options={staffOptions}
      getOptionLabel={(option) => option.name}
      style={{ minWidth: 220 }}
      renderInput={(params) => (
        <TextField {...params} label={selectedStaff ? 'Selected Staff' : 'No Staff Selected'} variant="outlined" />
      )}
    />
  );
}
