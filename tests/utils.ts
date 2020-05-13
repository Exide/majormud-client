import { readFileSync } from 'fs';
import { getCharacter } from '../src/ascii';
import UTF from '../src/utf';

export function loadBytesFixture(path: string) {
  const input = readFileSync(path);
  return input.toString()
    .split('\n')
    .map(s => parseInt(s, 10))
    .map(b => {
      const character = getCharacter(b);
      return character ? character.display : UTF.WhiteSquare.bytes.toString();
    })
    .join('');
}
