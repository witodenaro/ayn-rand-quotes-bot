import { CronJob } from 'cron';
import { fetchNextImage } from './google-images';
import { sendImageToUsers } from './bot';
import { fetchNextQuote } from './quotes';

export const cron = new CronJob('0 0 15 * * *', async () => {
  const image = await fetchNextImage();
  const quote = await fetchNextQuote();
  await sendImageToUsers(image.url, quote);
});
