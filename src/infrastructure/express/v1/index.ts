import { Router } from "express";
import { adminRouter, curtainRouter } from "./routes";
const v1Router = Router();
v1Router.use("/admin", adminRouter);
v1Router.use("/curtain", curtainRouter);
export default v1Router;
