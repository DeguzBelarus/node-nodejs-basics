import fs from 'fs';
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const rename = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const wrongFilepath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const properFilepath = path.join(__dirname, 'files', 'properFilename.txt');

  fs.access(wrongFilepath, (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      fs.access(properFilepath, (error) => {
        if (!error) {
          throw new Error('FS operation failed');
        } else {
          fs.rename(wrongFilepath, properFilepath, (error) => {
            if (error) {
              console.error(error.message);
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