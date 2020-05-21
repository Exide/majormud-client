import { readFileSync, writeFileSync } from 'fs';

const input = process.argv[2];
const output = `${input}.cp437`

console.info(`input: ${input}`);
console.info(`output: ${output}`);

const inputData = readFileSync(input)
  .toString()
  .replace(/\s/g, ' ')
  .trim()
  .split(' ')
  .map(s => parseInt(s, 10));

const outputData = Buffer.from(inputData);
writeFileSync(output, outputData);
