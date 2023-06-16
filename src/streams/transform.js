import {
  Transform,
  pipeline
} from 'stream';

const transform = async () => {
  const readableStream = process.stdin;
  const writeableStream = process.stdout;

  const transformStream = new Transform({
    transform(chunk, _, callback) {
      chunk.toString().trim() === 'exit' && process.exit(0);
      this.push(chunk.toString().trim().split('').reverse().join('') + '\n');
      callback();
    },
  });

  console.log('Enter your text (or type "exit"): ');
  pipeline(readableStream, transformStream, writeableStream, (error) => {
    console.error(error);
    process.exit(1);
  })
};

await transform();