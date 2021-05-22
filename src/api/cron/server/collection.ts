import { MongoCron } from 'mongodb-cron';
import { log } from '../../logs';
import { getCollection, getDatabase } from '../../utils/server/db';

type Cron = {
  type: string;
  sleepUntil: Date;
  interval: string;
};
export const getCronsCollection = () => {
  return getCollection<Cron>('crons');
};

export const ensureCronsIndexes = () => {
  log('Create crons indexes');
  return getCronsCollection().createIndexes([{ key: { type: 1 } }]);
};

type CronCallback = (doc: Cron) => void;
type CronHandlers = {
  [job: string]: CronCallback[];
};

const cronHandlers: CronHandlers = {};

export const runCrons = async () => {
  const db = getDatabase();

  const collection = db.collection('crons');
  const cron = new MongoCron({
    collection,
    onDocument: async (doc: Cron) => {
      cronHandlers[doc.type]?.forEach((cronHandler) => cronHandler(doc));
    },
    onError: console.error,
  });

  cron.start();
};

export const onCron = (job: string, callback: CronCallback) => {
  if (!cronHandlers[job]) {
    cronHandlers[job] = [];
  }
  cronHandlers[job].push(callback);
};

export const ensureCron = async (cron: Cron) => {
  const collection = getCronsCollection();

  if (!(await collection.findOne({ type: cron.type }))) {
    await collection.insertOne(cron);
  }
};
