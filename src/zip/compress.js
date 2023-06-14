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
} from 'fs';
import path, {
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
  const fileToZipPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const zippedFilePath = path.join(__dirname, 'files', 'archive.gz');

  access(fileToZipPath, (error) => {
    if (error) {
      throw new Error("The fileToCompress.txt file was not found");
    } else {
      const sourceStream = createReadStream(fileToZipPath);
      const destinationStream = createWriteStream(zippedFilePath);

      pipeline(sourceStream, gzip, destinationStream, (error) => {
        if (error) {
          console.error(error);
          process.exit(1);
        }
      });
    }
  })

};

await compress();