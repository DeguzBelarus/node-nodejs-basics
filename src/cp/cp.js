import {
  spawn
} from 'node:child_process';
import {
  dirname,
  join
} from 'path';
import {
  fileURLToPath
} from 'url';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(
    import.meta.url);
  const __dirname = dirname(__filename);

  const childProcess = spawn('node', [join(__dirname, 'files', 'script.js'), ...args]);

  childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    childProcess.stdin.write('CLOSE');
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

spawnChildProcess(['hello', 'world!']);