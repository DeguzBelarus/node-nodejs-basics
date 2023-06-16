import {
  access
} from 'fs';
import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
import {
  readdir
} from "fs/promises";

const list = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const filesDirPath = join(__dirname, 'files');

  access(filesDirPath, async (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      const files = await readdir(filesDirPath, {
        withFileTypes: true,
      });

      if (files.length) {
        console.log('The files folder content: ', files.map((file) => file.name));
      } else {
        console.log('The files folder is empty');
      }
    }
  })
};

await list();