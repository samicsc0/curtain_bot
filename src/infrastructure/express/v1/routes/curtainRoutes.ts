import { Router } from "express";
import {
  createCurtain,
  getCurtainById,
  updateCurtain,
  updateCurtainStatus,
  deleteCurtain,
  getAllCurtains,
  updateCurtainImage,
} from "../controllers/CurtainController";
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware";
import { RequestValidationMiddleware } from "../../middlewares";
import {
  CreateCurtainValidator,
  UpdateCurtainImageValidator,
  UpdateCurtainStatusValidator,
  UpdateCurtainValidator,
} from "../../validation";

const curtainRouter = Router();

curtainRouter.post(
  "/",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(CreateCurtainValidator),
  createCurtain
);
curtainRouter.get("/:id", getCurtainById);
curtainRouter.get("/", getAllCurtains);
curtainRouter.patch(
  "/:id",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(UpdateCurtainValidator),
  updateCurtain
);
curtainRouter.patch(
  "/:id/status",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(UpdateCurtainStatusValidator),
  updateCurtainStatus
);
curtainRouter.patch(
  "/:id/image",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(UpdateCurtainImageValidator),
  updateCurtainImage
);
curtainRouter.delete("/:id", AuthorizationMiddleware(), deleteCurtain);

export default curtainRouter;
