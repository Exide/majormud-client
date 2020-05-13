import { getCharacter } from './ascii';
import { Message, MessageType } from './message';
import { Moment } from 'moment';
import UTF from './utf';

export function valueMatches(match) {
  return ([ /*skip*/, value ]) => value === match;
}

export function buildRawMessage(bytes: number[], timestamp: Moment): Message {
  const buffer = Buffer.from(bytes);
  return {
    timestamp,
    type: MessageType.Raw,
    bytes: buffer,
    string: buffer.toString(),
    parsed: bytes
      .map(b => {
        const character = getCharacter(b);
        return character ? character.display : UTF.WhiteSquare.bytes.toString();
      })
      .join('')
  };
}
