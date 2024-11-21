import { Router } from "express";
import {
  createCurtain,
  getCurtainById,
  updateCurtain,
  updateCurtainStatus,
  deleteCurtain,
  getAllCurtains,
} from "../controllers/CurtainController";

const curtainRouter = Router();

curtainRouter.post("/", createCurtain);
curtainRouter.get("/:id", getCurtainById);
curtainRouter.get("/", getAllCurtains);
curtainRouter.patch("/:id", updateCurtain);
curtainRouter.patch("/:id/status", updateCurtainStatus);
curtainRouter.delete("/:id", deleteCurtain);

export default curtainRouter;
