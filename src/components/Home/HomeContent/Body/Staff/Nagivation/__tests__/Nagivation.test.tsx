import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PATHS } from '../../../../../../../staticData/routes';
import { renderWithBaseWrapper } from '../../../../../../../testUtil/helper/render';
import { Nagivation } from '../Nagivation';

const mockedPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockedPush,
  }),
}));

describe('Nagivation.tsx', () => {
  function renderNagivation(initialPath: string = PATHS.staff) {
    return renderWithBaseWrapper(<Nagivation />, { pathName: initialPath });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the URL when a tab is clicked', async () => {
    renderNagivation();

    const staffAvailabilityTab = screen.getByRole('tab', { name: 'Staff Availabilities' });
    userEvent.click(staffAvailabilityTab);
    await waitFor(() => expect(mockedPush).toHaveBeenCalledWith(PATHS.staffAvailabilities));
  });

  it('should have "Staff List" selected upon rendering', async () => {
    renderNagivation(PATHS.staff);

    const staffListTab = screen.getByRole('tab', { name: 'Staff List' });
    await waitFor(() => expect(staffListTab).toHaveClass('Mui-selected'));
  });

  it('should have "Staff Availabilities" selected upon rendering', async () => {
    renderNagivation(PATHS.staffAvailabilities);

    const staffAvailabilityTab = screen.getByRole('tab', { name: 'Staff Availabilities' });
    await waitFor(() => expect(staffAvailabilityTab).toHaveClass('Mui-selected'));
  });
});
