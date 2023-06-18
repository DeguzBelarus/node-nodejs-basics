import {
  createGzip
} from 'zlib';
import {
  pipeline
} from 'stream';
import {
  createReadStream,
  createWriteStream,
  access,
  unlink,
} from 'fs';
import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const compress = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const gzip = createGzip();
  const fileToZipPath = join(__dirname, 'files', 'fileToCompress.txt');
  const zippedFilePath = join(__dirname, 'files', 'archive.gz');

  access(zippedFilePath, (error) => {
    if (!error) {
      unlink(zippedFilePath, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('The archive.gz file was removed');
        }
      })
    }
  })

  access(fileToZipPath, (error) => {
    if (error) {
      throw new Error("The fileToCompress.txt file was not found");
    } else {
      const readableStreamStream = createReadStream(fileToZipPath);
      const writeableStreamStream = createWriteStream(zippedFilePath);

      pipeline(readableStreamStream, gzip, writeableStreamStream, (error) => {
        if (error) {
          console.error(error);
          process.exit(1);
        } else {
          console.log('The fileToCompress.txt file was successfully compressed');
        }
      });
    }
  })
};

await compress();