import {  NextFunction, Request,Response } from "express";
import { CustomError } from "../utils";
import { ApiErrorResponseDTO } from "../dtos";

export default function GlobalErrorHandlerMiddleware(
  err: CustomError,
  _req:Request,
  res: Response,
  _next:NextFunction
) {
    err.errorStatusCode = err.errorStatusCode || 500;
    err.status = err.status || "Error";
    const errorResponse: ApiErrorResponseDTO = {
      errorCode: err.errorStatusCode,
      status: err.status,
      errorMessage: err.message,
      isOperational: err.isOperational,
    };
    res.status(err.errorStatusCode).json(errorResponse);
}
