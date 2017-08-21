const Command = {
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

const UNKNOWN_BYTE = '?';

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

      if (isNegotiatingOption) {
        isParsingTelnetSequence = false;
        isNegotiatingOption = false;

        console.log('Telnet sequence:', sequenceToString(sequence), sequence);
        sequence = [];
      } else {
        let isOptionOffer = byte === Command.Will;
        let isOptionRequest = byte === Command.Do;
        isNegotiatingOption = isOptionOffer || isOptionRequest;
      }

    } else {
      
      if (byte === Command.InterpretAsCommand) {
        isParsingTelnetSequence = true;
        sequence.push(byte);
      } else {
        output.push(byte);
      }
    }
  }

  return Buffer.from(output);
};

const sequenceToString = (sequence) => {
  if (sequence.length === 3 && isNegotiationCommand(sequence[1])) {
    let command = getCommandName(sequence[1]);
    let option = getOptionName(sequence[2]);
    return `IAC ${command} ${option}`;
  } else {
    return 'unknown sequence';
  }
};

const isNegotiationCommand = (byte) => {
  return byte >= 251 && byte <= 254;
};

const getCommandName = (byte) => {
  let entries = Object.entries(Command).filter(([name, code]) => byte === code);
  let entry = entries[0] || UNKNOWN_BYTE;
  return entry[0] || UNKNOWN_BYTE;
};

const getOptionName = (byte) => {
  let entries = Object.entries(Option).filter(([name, code]) => byte === code);
  let entry = entries[0] || UNKNOWN_BYTE;
  return entry[0] || UNKNOWN_BYTE;
};
