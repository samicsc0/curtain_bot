import { Router } from "express";
import {
  createCurtain,
  getCurtainById,
  updateCurtain,
  updateCurtainStatus,
  deleteCurtain,
  getAllCurtains,
} from "../controllers/CurtainController";
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware";

const curtainRouter = Router();

curtainRouter.post("/", AuthorizationMiddleware(), createCurtain);
curtainRouter.get("/:id", getCurtainById);
curtainRouter.get("/", getAllCurtains);
curtainRouter.patch("/:id", AuthorizationMiddleware(), updateCurtain);
curtainRouter.patch(
  "/:id/status",
  AuthorizationMiddleware(),
  updateCurtainStatus
);
curtainRouter.delete("/:id", AuthorizationMiddleware(), deleteCurtain);

export default curtainRouter;
