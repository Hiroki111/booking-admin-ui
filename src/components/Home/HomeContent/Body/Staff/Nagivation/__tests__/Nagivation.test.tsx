import { screen } from '@testing-library/react';
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

  it('should update the URL when a tab is clicked', () => {
    renderNagivation();

    const staffAvailabilityTab = screen.getByRole('tab', { name: 'Staff Availabilities' });
    userEvent.click(staffAvailabilityTab);
    expect(mockedPush).toHaveBeenCalledWith(PATHS.staffAvailabilities);
  });

  it('should have "Staff List" selected upon rendering', () => {
    renderNagivation(PATHS.staff);

    const staffListTab = screen.getByRole('tab', { name: 'Staff List' });
    const staffAvailabilityTab = screen.getByRole('tab', { name: 'Staff Availabilities' });
    expect(staffListTab).toHaveClass('Mui-selected');
    expect(staffAvailabilityTab).not.toHaveClass('Mui-selected');
  });

  it('should have "Staff Availabilities" selected upon rendering', () => {
    renderNagivation(PATHS.staffAvailabilities);

    const staffListTab = screen.getByRole('tab', { name: 'Staff List' });
    const staffAvailabilityTab = screen.getByRole('tab', { name: 'Staff Availabilities' });
    expect(staffListTab).not.toHaveClass('Mui-selected');
    expect(staffAvailabilityTab).toHaveClass('Mui-selected');
  });
});
