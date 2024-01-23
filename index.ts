import { cron } from './lib/cron';
import { init as initBot } from './lib/bot';

console.log('Starting an Ayn Rand bot');

const run = async () => {
  initBot();
  cron.start();
};

run();
