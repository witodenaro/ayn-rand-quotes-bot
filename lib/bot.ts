import { Bot } from 'grammy';
import { getChatIds, saveChatId } from './repository/chat-ids';
import { fetchImage } from './google-images';
import { fetchQuote } from './quotes';

const { BOT_TOKEN } = Bun.env;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');

export const bot = new Bot(BOT_TOKEN);

export const sendImageToUsers = async (imageUrl: string, quote: string | null) => {
  const chatIdByUserId = await getChatIds();

  const chatIds = Object.values(chatIdByUserId);

  for (const chatId of chatIds) {
    bot.api.sendPhoto(chatId, imageUrl, { caption: quote || '' });
  }
};

export const init = async () => {
  console.log('Initializing bot');

  bot.command('start', async (ctx) => {
    const userIds = await getChatIds();

    if (!ctx.from) return ctx.reply('This chat is unsupported');

    const isSubscribed = userIds[ctx.from.id];

    if (isSubscribed) return ctx.reply('You are already subscribed!');

    await saveChatId(ctx.from.id, ctx.chat.id);

    const randomPage = Math.floor(Math.random() * 15);

    const randomPageIndex = Math.floor(Math.random() * 10);
    const randomQuoteIndex = Math.floor(Math.random() * 30);

    const image = await fetchImage(randomPage, randomPageIndex);
    const quote = await fetchQuote(randomPage, randomQuoteIndex);

    ctx.reply("You have subscribed! Here is a random Ayn Rand's picture for you.");
    ctx.replyWithPhoto(image.url, { caption: quote?.slice(0, 1023) || '' });
  });

  bot.command('random', async (ctx) => {
    const randomPage = Math.floor(Math.random() * 15);

    const randomPageIndex = Math.floor(Math.random() * 10);
    const randomQuoteIndex = Math.floor(Math.random() * 30);

    const image = await fetchImage(randomPage, randomPageIndex);
    const quote = await fetchQuote(randomPage, randomQuoteIndex);

    ctx.reply("Here is a random Ayn Rand's picture for you.");
    ctx.replyWithPhoto(image.url, { caption: quote?.slice(0, 1023) || '' });
  });

  bot.on('message', async (ctx) => {
    console.log(ctx);
    const userIds = await getChatIds();

    if (!ctx.from) return ctx.reply('This chat is unsupported');

    const isSubscribed = userIds[ctx.from.id];

    if (isSubscribed) return ctx.reply('You are subscribed!');

    ctx.reply('You are not subscribed. Text /start to subscribe.');
  });

  bot.start();
};
