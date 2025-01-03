import { Router } from "express";
import {
  createVisitor,
  getDailyUniqueVisitors,
  getTotalUniqueVisitors,
  getTotalVisits,
} from "../controllers/VisitorController";
import { RequestValidationMiddleware } from "../../middlewares"; // Assuming you have a validation middleware
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware"; // If needed for some routes
import { CreateVisitorValidation } from "../../validation";

const visitorRoutes = Router();
visitorRoutes.post(
  "/",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(CreateVisitorValidation),
  createVisitor
);
visitorRoutes.get(
  "/daily-unique",
  AuthorizationMiddleware(),
  getDailyUniqueVisitors
);
visitorRoutes.get(
  "/total-unique",
  AuthorizationMiddleware(),
  getTotalUniqueVisitors
);
visitorRoutes.get("/total-visits", AuthorizationMiddleware(), getTotalVisits);

export default visitorRoutes;
