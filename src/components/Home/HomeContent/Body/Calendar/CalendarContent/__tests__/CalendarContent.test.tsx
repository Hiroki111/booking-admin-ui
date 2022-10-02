import { screen } from '@testing-library/react';

import { useIsSmallWindow } from '../../../../../../../hooks/window';
import { renderWithBaseWrapper } from '../../../../../../../testUtil/helper/render';
import { CalendarContent } from '../CalendarContent';

jest.mock('../../../../../../../network/restApi');
jest.mock('../../../../../../../hooks/window');

describe('CalendarContent.tsx', () => {
  function renderCalendarContent() {
    return renderWithBaseWrapper(<CalendarContent />, { inCalendarContext: true });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Today and AddIcon if the window is small', async () => {
    (useIsSmallWindow as jest.Mock).mockImplementation(() => true);
    renderCalendarContent();

    expect(screen.getByTestId('today-icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });

  it('should hide Today and AddIcon if the window is not small', async () => {
    (useIsSmallWindow as jest.Mock).mockImplementation(() => false);
    renderCalendarContent();

    expect(screen.queryByTestId('today-icon-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-icon')).not.toBeInTheDocument();
  });
});
