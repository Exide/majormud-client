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
  BinaryTransmission: 0,
  Echo: 1,
  SuppressGoAhead: 3
};

const UNKNOWN_BYTE = '?';

export const parse = (input) => {

  if (input.type !== 'raw') return input;

  let isParsingTelnetSequence = false;
  let isNegotiatingOption = false;
  let output = [];
  let sequence = [];

  while (input.bytes.length !== 0) {
    let byte = input.bytes[0];
    input.bytes = input.bytes.slice(1);

    if (isParsingTelnetSequence) {
      sequence.push(byte);

      if (isNegotiatingOption) {
        isParsingTelnetSequence = false;
        isNegotiatingOption = false;
        output.push({type: 'telnet', bytes: Buffer.from(sequence)});
        sequence = [];
      } else {
        let isOptionOffer = byte === Command.Will;
        let isOptionRequest = byte === Command.Do;
        isNegotiatingOption = isOptionOffer || isOptionRequest;
      }

    } else {
      
      if (byte === Command.InterpretAsCommand) {
        isParsingTelnetSequence = true;

        if (sequence.length !== 0) {
          output.push({type: 'raw', bytes: Buffer.from(sequence)});
          sequence = [];
        }
      }

      sequence.push(byte);
    }
  }

  if (sequence.length !== 0) {
    if (isParsingTelnetSequence) {
      output.push({type: 'telnet', bytes: Buffer.from(sequence)});
    } else {
      output.push({type: 'raw', bytes: Buffer.from(sequence)});
    }

  }

  return output;
};

export const convertToNames = (buffer) => {
  if (buffer.length === 3 && isNegotiationCommand(buffer[1])) {
    return [
      getCommandName(buffer[0]),
      getCommandName(buffer[1]),
      getOptionName(buffer[2])
    ];
  } else {
    return buffer.map(byte => getCommandName(byte));
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
