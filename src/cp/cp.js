import { spawn } from 'node:child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

  const script = spawn('node', [path.join(__dirname, 'files', 'script.js'), ...args]);

  script.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    script.stdin.write('CLOSE');
  });

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

spawnChildProcess(['hello', 'world!']);
