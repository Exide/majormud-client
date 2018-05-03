import {keyCodes} from './ascii';

export const Code = {
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
  CursorPosition: keyCodes.UppercaseH,
  EraseDisplay: keyCodes.UppercaseJ,
  SelectGraphicRendition: keyCodes.LowercaseM
};

const UNKNOWN_BYTE = '?';

export const parse = (input) => {

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
        output.push({type: 'ansi', bytes: Buffer.from(sequence)});
        sequence = [];
      }

    } else {

      if (byte === keyCodes.Escape) {
        isParsingANSISequence = true;

        if (sequence.length !== 0) {
          output.push({type: 'raw', bytes: Buffer.from(sequence)});
          sequence = [];
        }
      }

      sequence.push(byte);
    }
  }

  if (sequence.length !== 0) {
    if (isParsingANSISequence) {
      output.push({type: 'ansi', bytes: Buffer.from(sequence)});
    } else {
      output.push({type: 'raw', bytes: Buffer.from(sequence)});
    }
  }

  return output;
};

const isSequenceTerminator = (byte) => {
  return Object.values(Command).includes(byte);
};

export const convertToString = (buffer) => {
  return [...buffer]
    .map(number => number === 27 ? '^' : String.fromCharCode(number))
    .join('');
};

export const convertToNames = (buffer) => {
  return convertToString(buffer)
    .slice(2, -1)
    .split(';')
    .map(codeAsString => Number(codeAsString))
    .map(codeAsNumber => getCodeName(codeAsNumber));
};

const getCodeName = (code) => {
  if (typeof code !== 'number') code = Number(code);
  let entries = Object.entries(Code).filter(([key, value]) => code === value);
  let entry = entries[0] || UNKNOWN_BYTE;
  return entry[0] || UNKNOWN_BYTE;
};
