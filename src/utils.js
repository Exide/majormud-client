import * as ascii from './ascii';

export function valueMatches(match) {
  return ([ /*skip*/, value ]) => value === match;
}

export function buildRawMessage(bytes) {
  return {
    type: 'raw',
    bytes: Buffer.from(bytes),
    parsed: bytes.map(ascii.getCharacter).join('')
  }
}
