import { Bot } from "grammy";
import envConfig from "../../shared/env";
import { staticRes } from "./staticres";
import {
  generateCurtainMessage,
  generateErrorMessage,
  getCurtainById,
} from "./services";
const telegramBot = new Bot(envConfig.TELEGRAM_BOT as string);
telegramBot.command("start", async (ctx) => {
  const match = ctx.match;
  if (match) {
    getCurtainById(`${match}`).then((curtain) => {
      if (typeof curtain !== "string") {
        return ctx
          .reply(generateCurtainMessage(curtain), {
            parse_mode: "Markdown",
          })
          .catch((error) => {
            return ctx.reply(generateErrorMessage(error), {
              parse_mode: "Markdown",
            });
          });
      } else {
        return ctx.reply(generateErrorMessage("Curtain not found"), {
          parse_mode: "Markdown",
        });
      }
    });
  } else {
    ctx.reply(staticRes.start, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🟩 View Flat Curtains", callback_data: "flat_curtains" },
            {
              text: "🟦 View Patterned Curtains",
              callback_data: "patterned_curtains",
            },
            {
              text: "🟪 All",
              callback_data: "all",
            },
          ],
        ],
      },
      parse_mode: "Markdown",
    });
  }
});

telegramBot.start();
console.log("telegram bot started");
export default telegramBot;
