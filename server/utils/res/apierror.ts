class ApiError extends Error {
  statusCode: number;
  success: boolean;

  constructor(message: string, statusCode: number, success: boolean = false) {
    super(message);
    this.name = message;
    this.statusCode = statusCode;
    this.success = success;
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
    };
  }
}

export default ApiError;
