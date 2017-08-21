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

/**
 * Reads through a byte array looking for ANSI terminal commands, removing them.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export const parse = (buffer) => {

  let isParsingANSISequence = false;

  if (buffer === undefined)
    throw new TypeError('buffer cannot be undefined');

  let output = [];
  let sequence = [];

  while (buffer.length !== 0) {
    let byte = buffer[0];
    buffer = buffer.slice(1);

    if (isParsingANSISequence) {
      sequence.push(byte);

      if (isSequenceTerminator(byte)) {
        isParsingANSISequence = false;
        console.log('ANSI sequence:', convertToNames(sequence), convertToString(sequence), sequence);
        sequence = [];
      }
    } else {

      if (byte === ASCII.Escape) {
        isParsingANSISequence = true;
        sequence.push(byte);
      } else {
        output.push(byte);
      }
    }
  }

  return Buffer.from(output);
};

const isSequenceTerminator = (byte) => {
  return Object.values(Command).includes(byte);
};

const convertToString = (sequence) => {
  return sequence
    .map(byte => byte === 27 ? '^' : String.fromCharCode(byte))
    .join('');
};

const convertToNames = (sequence) => {
  return convertToString(sequence)
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
