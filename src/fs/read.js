import {
  readFile,
  access
} from 'fs';
import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const read = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

  access(fileToReadPath, (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      readFile(fileToReadPath, {
        encoding: 'utf-8'
      }, (error, data) => {
        if (error) {
          console.error(error);
        }
        if (data) {
          console.log(data);
        }
      })
    }
  })
};

await read();