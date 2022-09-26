import { Service } from '../../../../../../../../../interfaces/service';
import { renderWithBaseWrapper } from '../../../../../../../../../testUtil/helper/render';
import { createMockBooking } from '../../../../../../../../../testUtil/mockData/booking';
import { createMockService } from '../../../../../../../../../testUtil/mockData/service';
import { ServiceFields } from '../ServiceFields';

jest.mock('../../../../../../../../../network/restApi');

describe('ServiceFields.tsx', () => {
  let mockServiceA: Service;
  let mockServiceB: Service;
  const defaultProps = {
    booking: createMockBooking({ services: [] }),
    setBooking: jest.fn(),
  };

  beforeEach(() => {
    mockServiceA = createMockService({ name: 'Service A', price: 15 });
    mockServiceB = createMockService({ name: 'Service B', price: 30 });
  });

  function renderServiceFields(props = defaultProps) {
    return renderWithBaseWrapper(<ServiceFields {...props} />);
  }

  it('should set the total price when the selected services are updated', async () => {
    let props = { ...defaultProps };
    const { rerender } = renderServiceFields(props);
    props = { ...defaultProps, booking: createMockBooking({ services: [mockServiceA, mockServiceB] }) };
    rerender(<ServiceFields {...props} />);

    expect(props.setBooking).toHaveBeenCalledWith({
      ...props.booking,
      totalPrice: mockServiceA.price + mockServiceB.price,
    });
  });
});
