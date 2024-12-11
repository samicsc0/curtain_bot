require("dotenv").config();
import { envConfig as devConfig } from "./development";
import { envConfig as prodConfig } from "./production";

const env = process.env.NODE_ENV;
const envConfig = env === "dev" ? devConfig : prodConfig;
export default envConfig;
