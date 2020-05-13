import { Message, MessageType } from './message';
import { buildRawMessage, valueMatches } from './utils';
import { Moment } from 'moment';
import UTF from './utf';

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

export function parseRawMessage(input: Message): Message[] {
  if (input.type !== MessageType.Raw) return [ input ];

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
        output.push(buildTelnetMessage(sequence, input.timestamp));
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
          output.push(buildRawMessage(sequence, input.timestamp));
          sequence = [];
        }
      }

      sequence.push(byte);
    }
  }

  if (sequence.length !== 0) {
    if (isParsingTelnetSequence) {
      output.push(buildTelnetMessage(sequence, input.timestamp));
    } else {
      output.push(buildRawMessage(sequence, input.timestamp));
    }

  }

  return output;
}

function buildTelnetMessage(sequence: number[], timestamp: Moment): Message {
  const buffer = Buffer.from(sequence);
  return {
    timestamp,
    type: MessageType.Telnet,
    bytes: buffer,
    string: buffer.toString(),
    parsed: sequence.map(getCommandByCode)
  }
}

function getCommandByCode(code): String {
  const commandEntry = Object.entries(Command).find(valueMatches(code));
  if (commandEntry) {
    const [ command ] = commandEntry;
    return command;
  }

  const optionEntry = Object.entries(Option).find(valueMatches(code));
  if (optionEntry) {
    const [ option ] = optionEntry;
    return option;
  }

  return UTF.WhiteSquare.bytes.toString();
}
