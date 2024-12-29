class CustomError extends Error {
  errorStatusCode: number = 500;
  status: "Fail" | "Error" | "" = "";
  isOperational: boolean = true;
  constructor(message: string, errorStatusCode: number = 500) {
    super(message);
    this.errorStatusCode = errorStatusCode;
    this.status =
      errorStatusCode >= 400 && errorStatusCode <= 500 ? "Fail" : "Error";
    Error.captureStackTrace(this, this.constructor);
  }
}
export default CustomError;
