import fs from 'fs';
import path, {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const create = async () => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const textContent = 'I am fresh and young';
  const fileName = 'fresh.txt';
  const filePath = path.join(__dirname, fileName)

  fs.writeFile(filePath, textContent, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log(`The ${fileName} file was successfully created and updated!`);
  });
};

await create();