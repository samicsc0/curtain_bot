import { startServer } from "./infrastructure/express";
import { telegramBot } from "./infrastructure/telegrambot";
startServer();
telegramBot.start()