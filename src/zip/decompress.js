import {
  createUnzip
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
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const decompress = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const fileToUnzipPath = path.join(__dirname, 'files', 'archive.gz');
  const unzippedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  access(unzippedFilePath, (error) => {
    if (!error) {
      unlink(unzippedFilePath, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('The fileToCompress.txt file was removed');
        }
      })
    }
  })

  access(fileToUnzipPath, (error) => {
    if (error) {
      throw new Error('The archive.gz file was not found');
    } else {
      const unzip = createUnzip();
      const sourceStream = createReadStream(fileToUnzipPath);
      const destinationStream = createWriteStream(unzippedFilePath);

      pipeline(sourceStream, unzip, destinationStream, (error) => {
        if (error) {
          console.error(error);
          process.exit(1);
        } else {
          console.log('The archive.gz file was successfully decompressed');
        }
      });
    }
  })
};

await decompress();