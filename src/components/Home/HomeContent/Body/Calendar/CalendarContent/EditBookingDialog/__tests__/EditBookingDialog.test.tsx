import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';

import restApi from '../../../../../../../../network/restApi';
import { NEW_BOOKING_ID } from '../../../../../../../../staticData/calendar';
import { PATHS } from '../../../../../../../../staticData/routes';
import { EditBookingDialog } from '../EditBookingDialog';
import { renderWithBaseWrapper } from '../../../../../../../../testUtil/helper/render';
import { createMockBooking } from '../../../../../../../../testUtil/mockData/booking';
import { getPathWithParam } from '../../../../../../../../services/routing';

const mockedPush = jest.fn();
jest.mock('../../../../../../../../network/restApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockedPush,
  }),
}));

describe('EditBookingDialog.tsx', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderEditBookingDialog(bookingId: number = NEW_BOOKING_ID) {
    renderWithBaseWrapper(
      <Route path={PATHS.calendarBookingEditId}>
        <EditBookingDialog />
      </Route>,
      { pathName: PATHS.calendarBookingEditId.replace(':id', String(bookingId)) },
    );
  }

  function clickSubmitButton() {
    const submitButton = screen.getByTestId('submit-booking');
    fireEvent.click(submitButton);
  }

  it('should allow the user to submit a new booking', async () => {
    renderEditBookingDialog();
    clickSubmitButton();

    await waitFor(() => expect(restApi.createBooking).toHaveBeenCalled());
  });

  it('should allow the user to submit an updated booking', async () => {
    renderEditBookingDialog(123);
    clickSubmitButton();

    await waitFor(() => expect(restApi.updateBooking).toHaveBeenCalled());
  });

  it('should refetch bookings after booking submission is successful', async () => {
    restApi.createBooking = jest.fn().mockResolvedValue(() => {});
    renderEditBookingDialog();
    // Refreshing restApi.fetchBookings's mock must be done just before clickSubmitButton
    restApi.fetchBookings = jest.fn().mockClear();
    clickSubmitButton();

    await waitFor(() => expect(restApi.fetchBookings).toHaveBeenCalled());
  });

  it('should NOT refetch bookings if booking submission is unsuccessful', async () => {
    console.error = jest.fn();
    restApi.createBooking = jest.fn().mockRejectedValue('Failed');
    renderEditBookingDialog();
    // Refreshing restApi.fetchBookings's mock must be done just before clickSubmitButton
    restApi.fetchBookings = jest.fn().mockClear();
    clickSubmitButton();

    await waitFor(() => expect(restApi.fetchBookings).not.toHaveBeenCalled());
  });

  it('should update the URL when a new booking is created', async () => {
    const newBooking = createMockBooking({ id: 1 });
    restApi.createBooking = jest.fn().mockResolvedValue(newBooking);
    renderEditBookingDialog();
    clickSubmitButton();

    await waitFor(() =>
      expect(mockedPush).toHaveBeenCalledWith(
        getPathWithParam(PATHS.calendarBookingEditId, { ':id': String(newBooking.id) }),
      ),
    );
  });

  it('should NOT update the URL when an existing booking is updated', async () => {
    const existingBooking = createMockBooking({ id: 1 });
    restApi.createBooking = jest.fn().mockResolvedValue(existingBooking);
    renderEditBookingDialog(existingBooking.id);
    clickSubmitButton();

    await waitFor(() => expect(mockedPush).not.toHaveBeenCalled());
  });
});
