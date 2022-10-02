import { fireEvent, screen, waitFor } from '@testing-library/react';

import { ALL_STAFF } from '../../../../../../../../../contexts/CalendarContext';
import { Staff } from '../../../../../../../../../interfaces/staff';
import restApi from '../../../../../../../../../network/restApi';
import { renderWithBaseWrapper } from '../../../../../../../../../testUtil/helper/render';
import { createMockStaff } from '../../../../../../../../../testUtil/mockData/staff';
import { ActionDrawer } from '../ActionDrawer';
import { getUrlWithCalendarView } from '../../../../../../../../../services/routing';
import { CalendarView, CalendarViewKey } from '../../../../../../../../../interfaces/calendar';

const mockedPush = jest.fn();
jest.mock('../../../../../../../../../network/restApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockedPush,
  }),
}));

describe('ActionDrawer.tsx', () => {
  let mockStaffA: Staff;
  let mockStaffB: Staff;

  function renderActionDrawer() {
    return renderWithBaseWrapper(<ActionDrawer />, { inCalendarContext: true });
  }

  function openDrawer() {
    const drawerSwitch = screen.getByRole('button', { name: 'drawer-switch' });
    fireEvent.click(drawerSwitch);
  }

  beforeEach(() => {
    mockStaffA = createMockStaff({ id: 1, name: 'John Smith' });
    mockStaffB = createMockStaff({ id: 2, name: 'Alice' });
    restApi.fetchStaffList = jest.fn().mockResolvedValue([mockStaffA, mockStaffB]);
  });

  it('should render ALL_STAFF option and the staff that are provided by API request', async () => {
    renderActionDrawer();
    openDrawer();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());

    expect(screen.getByTestId('staff-options')).toHaveTextContent(ALL_STAFF.name);
    expect(screen.getByTestId('staff-options')).toHaveTextContent(mockStaffA.name);
    expect(screen.getByTestId('staff-options')).toHaveTextContent(mockStaffB.name);

    // Avatar contents
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.people-icon')).toBeInTheDocument();
    expect(screen.getByTestId('staff-options')).toHaveTextContent('JS');
    expect(screen.getByTestId('staff-options')).toHaveTextContent('A');
  });

  it.each(Object.keys(CalendarView) as CalendarViewKey[])(
    'should direct to %s view when the corresponding icon is clicked',
    async (calendarViewKey: CalendarViewKey) => {
      renderActionDrawer();
      openDrawer();
      const dayButton = screen.getByRole('button', { name: `${calendarViewKey.toLocaleLowerCase()}-icon-button` });
      fireEvent.click(dayButton);

      await waitFor(() => expect(mockedPush).toHaveBeenCalledWith(getUrlWithCalendarView(calendarViewKey)));
    },
  );
});
