import { screen, waitFor } from '@testing-library/react';
import { set } from 'lodash';

import { Booking } from '../../../../../../../../../interfaces/booking';
import restApi from '../../../../../../../../../network/restApi';
import { renderWithBaseWrapper } from '../../../../../../../../../testUtil/helper/render';
import { createMockBooking } from '../../../../../../../../../testUtil/mockData/booking';
import { createMockService } from '../../../../../../../../../testUtil/mockData/service';
import { DateTimeFields } from '../DateTimeFields';

jest.mock('../../../../../../../../../network/restApi');

describe('DateTimeFields.tsx', () => {
  const defaultProps = {
    booking: {} as Booking,
    setBooking: () => {},
  };

  beforeEach(() => {
    defaultProps.booking = createMockBooking();
    defaultProps.setBooking = jest.fn();
  });

  function renderDateTimeFields(props = defaultProps) {
    return renderWithBaseWrapper(<DateTimeFields {...props} />);
  }

  it('should set the end time by the selected services', () => {
    const props = { ...defaultProps };
    const mockServices = [createMockService({ id: 1, minutes: 15 }), createMockService({ id: 2, minutes: 25 })];
    set(props, 'booking.startTime', '10:00');
    set(props, 'booking.endTime', '10:00');
    set(props, 'booking.services', mockServices);
    renderDateTimeFields(props);

    expect(props.setBooking).toHaveBeenCalledWith({ ...props.booking, endTime: '10:40' });
  });

  it('should NOT set the end if the total estimated time for selected service is 0', () => {
    const props = { ...defaultProps };
    const mockServices = [createMockService({ id: 1, minutes: 0 })];
    set(props, 'booking.startTime', '10:00');
    set(props, 'booking.endTime', '10:00');
    set(props, 'booking.services', mockServices);
    renderDateTimeFields(props);

    expect(props.setBooking).not.toHaveBeenCalled();
  });

  it('should show a warning message if the end time is too early for the last available time slot', async () => {
    restApi.fetchTimeslots = jest.fn().mockResolvedValue([
      { startTime: '10:00', endTime: '10:30' },
      { startTime: '10:30', endTime: '11:00' },
    ]);
    const props = { ...defaultProps };
    const mockServices = [createMockService({ id: 1, minutes: 0 })];
    set(props, 'booking.startTime', '10:00');
    set(props, 'booking.endTime', '11:00');
    set(props, 'booking.services', mockServices);
    const { rerender } = renderDateTimeFields(props);

    set(props, 'booking.endTime', '11:30');
    rerender(<DateTimeFields {...props} />);

    const textField = screen.getByTestId('end-time-field');
    await waitFor(() => expect(textField).toHaveTextContent('It must end by the end of the last timeslot (11:00)'));
  });
});
