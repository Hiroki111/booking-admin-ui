import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';

import { addNewButton, gridWrapper, deleteButton, editButton } from './styles';
import { useStaffListQuery } from '../../../../../../queries/staff';
import { WarningAlert } from '../../../../../../util/WarningAlert';
import { PATHS } from '../../../../../../staticData/routes';
import { Route, useHistory } from 'react-router-dom';
import { EditStaffDialog } from './EditStaffDialog';
import { getPathWithParam } from '../../../../../../services/routing';
import { NEW_STAFF_ID } from '../../../../../../staticData/staff';

export function StaffList() {
  const history = useHistory();
  const { data: staffList, isError } = useStaffListQuery();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
    { field: 'title', headerName: 'Title', flex: 2, minWidth: 150 },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 200,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            sx={editButton}
            variant="outlined"
            onClick={() => history.push(getPathWithParam(PATHS.staffEditId, { ':id': String(params.id) }))}
          >
            Edit
          </Button>
          <Button sx={deleteButton}>Delete</Button>
        </>
      ),
    },
  ];

  const rows: GridRowsProp =
    staffList?.map((staff) => ({
      id: staff.id,
      name: staff.name,
      title: staff.title,
    })) || [];

  return (
    <>
      <Box>
        {isError && (
          <Box>
            <WarningAlert
              message={
                <div data-testid="fetching-data-failed-alert">
                  It failed to load data due to an internal error. Please try again later.
                </div>
              }
            />
          </Box>
        )}
        <Box sx={addNewButton}>
          <Button
            variant="outlined"
            onClick={() => history.push(getPathWithParam(PATHS.staffEditId, { ':id': String(NEW_STAFF_ID) }))}
          >
            Add new staff
          </Button>
        </Box>
        <Box sx={gridWrapper}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
        </Box>
      </Box>
      <Route exact path={PATHS.staffEditId} component={EditStaffDialog} />
    </>
  );
}
