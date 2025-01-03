import {
  Bot,
  session,
  Context,
  SessionFlavor,
  GrammyError,
  HttpError,
} from "grammy";
import envConfig from "../../shared/env";
import { staticRes } from "./staticres";
import {
  generateCurtainMessage,
  generateErrorMessage,
  generateInitialSession,
  getAllColors,
  getAll,
  resgisterVisit,
  getCurtainById,
} from "./services";
import { SessionData } from "./types";

type MyContext = Context & SessionFlavor<SessionData>;
const telegramBot = new Bot<MyContext>(envConfig.TELEGRAM_BOT as string);

// Use session middleware
telegramBot.use(session({ initial: generateInitialSession }));

telegramBot.command("start", async (ctx) => {
  ctx.session = { page: 1, color: "", style: "" };

  // Register visitor
  await resgisterVisit(ctx.from?.id + "");

  const match = ctx.match;
  if (match) {
    const curtain = await getCurtainById(`${match}`);
    if (typeof curtain !== "string") {
      return ctx
        .reply(generateCurtainMessage(curtain), {
          parse_mode: "Markdown",
        })
        .catch((error) =>
          ctx.reply(generateErrorMessage(error), {
            parse_mode: "Markdown",
          })
        );
    } else {
      return ctx.reply(generateErrorMessage("Curtain not found"), {
        parse_mode: "Markdown",
      });
    }
  } else {
    ctx.reply(staticRes.start, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "View Flat Curtains", callback_data: "flat_curtains" },
            {
              text: "View Patterned Curtains",
              callback_data: "patterned_curtains",
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
  const colors = await getAllColors();

  if (callbackData === "flat_curtains") {
    ctx.session.style = "Flat";
    await ctx.reply("Choose the color you want", {
      reply_markup: {
        inline_keyboard: colors.map((item) => [
          { text: item.color_name, callback_data: `color_${item.color_id}` },
        ]),
      },
      parse_mode: "Markdown",
    });
  } else if (callbackData === "patterned_curtains") {
    ctx.session.style = "Patterned";
    await ctx.reply("Choose the color you want", {
      reply_markup: {
        inline_keyboard: colors.map((item) => [
          { text: item.color_name, callback_data: `color_${item.color_id}` },
        ]),
      },
      parse_mode: "Markdown",
    });
  } else if (callbackData?.startsWith("color_")) {
    const selectedColor = callbackData.split("_")[1];
    ctx.session.color = selectedColor;
    const curtains = await getAll(
      ctx.session.page,
      ctx.session.style,
      ctx.session.color
    );
    // Handle EMPTY RESPONSE
    if (curtains.length === 0) {
      ctx.session.page = 1; //
      return ctx.reply("No curtains available.");
    } else {
      const curtainMessages = curtains.map((item) =>
        generateCurtainMessage(item)
      );
      for (const message of curtainMessages) {
        await ctx.reply(message, { parse_mode: "Markdown" });
      }
      await ctx.reply("Use the buttons below to navigate:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "👈 Previous Page", callback_data: "prev_page" },
              { text: "🔄 Restart Bot", callback_data: "start" },
              { text: "Next Page 👉", callback_data: "next_page" },
            ],
          ],
        },
      });
    }
  } else if (callbackData === "prev_page") {
    if (ctx.session.page === 1) {
      ctx.session.page = 1;
    } else {
      ctx.session.page -= 1;
    }
    const curtains = await getAll(
      ctx.session.page,
      ctx.session.style,
      ctx.session.color
    );
    // Handle EMPTY RESPONSE
    if (curtains.length === 0) {
      ctx.session.page = 1; //
      return ctx.reply("No curtains available.");
    } else {
      const curtainMessages = curtains.map((item) =>
        generateCurtainMessage(item)
      );
      for (const message of curtainMessages) {
        await ctx.reply(message, { parse_mode: "Markdown" });
      }
      await ctx.reply("Use the buttons below to navigate:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "👈 Previous Page", callback_data: "prev_page" },
              { text: "🔄 Restart Bot", callback_data: "start" },
              { text: "Next Page 👉", callback_data: "next_page" },
            ],
          ],
        },
      });
    }
  } else if (callbackData === "next_page") {
    ctx.session.page += 1;
    const curtains = await getAll(
      ctx.session.page,
      ctx.session.style,
      ctx.session.color
    );
    // Handle EMPTY RESPONSE
    if (curtains.length === 0) {
      ctx.session.page = 1; //
      return ctx.reply("No curtains available.");
    } else {
      const curtainMessages = curtains.map((item) =>
        generateCurtainMessage(item)
      );
      for (const message of curtainMessages) {
        await ctx.reply(message, { parse_mode: "Markdown" });
      }
      await ctx.reply("Use the buttons below to navigate:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "👈 Previous Page", callback_data: "prev_page" },
              { text: "🔄 Restart Bot", callback_data: "start" },
              { text: "Next Page 👉", callback_data: "next_page" },
            ],
          ],
        },
      });
    }
  } else if (callbackData === "start") {
    await telegramBot.api.sendMessage(ctx.chat?.id + "", "/start");
  }
});
telegramBot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request");
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Start the bot
console.log("Telegram bot started");
export default telegramBot;
