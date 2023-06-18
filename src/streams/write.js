import {
  WriteStream
} from 'fs';
import {
  dirname,
  join
} from 'path';
import {
  fileURLToPath
} from 'url';
import {
  createInterface
} from 'node:readline/promises';

const write = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = new WriteStream(fileToWritePath);
  openReadLine(true);

  async function openReadLine(isFirstInvoke) {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const text = await readline.question(isFirstInvoke ?
      'Enter your text (or type "exit"): ' :
      'Enter your text again: ');
    text === 'exit' && process.exit(0);
    writeStream.write(isFirstInvoke ? `${text}` : `\n${text}`)
    readline.close();
    openReadLine(false);
  }
};

await write();