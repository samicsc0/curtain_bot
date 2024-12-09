import { NextFunction, Request, Response } from "express";
import { AuthenticationAuthorizationServices } from "../services";
import { AdminRepository } from "../../../repository";

export default function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
  adminRepository: AdminRepository
) {
  const token = req.headers.authorization;
  const authService = new AuthenticationAuthorizationServices(adminRepository);
  const checkToken = authService.validateToken(token as string);
  if (checkToken) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
}
