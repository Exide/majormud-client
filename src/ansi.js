const ASCII = {
  Escape: 27,
  LeftBracket: 91,
  LowercaseM: 109
};

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
 * Reads through a byte array looking for ANSI terminal commands.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export const parse = (buffer) => {

  let isParsingANSISequence = false;

  if (buffer === undefined)
    throw new TypeError('buffer cannot be undefined');

  console.log('buffer:', buffer);

  let output = [];
  let sequence = [];

  while (buffer.length !== 0) {
    let byte = buffer[0];
    buffer = buffer.slice(1);

    if (isParsingANSISequence) {
      sequence.push(byte);

      if (byte === ASCII.LowercaseM) {
        isParsingANSISequence = false;
        console.log('ANSI sequence:', sequence);
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
