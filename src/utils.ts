import { convertCP437toUTF8 } from './characterEncodings';
import { Message, MessageType } from './message';
import { Moment } from 'moment';
import os from 'os';

export function valueMatches(match: any): (entry: [string, any]) => boolean {
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

export enum SupportedPlatform {
  Windows = 'windows',
  MacOS = 'macos',
  Linux = 'linux'
}

export function getPlatform(): SupportedPlatform {
  switch (os.platform()) {
    case 'win32': return SupportedPlatform.Windows;
    case 'darwin': return SupportedPlatform.MacOS;
    default: return SupportedPlatform.Linux;
  }
}
