import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useFetchStaffListQuery } from '../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../util/WarningAlert';
import { ALL_STAFF, useCalendarContext } from '../../../../../../contexts/CalendarContext';
import { Staff } from '../../../../../../interfaces/staff';
import { ViewModeMenu } from './ViewModeMenu';
import { useStyles } from './useStyles';

type StaffOption = Pick<Staff, 'id' | 'name'>;

export function ToolBar() {
  const classes = useStyles();
  const fetchStaffListQuery = useFetchStaffListQuery();
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([ALL_STAFF]);
  const [inputValue, setInputValue] = useState<string>(ALL_STAFF.name);
  const { selectedStaff, setSelectedStaff, calendarApi, calendarTitle } = useCalendarContext();

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
    <Grid container justifyContent="space-between" className={classes.toolbarContainer}>
      <Autocomplete
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
      <ButtonGroup color="primary">
        <Button onClick={() => calendarApi?.prev()}>{'<'}</Button>
        <Button>{calendarTitle}</Button>
        <Button onClick={() => calendarApi?.next()}>{'>'}</Button>
      </ButtonGroup>
      <Button onClick={() => calendarApi?.today()} className={classes.button} variant="outlined">
        Today
      </Button>
      <ViewModeMenu />
      <Button onClick={() => {}} className={classes.button} variant="contained" color="primary">
        Add New
      </Button>
    </Grid>
  );
}
