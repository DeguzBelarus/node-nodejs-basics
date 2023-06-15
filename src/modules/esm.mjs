import {
  dirname,
  sep,
} from 'path';
import {
  release,
  version
} from 'os';
import {
  createServer as createServerHttp
} from 'http';
import {
  fileURLToPath
} from 'url';
import './files/c.js';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);
const random = Math.random();

const PORT = 3000;
let unknownObject;

const unknownObjectValueHandler = async (randomValue) => {
  const {
    default: data
  } = await import(`${randomValue > 0.5 ? './files/a.json' : './files/b.json'}`, {
    assert: {
      type: "json"
    }
  });
  return data;
};
unknownObject = await unknownObjectValueHandler(random);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);
console.log(unknownObject);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export {
  unknownObject,
  myServer,
}