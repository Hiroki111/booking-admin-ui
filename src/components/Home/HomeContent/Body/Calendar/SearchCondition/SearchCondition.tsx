import { useEffect, useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { useFetchStaffListQuery } from '../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../util/WarningAlert';

interface StaffOption {
  key: number;
  label: string;
}

const DEFAULT_STAFF_OPTION = { key: -1, label: 'ALL STAFF' } as StaffOption;

export function SearchCondition() {
  const classes = useStyles();
  const fetchStaffListQuery = useFetchStaffListQuery();
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([DEFAULT_STAFF_OPTION]);
  const [selectedStaff, setSelectedStaff] = useState<StaffOption | null>();
  const [inputValue, setInputValue] = useState<string>(DEFAULT_STAFF_OPTION.label);

  useEffect(() => {
    const staffList = fetchStaffListQuery.data || [];
    const options = [
      DEFAULT_STAFF_OPTION,
      ...staffList
        .sort((staffA, staffB) => staffA.name.localeCompare(staffB.name))
        .map((staff) => ({ key: staff.id, label: staff.name } as StaffOption)),
    ];
    setStaffOptions(options);
    setSelectedStaff(options[0]);
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
        onChange={(event: any, newSelectedStaff: StaffOption | null) => setSelectedStaff(newSelectedStaff)}
        onInputChange={(event, newInputString) => setInputValue(newInputString)}
        options={staffOptions}
        getOptionLabel={(option) => option.label}
        style={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Staff" variant="outlined" />}
      />
    </FormControl>
  );
}
