import { Router } from "express";
import {
  adminRouter,
  curtainRouter,
  colorRoutes,
  visitorRoutes,
} from "./routes";

const v1Router = Router();
v1Router.use("/admin", adminRouter);
v1Router.use("/curtain", curtainRouter);
v1Router.use("/color", colorRoutes);
v1Router.use("/visitor", visitorRoutes);
export default v1Router;
