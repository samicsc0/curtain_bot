import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { ApiErrorResponseDTO } from "../dtos";

export default function RequestValidationMiddleware(schema: ZodSchema) {
  return function requestValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const response: ApiErrorResponseDTO = {
          errorCode: 400,
          errorMessage: error.errors
            .map((e) => {
              return JSON.stringify({ field: e.path, message: e.message });
            })
            .join("."),
        };
        res.status(400).json(response);
      } else {
        next(error);
      }
    }
  };
}
