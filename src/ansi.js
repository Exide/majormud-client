import * as ascii from './ascii';
import * as utils from './utils';

// https://en.wikipedia.org/wiki/Windows-1252

export const Encoding = {
  Reset: 0,
  Bold: 1,
  Blink: 5,
  ForegroundBlack: 30,
  ForegroundRed: 31,
  ForegroundGreen: 32,
  ForegroundYellow: 33,
  ForegroundBlue: 34,
  ForegroundMagenta: 35,
  ForegroundCyan: 36,
  ForegroundWhite: 37,
  ForegroundExtended: 38,
  ForegroundDefault: 39,
  BackgroundBlack: 40,
  BackgroundRed: 41,
  BackgroundGreen: 42,
  BackgroundYellow: 43,
  BackgroundBlue: 44,
  BackgroundMagenta: 45,
  BackgroundCyan: 46,
  BackgroundWhite: 47,
  BackgroundExtended: 48,
  BackgroundDefault: 49
};

export const Command = {
  CursorPosition: ascii.Encoding.H,
  EraseDisplay: ascii.Encoding.J,
  SelectGraphicRendition: ascii.Encoding.m
};

const UNKNOWN_VALUE = '?';

export function parse(input) {
  if (input.type !== 'raw') return input;

  let isParsingANSISequence = false;
  let output = [];
  let sequence = [];

  while (input.bytes.length !== 0) {
    let byte = input.bytes[0];
    input.bytes = input.bytes.slice(1);

    if (isParsingANSISequence) {
      sequence.push(byte);

      if (isSequenceTerminator(byte)) {
        isParsingANSISequence = false;
        output.push(buildANSIMessage(sequence));
        sequence = [];
      }

    } else {

      if (byte === ascii.Encoding.ESC) {
        isParsingANSISequence = true;

        if (sequence.length !== 0) {
          output.push(utils.buildRawMessage(sequence));
          sequence = [];
        }
      }

      sequence.push(byte);
    }
  }

  if (sequence.length !== 0) {
    if (isParsingANSISequence) {
      output.push(buildANSIMessage(sequence));
    } else {
      output.push(utils.buildRawMessage(sequence));
    }
  }

  return output;
}

function buildANSIMessage(sequence) {
  return {
    type: 'ansi',
    bytes: Buffer.from(sequence),
    parsed: sequence.map(getCommandByCode)
  }
}

function isSequenceTerminator(byte) {
  return Object.values(Command).includes(byte);
}

export function getCommandByCode(code) {
  const entry = Object.entries(Encoding).find(utils.valueMatches(code));
  if (!entry) return UNKNOWN_VALUE;

  const [ command ] = entry;
  return command;
}
