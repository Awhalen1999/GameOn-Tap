import { readFileSync } from 'fs';

console.log('Generating .env file');

const file = readFileSync('secrets.txt', { encoding: 'utf-8' });

console.log(JSON.stringify(file));
