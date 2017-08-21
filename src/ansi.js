import ASCII from './ascii';

const ANSI = {
  Normal: 0,
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

  console.log('ANSI parse:', buffer);

  let output = [];
  let sequence = [];

  while (buffer.length !== 0) {
    let byte = buffer[0];
    buffer = buffer.slice(1);

    if (isParsingANSISequence) {
      sequence.push(byte);


      if (byte === ASCII.LowercaseM || byte === ASCII.UppercaseH || byte === ASCII.UppercaseJ) {
        isParsingANSISequence = false;
        console.log('ANSI sequence:', sequenceToString(sequence), sequence);
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

const sequenceToString = (byteArray) => {
  return byteArray
    .map(byte => byte === 27 ? '^' : String.fromCharCode(byte))
    .join('');
};
