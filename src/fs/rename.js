import fs, {
  access,
} from 'fs';
import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const rename = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const wrongFilepath = join(__dirname, 'files', 'wrongFilename.txt');
  const properFilepath = join(__dirname, 'files', 'properFilename.txt');

  access(wrongFilepath, (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      access(properFilepath, (error) => {
        if (!error) {
          throw new Error('FS operation failed');
        } else {
          fs.rename(wrongFilepath, properFilepath, (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log('The wrongFilename.txt was successfully renamed to properFilename.txt!');
            }
          })
        }
      })
    }
  })
};

await rename();