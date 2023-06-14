import fs from 'fs';
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
import crypto from 'crypto';

const calculateHash = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const algorithm = 'sha256';
  const fileToEncryptPath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  fs.access(fileToEncryptPath, (error) => {
    if (error) {
      throw new Error("The fileToCalculateHashFor.txt file was not found");
    } else {
      fs.readFile(fileToEncryptPath, (error, data) => {
        if (error) {
          console.error(error);
        }
        if (data) {
          const hashSum = crypto.createHash(algorithm);
          hashSum.update(data);
          const hex = hashSum.digest('hex');
          console.log('hash: ', hex);
        }
      })
    }
  })
};

await calculateHash();