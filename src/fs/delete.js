import {
  access,
  unlink
} from 'fs';
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const remove = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToDeletePath = path.join(__dirname, 'files', 'fileToRemove.txt');

  access(fileToDeletePath, (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      unlink(fileToDeletePath, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('The fileToRemove.txt file was successfully removed!');
        }
      })
    }
  })
};

await remove();