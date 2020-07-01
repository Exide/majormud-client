import * as Telnet from './telnet';
import ansiParser from './ansi/parser';
import moment, { Moment } from 'moment';

export enum MessageType {
  Raw, Telnet, ANSI
}

export interface Message {
  timestamp: Moment;
  type: MessageType;
  bytes: Buffer;
  string: string;
  parsed?: any
}

export function parseByteStream(bytes: Buffer): Message[] {
  const initialMessage: Message = {
    timestamp: moment.utc(),
    type: MessageType.Raw,
    bytes: bytes,
    string: bytes.toString()
  };

  // each parser reduces the set of raw data so order of operation matters here.
  return [ initialMessage ]
    .flatMap(Telnet.parseRawMessage)
    .flatMap(ansiParser);
}
