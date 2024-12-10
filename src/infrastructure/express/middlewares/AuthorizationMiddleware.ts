import { NextFunction, Request, Response } from "express";
import { AuthenticationAuthorizationServices } from "../services";

export default function AuthorizationMiddleware(
) {
  return function authorization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const checkToken = AuthenticationAuthorizationServices.validateToken(token as string);
    if (checkToken) {
      next();
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  };
}
