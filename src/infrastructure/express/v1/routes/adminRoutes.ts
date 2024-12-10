import { Router } from "express";
import {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminEmail,
  updateAdminPassword,
  AdminStatus,
  authenticateAdmin,
} from "../controllers/AdminController";
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware";

const adminRouter = Router();

adminRouter.post("/auth", authenticateAdmin);
adminRouter.post("/", AuthorizationMiddleware(), createAdmin);
adminRouter.get("/", AuthorizationMiddleware(), getAllAdmins);
adminRouter.get("/:id", AuthorizationMiddleware(), getAdminById);
adminRouter.patch("/:id/email", AuthorizationMiddleware(), updateAdminEmail);
adminRouter.patch(
  "/:id/password",
  AuthorizationMiddleware(),
  updateAdminPassword
);
adminRouter.patch("/:id/status", AuthorizationMiddleware(), AdminStatus);
export default adminRouter;
