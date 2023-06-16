import {
  Worker,
  isMainThread,
} from 'node:worker_threads';
import {
  cpus
} from 'os';
import {
  dirname,
  join,
} from 'path';
import {
  fileURLToPath
} from 'url';

const performCalculations = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const workersFilePath = join(__dirname, 'worker.js');
  const coresAmount = cpus().length;
  const baseValue = 10;
  const positiveResultType = 'resolved';
  const negativeResultType = 'error';
  const resultsArray = [];

  class WorkerResult {
    constructor(status, data) {
      this.status = status;
      this.data = data;
    };
  }

  const completionChecker = (resultsAmount) => {
    if (resultsAmount === coresAmount) {
      console.log('All workers finished, your result: ', resultsArray);
      process.exit(0);
    }
  };

  if (isMainThread) {
    for (let i = 0; i < coresAmount; i++) {
      const workerData = baseValue + i;
      const worker = new Worker(workersFilePath, { workerData });

      worker.on('message', (data) => {
        resultsArray.push(new WorkerResult(positiveResultType, data));
        completionChecker(resultsArray.length);
      })
      worker.on('error', () => {
        resultsArray.push(new WorkerResult(negativeResultType, null));
        completionChecker(resultsArray.length);
      })
    }
  }
};

await performCalculations();