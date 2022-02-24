import { useEffect, useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { useFetchStaffListQuery } from '../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../util/WarningAlert';
import { ALL_STAFF, useCalendarContext } from '../../../../../../contexts/CalendarContext';
import { Staff } from '../../../../../../interfaces/staff';

type StaffOption = Pick<Staff, 'id' | 'name'>;

export function SearchCondition() {
  const classes = useStyles();
  const fetchStaffListQuery = useFetchStaffListQuery();
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const [inputValue, setInputValue] = useState<string>(ALL_STAFF.name);
  const { selectedStaff, setSelectedStaff } = useCalendarContext();

  useEffect(() => {
    const staffList = fetchStaffListQuery.data || [];
    const options = [
      ALL_STAFF,
      ...staffList
        .sort((staffA, staffB) => staffA.name.localeCompare(staffB.name))
        .map((staff) => ({ id: staff.id, name: staff.name } as StaffOption)),
    ];
    setStaffOptions(options);
  }, [fetchStaffListQuery.data]);

  if (fetchStaffListQuery.isLoading) {
    return null;
  } else if (fetchStaffListQuery.isError) {
    return <WarningAlert />;
  }

  return (
    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
      <Autocomplete
        value={selectedStaff}
        inputValue={inputValue}
        onChange={(event: React.ChangeEvent<{}>, newSelectedStaff: StaffOption | null) =>
          setSelectedStaff(newSelectedStaff as Staff | null)
        }
        onInputChange={(event: React.ChangeEvent<{}>, newInputString: string) => setInputValue(newInputString)}
        options={staffOptions}
        getOptionLabel={(option) => option.name}
        style={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Staff" variant="outlined" />}
      />
    </FormControl>
  );
}
