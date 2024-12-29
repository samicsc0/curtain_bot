import { Router } from "express";
import {
  AuthorizationMiddleware,
  RequestValidationMiddleware,
} from "../../middlewares";
import { createColorValidation } from "../../validation/ColorValidators";
import {
  createColor,
  deleteColor,
  getAllColors,
  updateColor,
} from "../controllers/ColorController";

const colorRoutes = Router();

colorRoutes.post(
  "/",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(createColorValidation),
  createColor
);
colorRoutes.get("/", getAllColors);
colorRoutes.patch(
  "/:id",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(createColorValidation),
  updateColor
);
colorRoutes.delete("/:id", AuthorizationMiddleware(), deleteColor);
export default colorRoutes;
