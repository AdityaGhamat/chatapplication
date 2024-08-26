class ApiSuccess<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  constructor(
    statusCode: number,
    message: string,
    data: T,
    success: boolean = true
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
  toJson() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data,
    };
  }
}
export default ApiSuccess;
