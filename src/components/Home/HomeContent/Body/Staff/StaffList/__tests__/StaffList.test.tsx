import { screen, waitFor } from '@testing-library/react';

import restApi from '../../../../../../../network/restApi';
import { renderWithBaseWrapper } from '../../../../../../../testUtil/helper/render';
import { createMockStaff } from '../../../../../../../testUtil/mockData/staff';
import { StaffList } from '../StaffList';

jest.mock('../../../../../../../network/restApi');

describe('StaffList.tsx', () => {
  const mockStaffList = [
    createMockStaff({ id: 1, name: 'Alice', title: 'Hair Stylist' }),
    createMockStaff({ id: 2, name: 'Bob' }),
  ];

  function renderStaffList() {
    renderWithBaseWrapper(<StaffList />);
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render staff', async () => {
    (restApi.fetchStaffList as jest.Mock).mockImplementation(() => mockStaffList);

    renderStaffList();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Hair Stylist')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByTestId('fetching-data-failed-alert')).not.toBeInTheDocument();
  });

  it('should render a warning if it failed to load staff', async () => {
    console.error = jest.fn();
    (restApi.fetchStaffList as jest.Mock).mockRejectedValue('loading failed');

    renderStaffList();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());
    expect(screen.getByTestId('fetching-data-failed-alert')).toBeInTheDocument();
  });
});
