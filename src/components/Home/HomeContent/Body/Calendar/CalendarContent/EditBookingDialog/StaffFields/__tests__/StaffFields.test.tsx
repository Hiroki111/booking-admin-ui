import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { Booking } from '../../../../../../../../../interfaces/booking';
import { createMockStaffAvailability } from '../../../../../../../../../testUtil/mockData/staffAvailability';
import { createMockBooking } from '../../../../../../../../../testUtil/mockData/booking';
import { createMockService } from '../../../../../../../../../testUtil/mockData/service';
import { createMockStaff } from '../../../../../../../../../testUtil/mockData/staff';
import { StaffFields } from '../StaffFields';
import { StaffAvailability } from '../../../../../../../../../interfaces/staffAvailability';

jest.mock('../../../../../../../../../network/restApi', () => ({
  fetchBooking: jest.fn(),
  fetchStaffList: jest.fn(),
  fetchStaffAvailability: jest.fn(),
}));

// NOTE: I haven't found how to test the contents of filterOptions in Autocomplete
// Idealy, it should be tested that filterOptions always have "booking.staff" if it's present
describe('StaffFields.tsx', () => {
  const restApi = require('../../../../../../../../../network/restApi');
  const availableMockService = createMockService({ id: 1, name: 'available' });
  const unavailableMockServiceA = createMockService({ id: 2, name: 'unavailable A' });
  const unavailableMockServiceB = createMockService({ id: 3, name: 'unavailable B' });
  const mockStaffAvailability = createMockStaffAvailability({
    date: '2022-12-31',
    availableTimeSlots: [
      { startTime: '09:00', endTime: '09:30' },
      { startTime: '09:30', endTime: '10:00' },
    ],
  });
  const mockSelectedStaff = createMockStaff({
    services: [availableMockService],
  });
  const mockBooking = createMockBooking({
    date: '2022-12-31',
    startTime: '09:30',
    endTime: '10:00',
    staff: mockSelectedStaff,
    services: [],
  });

  function renderStaffFields(booking: Booking) {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <StaffFields booking={booking} setBooking={() => {}} />
        </QueryClientProvider>
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    restApi.fetchStaffList.mockImplementation(() => [mockSelectedStaff]);
  });

  it('should render without warning messages', async () => {
    restApi.fetchStaffAvailability.mockImplementation(() => mockStaffAvailability);
    renderStaffFields(mockBooking);

    await waitFor(() => {
      const message = screen.queryByTestId('staff-validation');
      expect(message).toBeNull();
    });
  });

  it('should show a warning message by date', async () => {
    restApi.fetchStaffAvailability.mockImplementation(() => ({} as StaffAvailability));
    renderStaffFields(mockBooking);

    const message = await screen.findByText(`${mockSelectedStaff.name} isn't available on ${mockBooking.date}`);
    expect(message).toBeInTheDocument();
  });

  it('should show a warning message by timeslot', async () => {
    restApi.fetchStaffAvailability.mockImplementation(() => ({
      ...mockStaffAvailability,
      availableTimeSlots: [],
    }));
    renderStaffFields(mockBooking);

    const message = await screen.findByText(
      `${mockSelectedStaff.name} isn't available from ${mockBooking.startTime} to ${mockBooking.endTime} on ${mockBooking.date}`,
    );
    expect(message).toBeInTheDocument();
  });

  it('should show a warning message by service', async () => {
    const booking = {
      ...mockBooking,
      services: [availableMockService, unavailableMockServiceA, unavailableMockServiceB],
    };
    renderStaffFields(booking);

    const message = await screen.findByText(
      `${mockSelectedStaff.name} can't do ${unavailableMockServiceA.name}, ${unavailableMockServiceB.name}`,
    );
    expect(message).toBeInTheDocument();
  });
});
