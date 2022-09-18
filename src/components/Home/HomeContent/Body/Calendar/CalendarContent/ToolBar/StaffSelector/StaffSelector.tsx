import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

import { AllStaff, ALL_STAFF, useCalendarContext } from '../../../../../../../../contexts/CalendarContext';
import { Staff } from '../../../../../../../../interfaces/staff';
import { useStaffListQuery } from '../../../../../../../../queries/staff';
import { StaffOption } from '../../../../../../../../interfaces/calendar';
import { createStaffOptions } from '../../../../../../../../services/calendar';
import { useStyles } from './useStyles';

export function StaffSelector() {
  const classes = useStyles();
  const staffListQuery = useStaffListQuery();
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const [inputValue, setInputValue] = useState<string>(ALL_STAFF.name);
  const { selectedStaff, setSelectedStaff } = useCalendarContext();

  useEffect(() => {
    const options = createStaffOptions(staffListQuery.data || []);
    setStaffOptions(options);
  }, [staffListQuery.data]);

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
      isOptionEqualToValue={(option: StaffOption, value: Staff | AllStaff) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      style={{ minWidth: 220 }}
      renderInput={(params) => (
        <TextField {...params} label={selectedStaff ? 'Selected Staff' : 'No Staff Selected'} variant="outlined" />
      )}
    />
  );
}
