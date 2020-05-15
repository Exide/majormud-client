import { convertCP437toUTF8 } from './ascii';
import { Message, MessageType } from './message';
import { Moment } from 'moment';

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
      .map(convertCP437toUTF8)
      .join('')
  };
}
