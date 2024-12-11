import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { CustomError } from "../utils";

export default function RequestValidationMiddleware(schema: ZodSchema) {
  return function requestValidation(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map((e) => {
            return JSON.stringify({ field: e.path, message: e.message });
          })
          .join(".");
        const customError = new CustomError(errorMessage, 400);
        throw customError;
      } else {
        const customError = new CustomError((error as Error).message, 500);
        next(customError);
      }
    }
  };
}
