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
  readStream.on('open', () => {
    console.log('The fileToRead.txt file was found, start reading...');
  });
  readStream.on('ready', () => {
    console.log("The fileToRead.txt file was read, thank you for waiting!");
  });
  readStream.on('data', (data) => {
    process.stdout.write(`fileToRead.txt content: ${data.toString()}`);
  });
  readStream.on('end', () => {
    console.log('\nGood bye...');
  });
  readStream.on('error', (error) => {
    console.error(error);
  });
};

await read();