import { access, mkdir, copyFile } from 'fs';
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

const copy = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const filesDirPath = join(__dirname, 'files');
  const filesCopyDirPath = join(__dirname, 'files_copy');

  access(filesDirPath, (error) => {
    if (error) {
      throw new Error('FS operation failed');
    } else {
      access(filesCopyDirPath, (error) => {
        if (!error) {
          throw new Error('FS operation failed');
        } else {
          mkdir(filesCopyDirPath, {
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
                  copyFile(join(filesDirPath, file.name), join(filesCopyDirPath, file.name), (error) => {
                    if (error) {
                      console.error(error);
                    }
                  })
                }
                console.log('All files have been copied!');
              } else {
                console.log('The files folder is empty');
              }
            }
          });
        }
      })
    }
  })
};

await copy();