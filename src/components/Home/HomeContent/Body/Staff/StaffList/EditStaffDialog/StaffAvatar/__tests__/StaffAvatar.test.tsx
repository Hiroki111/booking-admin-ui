import { screen } from '@testing-library/react';

import { renderWithBaseWrapper } from '../../../../../../../../../testUtil/helper/render';
import { Staff } from '../../../../../../../../../interfaces/staff';
import { StaffAvatar } from '../StaffAvatar';
import { createMockStaff } from '../../../../../../../../../testUtil/mockData/staff';
import { NEW_STAFF_ID } from '../../../../../../../../../staticData/staff';

describe('StaffAvatar.tsx', () => {
  function renderStaffAvatar(staff: Staff) {
    renderWithBaseWrapper(<StaffAvatar staff={staff} />);
  }

  it('should render an image', () => {
    const staff = createMockStaff({ profilePhotoUrl: 'https://valid-url.com' });
    renderStaffAvatar(staff);

    expect(screen.getByTestId('staff-photo')).toBeInTheDocument();
  });

  it("should show the initials of the staff if the staff's image is invalid", () => {
    const staff = createMockStaff({ profilePhotoUrl: '' });
    renderStaffAvatar(staff);

    expect(screen.getByTestId('staff-initials')).toBeInTheDocument();
  });

  it('should show the new staff icon when creating a new staff', () => {
    const staff = createMockStaff({ id: NEW_STAFF_ID });
    renderStaffAvatar(staff);

    expect(screen.getByTestId('new-staff-icon')).toBeInTheDocument();
  });
});
