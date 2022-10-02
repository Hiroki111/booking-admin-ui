import { screen, waitFor } from '@testing-library/react';

import { useIsSmallWindow } from '../../../../../../../../hooks/window';
import restApi from '../../../../../../../../network/restApi';
import { renderWithBaseWrapper } from '../../../../../../../../testUtil/helper/render';
import { ToolBar } from '../ToolBar';

jest.mock('../../../../../../../../network/restApi');
jest.mock('../../../../../../../../hooks/window');

describe('ToolBar.tsx', () => {
  function renderToolBar() {
    renderWithBaseWrapper(<ToolBar />, { inCalendarContext: true });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render DateNavigator and ActionDrawer if the window is small', async () => {
    (useIsSmallWindow as jest.Mock).mockImplementation(() => true);
    renderToolBar();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());
    expect(screen.getByTestId('date-navigator-grid')).toBeInTheDocument();
    expect(screen.getByTestId('action-drawer-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('staff-selector-grid')).not.toBeInTheDocument();
    expect(screen.queryByTestId('today-add-new-grid')).not.toBeInTheDocument();
  });

  it('should render StaffSelector and DateNavigator and Today and Add new if the window is not small', async () => {
    (useIsSmallWindow as jest.Mock).mockImplementation(() => false);
    renderToolBar();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());
    expect(screen.getByTestId('date-navigator-grid')).toBeInTheDocument();
    expect(screen.getByTestId('staff-selector-grid')).toBeInTheDocument();
    expect(screen.getByTestId('today-add-new-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('action-drawer-grid')).not.toBeInTheDocument();
  });
});
