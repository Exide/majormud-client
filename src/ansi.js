import ASCII from './ascii';

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
  CursorPosition: ASCII.UppercaseH,
  EraseDisplay: ASCII.UppercaseJ,
  SelectGraphicRendition: ASCII.LowercaseM
};

const UNKNOWN_BYTE = '?';

export const parse = (input) => {

  if (input.type !== 'raw') return input;

  let isParsingANSISequence = false;
  let output = [];
  let sequence = [];

  // console.log('ansi parsing:', input);

  while (input.bytes.length !== 0) {
    let byte = input.bytes[0];
    input.bytes = input.bytes.slice(1);

    if (isParsingANSISequence) {
      sequence.push(byte);

      if (isSequenceTerminator(byte)) {
        isParsingANSISequence = false;
        // console.log('ANSI sequence:', convertToNames(sequence), convertToString(sequence), sequence);
        let message = {type: 'ansi', bytes: Buffer.from(sequence)};
        output.push(message);
        sequence = [];
      }

    } else {

      if (byte === ASCII.Escape) {
        isParsingANSISequence = true;

        if (sequence.length !== 0) {
          let message = {type: 'raw', bytes: Buffer.from(sequence)};
          output.push(message);
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
