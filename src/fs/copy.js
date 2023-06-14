import fs from 'fs';
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
import {
  readdir
} from "fs/promises";

const copy = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const filesDirPath = path.join(__dirname, 'files');
  const filesCopyDirPath = path.join(__dirname, 'files_copy');

  fs.access(filesDirPath, error => {
    if (error) {
      throw new Error('FS operation failed ');
    }
  })
  fs.access(filesCopyDirPath, error => {
    if (!error) {
      throw new Error('FS operation failed ');
    }
  })

  fs.mkdir(filesCopyDirPath, {
    recursive: true
  }, async (error) => {
    console.log("Creating a folder files_copy...");
    if (error) {
      console.error(error.message);
    } else {
      console.log("The files_copy folder has been created!");

      const files = await readdir(filesDirPath, {
        withFileTypes: true,
      });

      if (files.length) {
        for (const file of files) {
          console.log(`Copying the ${file.name} file...`);
          fs.copyFile(path.join(filesDirPath, file.name), path.join(filesCopyDirPath, file.name), (error) => {
            if (error) {
              console.error(error.message);
            }
          })
        }
        console.log('All files have been copied!');
      } else {
        console.log('The files folder is empty');
      }
    }
  });
};

await copy();