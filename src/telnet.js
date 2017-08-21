import ASCII from './ascii';

const Telnet = {
  SubnegotiationEnd: 240,
  NoOperation: 241,
  DataMark: 242,
  Break: 243,
  InterruptProcess: 244,
  AbortOutput: 245,
  AreYouThere: 246,
  EraseCharacter: 247,
  EraseLine: 248,
  GoAhead: 249,
  SubnegotiationBegin: 250,
  Will: 251,
  Wont: 252,
  Do: 253,
  Dont: 254,
  InterpretAsCommand: 255
};

const Option = {
  Echo: 1,
  SuppressGoAhead: 3
};

/**
 * Reads through a byte array looking for Telnet commands, removing them.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export const parse = (buffer) => {

  let isParsingTelnetSequence = false;
  let isNegotiatingOption = false;

  if (buffer === undefined)
    throw new TypeError('buffer cannot be undefined');

  console.log('Telnet parse:', buffer);

  let output = [];
  let sequence = [];

  while (buffer.length !== 0) {
    let byte = buffer[0];
    buffer = buffer.slice(1);

    if (isParsingTelnetSequence) {
      sequence.push(byte);

      let previousByte = sequence[sequence.length - 1];

      if (isNegotiatingOption) {
        isParsingTelnetSequence = false;
        console.log('Telnet sequence:', sequence);
        sequence = [];
      } else {
        isNegotiatingOption = (byte === Telnet.Will || byte === Telnet.Do);
      }

    } else {
      
      if (byte === Telnet.InterpretAsCommand) {
        isParsingTelnetSequence = true;
        sequence.push(byte);
      } else {
        output.push(byte);
      }
    }
  }

  return Buffer.from(output);
};
