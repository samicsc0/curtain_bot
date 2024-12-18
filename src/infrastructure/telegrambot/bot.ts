import { Bot } from "grammy";
import envConfig from "../../shared/env";
import { staticRes } from "./staticres";
import {
  generateCurtainMessage,
  generateErrorMessage,
  getAll,
  getCurtainById,
} from "./services";

const telegramBot = new Bot(envConfig.TELEGRAM_BOT as string);

// Handle the "/start" command
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
            {
              text: "🟪 All",
              callback_data: "all_curtains_1",
            },
            { text: "🟩 View Flat Curtains", callback_data: "flat_curtains_1" },
            {
              text: "🟦 View Patterned Curtains",
              callback_data: "patterned_curtains_1",
            },
          ],
        ],
      },
      parse_mode: "Markdown",
    });
  }
});

telegramBot.on("callback_query", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  if (callbackData === "start") {
    await ctx.reply(staticRes.start, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🟪 All", callback_data: "all_curtains_1" },
            {
              text: "🟩 View Flat Curtains",
              callback_data: "flat_curtains_1",
            },
            {
              text: "🟦 View Patterned Curtains",
              callback_data: "patterned_curtains_1",
            },
          ],
        ],
      },
      parse_mode: "Markdown",
    });
    return;
  }
  if (callbackData?.includes("all_curtains")) {
    const arrayOfcmds = callbackData.split("_");
    const page = parseInt(arrayOfcmds[2]);
    await ctx.answerCallbackQuery();
    const curtains = await getAll(page, "");
    if (curtains.length) {
       curtains.map(async (curtainItem) => {
        await ctx.reply(generateCurtainMessage(curtainItem), {
          parse_mode: "Markdown",
        });
      });
      await ctx.reply("📲 NAVIGATE TO", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "⏮ Prev",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page === 1 ? page : page - 1}`,
              },
              {
                text: " Next⏭",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page + 1}`,
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      });
    } else {
      return ctx.reply(generateErrorMessage("Empty"), {
        reply_markup: {
          inline_keyboard: [[{ text: "🏠 Main Menu", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
      });
    }
  } else if (callbackData?.includes("patterned_curtains")) {
    const arrayOfcmds = callbackData.split("_");
    const page = parseInt(arrayOfcmds[2]);
    await ctx.answerCallbackQuery();
    const curtains = await getAll(page, "Patterned");
    if (curtains.length) {
      curtains.map(async (curtainItem) => {
        await ctx.reply(generateCurtainMessage(curtainItem), {
          parse_mode: "Markdown",
        });
      });
      await ctx.reply("📲 NAVIGATE TO", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "⏮ Prev",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page === 1 ? page : page - 1}`,
              },
              {
                text: " Next⏭",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page + 1}`,
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      });
    } else {
      return ctx.reply(generateErrorMessage("Empty"), {
        reply_markup: {
          inline_keyboard: [[{ text: "🏠 Main Menu", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
      });
    }
  } else if (callbackData?.includes("flat_curtains")) {
    const arrayOfcmds = callbackData.split("_");
    const page = parseInt(arrayOfcmds[2]);
    await ctx.answerCallbackQuery();
    const curtains = await getAll(page, "Flat");
    if (curtains.length) {
      curtains.map(async (curtainItem) => {
        await ctx.reply(generateCurtainMessage(curtainItem), {
          parse_mode: "Markdown",
        });
      });
      await ctx.reply("📲 NAVIGATE TO", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "⏮ Prev",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page === 1 ? page : page - 1}`,
              },
              {
                text: " Next⏭",
                callback_data: `${arrayOfcmds[0]}_${arrayOfcmds[1]}_${page + 1}`,
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      });
    } else {
      return ctx.reply(generateErrorMessage("Empty"), {
        reply_markup: {
          inline_keyboard: [[{ text: "🏠 Main Menu", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
      });
    }
  }
});

// Start the bot
console.log("telegram bot started");
export default telegramBot;
