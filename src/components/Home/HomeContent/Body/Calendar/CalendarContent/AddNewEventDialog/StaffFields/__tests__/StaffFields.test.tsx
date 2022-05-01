import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { Booking } from '../../../../../../../../../interfaces/booking';
import { Service } from '../../../../../../../../../interfaces/service';
import { createMockAvailableDate } from '../../../../../../../../../testUtil/mockData/availableDate';
import { createMockBooking } from '../../../../../../../../../testUtil/mockData/booking';
import { createMockService } from '../../../../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../../../../testUtil/mockData/staff';
import { StaffFields } from '../StaffFields';

jest.mock('../../../../../../../../../network/restApi', () => ({
  fetchBooking: jest.fn(),
  fetchStaffList: jest.fn(),
}));

describe('StaffFields.tsx', () => {
  const restApi = require('../../../../../../../../../network/restApi');
  const availableService = createMockService({ id: 1, name: 'available' });
  const availableService2 = createMockService({ id: 2, name: 'available2' });
  const unavailableService = createMockService({ id: 3, name: 'unavailable' });
  const unavailableService2 = createMockService({ id: 4, name: 'unavailable2' });
  const mockAvailableDate = createMockAvailableDate({
    date: '2022-12-31',
    availableTimeSlots: [
      { startTime: '09:00', endTime: '09:30' },
      { startTime: '09:30', endTime: '10:00' },
    ],
  });
  const mockSelectedStaff = createMockStaff({
    services: [availableService, availableService2],
    availableDates: [mockAvailableDate],
  });
  const mockBooking = createMockBooking({
    date: '2022-12-31',
    startTime: '09:30',
    endTime: '10:00',
    staff: mockSelectedStaff,
    services: [],
  });

  function renderStaffFields(booking: Booking, isCreatingNewBooking: boolean = true) {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <StaffFields booking={booking} setBooking={() => {}} isCreatingNewBooking={isCreatingNewBooking} />
        </QueryClientProvider>
      </MemoryRouter>,
    );
  }

  function getDateWarningMessage(staffName: string, booking: Booking) {
    return `${staffName} isn't available on ${booking.date}`;
  }

  function getTimeslotWarningMessage(staffName: string, booking: Booking) {
    return `${staffName} isn't available from ${booking.startTime} to ${booking.endTime} on ${booking.date}`;
  }

  function getServiceWarningMessage(staffName: string, unavailableServices: Service[]) {
    return `${staffName} can't do ${unavailableServices.map((service) => service.name).join(', ')}`;
  }

  describe('creating a new booking', () => {
    beforeEach(() => {
      restApi.fetchStaffList.mockImplementation(() => [mockSelectedStaff]);
    });

    it('should render without warning messages', async () => {
      renderStaffFields(mockBooking);

      await waitFor(() => {
        const message = screen.queryByTestId('staff-validation');
        expect(message).toBeNull();
      });
    });

    it('should show a warning message by date', async () => {
      const booking = { ...mockBooking, date: '2022-01-01' };
      renderStaffFields(booking);

      const message = await screen.findByText(getDateWarningMessage(mockSelectedStaff.name, booking));
      expect(message).toBeInTheDocument();
    });

    it('should show a warning message by timeslot', async () => {
      const booking = { ...mockBooking, endTime: '10:05' };
      renderStaffFields(booking);

      const message = await screen.findByText(getTimeslotWarningMessage(mockSelectedStaff.name, booking));
      expect(message).toBeInTheDocument();
    });

    it('should show a warning message by service', async () => {
      const booking = { ...mockBooking, services: [availableService, unavailableService, unavailableService2] };
      renderStaffFields(booking);

      const message = await screen.findByText(
        getServiceWarningMessage(mockSelectedStaff.name, [unavailableService, unavailableService2]),
      );
      expect(message).toBeInTheDocument();
    });
  });

  describe('editing an existing booking', () => {
    it('should render without warning messages', async () => {
      const existingBooking = { ...mockBooking };
      restApi.fetchStaffList.mockImplementation(() => [{ ...mockSelectedStaff, availableDates: [] }]);
      restApi.fetchBooking.mockImplementation(() => existingBooking);

      const editedBooking = { ...existingBooking };
      renderStaffFields(editedBooking, false);

      // Note that the selected staff has no available date.
      // However, there should be no warning as long as the existing booking has the same values as edited booking
      await waitFor(() => {
        const message = screen.queryByTestId('staff-validation');
        expect(message).toBeNull();
      });
    });

    it('should show a warning message by date', async () => {
      const existingBooking = { ...mockBooking, date: '2022-12-29' };
      restApi.fetchBooking.mockImplementation(() => existingBooking);
      restApi.fetchStaffList.mockImplementation(() => [mockSelectedStaff]);

      const editedBooking = { ...existingBooking, date: '2022-12-30' };
      renderStaffFields(editedBooking, false);

      const message = await screen.findByText(getDateWarningMessage(mockSelectedStaff.name, editedBooking));
      expect(message).toBeInTheDocument();
    });

    it('should show a warning message by timeslot', async () => {
      const existingBooking = { ...mockBooking, endTime: '10:00' };
      restApi.fetchBooking.mockImplementation(() => existingBooking);
      restApi.fetchStaffList.mockImplementation(() => [mockSelectedStaff]);

      const editedBooking = { ...existingBooking, endTime: '10:05' };
      renderStaffFields(editedBooking, false);

      const message = await screen.findByText(getTimeslotWarningMessage(mockSelectedStaff.name, editedBooking));
      expect(message).toBeInTheDocument();
    });
  });
});
