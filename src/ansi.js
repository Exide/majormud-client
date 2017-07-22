const ASCII_ESCAPE = 27;

/**
 * Reads through a byte array looking for ANSI terminal commands.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export const parse = (buffer) => {
  if (buffer === undefined)
    throw new TypeError('buffer cannot be undefined');

  console.log('buffer:', buffer);

  for (let i = 0; i < buffer.length; ++i) {
    let isEscape = buffer[i] === ASCII_ESCAPE;
    let remainingBytes = buffer.length - (i + 1);
    let hasRoom = remainingBytes >= 2;
    if (isEscape && hasRoom) {
      let iac = buffer[i];
      let command = buffer[i+1];
      let option = buffer[i+2];
      buffer = buffer.slice(3);
      console.log('ANSI command received:', iac, command, option);
    }
  }

  return buffer;
};
