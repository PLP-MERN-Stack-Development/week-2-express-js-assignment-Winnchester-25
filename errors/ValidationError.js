class ValidationError extends Error {
  constructor(message = 'Invalid data') {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

module.exports = ValidationError;
