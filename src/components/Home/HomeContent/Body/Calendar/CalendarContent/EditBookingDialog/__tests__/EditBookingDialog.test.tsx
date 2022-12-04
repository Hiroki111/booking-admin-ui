import dayjs from 'dayjs';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';

import restApi from '../../../../../../../../network/restApi';
import { NEW_BOOKING_ID } from '../../../../../../../../staticData/calendar';
import { PATHS } from '../../../../../../../../staticData/routes';
import { EditBookingDialog } from '../EditBookingDialog';
import { renderWithBaseWrapper } from '../../../../../../../../testUtil/helper/render';
import { createMockBooking } from '../../../../../../../../testUtil/mockData/booking';
import { getDelayedPromise } from '../../../../../../../../testUtil/helper/async';
import { getPathWithParam } from '../../../../../../../../services/routing';
import { BookingRequestError } from '../../../../../../../../network/error';

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

  function renderEditBookingDialog(bookingId: number = NEW_BOOKING_ID, date?: Date) {
    let pathName = PATHS.calendarBookingEditId.replace(':id', String(bookingId));
    if (date) {
      const year = dayjs(date).format('YYYY');
      const month = dayjs(date).format('MM');
      const day = dayjs(date).format('DD');
      pathName = `${pathName}?year=${year}&month=${month}&day=${day}`;
    }
    renderWithBaseWrapper(
      <Route path={PATHS.calendarBookingEditId}>
        <EditBookingDialog />
      </Route>,
      { pathName },
    );
  }

  function clickSubmitButton() {
    // change getByTestId by role and text
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
  }

  function clickCancelButton() {
    const submitButton = screen.getByTestId('cancel-submission');
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

  it('should prevent the user from submitting a booking while another booking is being submitted', async () => {
    restApi.createBooking = jest.fn().mockImplementation(getDelayedPromise);
    renderEditBookingDialog();
    clickSubmitButton();

    await waitFor(() => expect(restApi.createBooking).not.toHaveBeenCalled());
  });

  it('should refetch bookings after booking submission is successful', async () => {
    restApi.createBooking = jest.fn().mockResolvedValue(() => {});
    renderEditBookingDialog();
    // Refreshing restApi.fetchBookings's mock must be done just before clickSubmitButton
    restApi.fetchBookings = jest.fn().mockClear();
    clickSubmitButton();

    await waitFor(() => expect(screen.getByTestId('submit')).toBeDisabled());
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

  it('should use the date in URL as the default booking date', async () => {
    const dateInUrl = '2022-12-31';

    restApi.createBooking = jest.fn();
    renderEditBookingDialog(NEW_BOOKING_ID, new Date(dateInUrl));
    clickSubmitButton();

    await waitFor(() =>
      expect(restApi.createBooking).toHaveBeenCalledWith(expect.objectContaining({ date: dateInUrl })),
    );
  });

  it('should show an error when it fails to fetch services', async () => {
    console.error = jest.fn();
    restApi.fetchServices = jest.fn().mockRejectedValue('Failed');
    renderEditBookingDialog();

    expect(await screen.findByText('Loading data failed')).toBeInTheDocument();
  });

  it('should show an error when it fails to fetch staff', async () => {
    console.error = jest.fn();
    restApi.fetchStaffList = jest.fn().mockRejectedValue('Failed');
    renderEditBookingDialog();

    await waitFor(() => expect(restApi.fetchStaffList).toHaveBeenCalled());
    expect(await screen.findByText('Loading data failed')).toBeInTheDocument();
  });

  it('should show an error when it fails to fetch staff availabilities', async () => {
    console.error = jest.fn();
    const existingBooking = createMockBooking();
    restApi.fetchBooking = jest.fn().mockResolvedValue(existingBooking);
    restApi.fetchStaffAvailability = jest.fn().mockRejectedValue('Failed');
    renderEditBookingDialog(existingBooking.id);

    await waitFor(() => expect(restApi.fetchStaffAvailability).toHaveBeenCalled());
    expect(await screen.findByText('Loading data failed')).toBeInTheDocument();
  });

  it('should redirect to the calendar page if there is no URL search params and cancel button is clicked', async () => {
    renderEditBookingDialog();
    clickCancelButton();

    await waitFor(() => expect(mockedPush).toHaveBeenCalledWith(PATHS.calendar));
  });

  it('should redirect to the calendar page with a date if the the date is in URL and cancel button is clicked', async () => {
    renderEditBookingDialog(NEW_BOOKING_ID, new Date('2023-01-31'));
    clickCancelButton();

    await waitFor(() => expect(mockedPush).toHaveBeenCalledWith(`${PATHS.calendar}?year=2023&month=01&day=31`));
  });

  it('should render error.details when submission fails', async () => {
    console.error = jest.fn();
    restApi.createBooking = jest
      .fn()
      .mockRejectedValue(
        new BookingRequestError('Submission failed', { email: 'email is missing', errorCode: 123456 }),
      );
    renderEditBookingDialog();
    clickSubmitButton();

    expect(await screen.findByText('email: email is missing, errorCode: 123456')).toBeInTheDocument();
  });

  it('should render error.message when submission fails', async () => {
    console.error = jest.fn();
    restApi.createBooking = jest.fn().mockRejectedValue(new BookingRequestError('Submission rejected'));
    renderEditBookingDialog();
    clickSubmitButton();

    expect(await screen.findByText(`Submission rejected`)).toBeInTheDocument();
  });
});
