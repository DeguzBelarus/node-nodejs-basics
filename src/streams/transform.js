import {
  Transform,
  pipeline
} from 'stream';

const transform = async () => {
  const readableStream = process.stdin;
  const writeableStream = process.stdout;

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      chunk.toString().trim() === 'exit' && process.exit(0);
      console.log('Enter your text (or type "exit"): ');
      this.push(chunk.toString().trim().split('').reverse().join('') + '\n');
      callback();
    },
  });

  console.log('Enter your text (or type "exit"): ');
  pipeline(readableStream, transformStream, writeableStream, (error) => {
    console.error(error);
  })
};

await transform();