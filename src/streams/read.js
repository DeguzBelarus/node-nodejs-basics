import {
  ReadStream
} from 'fs';
import {
  dirname,
  join,
} from 'path';
import {
  fileURLToPath
} from 'url';

const read = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt')
  const readStream = new ReadStream(fileToReadPath);

  readStream.on('data', (data) => {
    process.stdout.write(`fileToRead.txt content: ${data.toString()}`);
  });
  readStream.on('error', (error) => {
    console.error(error);
  });
};

await read();