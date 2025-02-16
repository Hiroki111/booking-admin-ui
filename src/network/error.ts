// TODO: Use ErrorWithDetails instead of BookingRequestError
export class BookingRequestError extends Error {
  readonly details?: Object;

  constructor(message: string, details?: Object) {
    super(message);
    // NOTE:
    // Set the prototype explicitlyby Object.setPrototypeOf right below super(...).
    // This is necessary for extending Error. Error uses ES6 new.keyword to adjust the prototype chain,
    // but new.keyword won't get the right value via constructor in ES5.
    // This could be solved by make TS compilation target ES6+
    Object.setPrototypeOf(this, BookingRequestError.prototype);

    this.details = details;
  }
}

export class ErrorWithDetails extends Error {
  readonly details: { [key: string]: string };

  constructor(message: string, details: { [key: string]: string }) {
    super(message);
    // NOTE:
    // Set the prototype explicitlyby Object.setPrototypeOf right below super(...).
    // This is necessary for extending Error. Error uses ES6 new.keyword to adjust the prototype chain,
    // but new.keyword won't get the right value via constructor in ES5.
    // This could be solved by make TS compilation target ES6+
    Object.setPrototypeOf(this, ErrorWithDetails.prototype);

    this.details = details;
  }
}
