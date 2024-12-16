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
import { RequestValidationMiddleware } from "../../middlewares";
import { LoginAdminValidator, CreateAdminValidator, UpdateAdminEmailValidator, UpdateAdminPasswordValidator } from "../../validation";

const adminRouter = Router();

adminRouter.post(
  "/auth",
  RequestValidationMiddleware(LoginAdminValidator),
  authenticateAdmin
);
adminRouter.post(
  "/",
  RequestValidationMiddleware(CreateAdminValidator),
  createAdmin
);
adminRouter.get("/", AuthorizationMiddleware(), getAllAdmins);
adminRouter.get("/:id", AuthorizationMiddleware(), getAdminById);
adminRouter.patch(
  "/:id/email",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(UpdateAdminEmailValidator),
  updateAdminEmail
);
adminRouter.patch(
  "/:id/password",
  AuthorizationMiddleware(),
  RequestValidationMiddleware(UpdateAdminPasswordValidator),
  updateAdminPassword
);
adminRouter.patch("/:id/status", AuthorizationMiddleware(), AdminStatus);
export default adminRouter;
