import {
  access,
  readFile
} from 'fs';
import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
import {
  createHash
} from 'crypto';

const calculateHash = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const algorithm = 'sha256';
  const fileToEncryptPath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  access(fileToEncryptPath, (error) => {
    if (error) {
      throw new Error("The fileToCalculateHashFor.txt file was not found");
    } else {
      readFile(fileToEncryptPath, (error, data) => {
        if (error) {
          console.error(error);
        }
        if (data) {
          const hashSum = createHash(algorithm);
          hashSum.update(data);
          const hex = hashSum.digest('hex');
          console.log('hash: ', hex);
        }
      });
    }
  })
};

await calculateHash();