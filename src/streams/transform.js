import {
  Transform
} from 'stream';
import {
  ReadStream,
  WriteStream,
} from 'fs';
import {
  dirname,
  join,
} from 'path';
import {
  fileURLToPath
} from 'url';

const transform = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt')
  const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');
  const readStream = new ReadStream(fileToReadPath);
  const writeStream = new WriteStream(fileToWritePath);
  const transformStream = new Transform({
    transform(data, encoding, callback) {
      encoding = 'utf8';
      callback(null, data.toString().split('').reverse().join(''));
    },
  });
  transformStream.on('finish', () => {
    console.log('The text from the fileToRead.txt file was reversed');
  })
  writeStream.on('finish', () => {
    console.log('The fileToWrite.txt file was updated with the reversed text!');
  })

  readStream.pipe(transformStream).pipe(writeStream);
};

await transform();