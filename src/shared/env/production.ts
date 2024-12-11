require("dotenv").config;
export const envConfig = {
  NODE_ENV: "production",
  PORT: process.env.PORT,
  DATABASE_URL: "",
  JWT_SECRET: process.env.JWT_SECRET,
};
