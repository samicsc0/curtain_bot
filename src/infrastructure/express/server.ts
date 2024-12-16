import express from "express";
import v1Router from "./v1";
import { GlobalErrorHandlerMiddleware } from "./middlewares";
import envConfig from "../../shared/env";
const cors = require("cors");
function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1", v1Router);
  app.use(GlobalErrorHandlerMiddleware);

  const PORT = envConfig.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export { startServer };
