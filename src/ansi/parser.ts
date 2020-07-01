import { Message, MessageType } from '../message';
import {CharactersByCP437, CharactersByName, convertCP437toUTF8String} from '../characterEncodings';
import { EscapeSequencesByC1, EscapeSequencesByName } from './escapeSequences';
import { ControlSequences, ControlSequencesByFinalByte } from './controlSequences';

export default function parse(input: Message): Message[] {
  if (input.type !== MessageType.Raw) return [input];

  let terminatorsToFind: number[] = [];
  let bufferedBytes: number[] = [];
  let output: Message[] = [];

  while (input.bytes.length > 0) {

    // capture the next byte
    const currentByte = input.bytes[0];

    // move the cursor forward
    input.bytes = input.bytes.slice(1);

    // const bufferContents = terminatorsToFind.length > 0 ? 'ansi' : 'raw';
    // const bufferedBytesAsString = Buffer.from(bufferedBytes).toString();
    // const currentByteAsString = Buffer.from([currentByte]).toString();
    // console.debug(`${bufferContents} "${bufferedBytesAsString}" \u21e6 "${currentByteAsString}" (${currentByte}) \u21e6 "${input.bytes}"`);

    if (terminatorsToFind.length < 1) {
      // not currently parsing an escape sequence

      if (currentByte === CharactersByName.Escape.cp437) {
        // we potentially have the start of a new escape sequence

        // capture the next byte
        const nextByte = input.bytes[0];

        // can we infer an escape sequence from these 2 bytes?
        const escapeSequence = EscapeSequencesByC1[nextByte];
        if (escapeSequence !== undefined) {
          // console.debug(`first two bytes of an escape sequence found: ${currentByte} ${nextByte}`);

          // package and output any bytes currently in the buffer
          if (bufferedBytes.length > 0) {
            const buffer = Buffer.from(bufferedBytes);
            // console.debug('packaging raw message:', buffer.toString());
            output.push({
              type: MessageType.Raw,
              timestamp: input.timestamp,
              bytes: buffer,
              string: bufferedBytes
                .map(convertCP437toUTF8String)
                .join('')
            });
          }

          // save both bytes to a new buffer
          bufferedBytes = [ currentByte, nextByte ];

          // move the cursor on the stream past the second byte
          input.bytes = input.bytes.slice(1);

          if (escapeSequence !== EscapeSequencesByName.ControlSequence) {
            // not a control sequence so just return the message
            const buffer = Buffer.from(bufferedBytes);
            output.push({
              type: MessageType.ANSI,
              timestamp: input.timestamp,
              bytes: buffer,
              string: buffer.toString(),
              parsed: [ escapeSequence.name ]
            });
          } else {
            // this is a control sequence so let's capture until we hit the final byte
            terminatorsToFind = ControlSequences.map(s => s.finalByte);
          }

          // go to the next byte in the stream
          continue;
        }
      }

      // we've got a non-interesting byte
      bufferedBytes.push(currentByte);

    } else {
      // we're parsing an escape sequence

      if (terminatorsToFind.includes(currentByte)) {
        // this is one of the terminators we're looking for
        // console.debug(`escape sequence terminator found: ${currentByte}`);

        // infer the escape sequence from the terminator
        const controlSequence = ControlSequencesByFinalByte[currentByte];
        if (controlSequence === undefined) throw new Error(`i think i have a known terminator (${currentByte}) but i can't find a corresponding escape sequence`);

        // add the terminator to the buffer
        bufferedBytes.push(currentByte);

        // package and output the sequence now that its terminated
        const buffer = Buffer.from(bufferedBytes);
        // console.debug('packaging ansi message:', buffer.toString());
        const parameters = Array.from(buffer.slice(2, -1));
        output.push({
          type: MessageType.ANSI,
          timestamp: input.timestamp,
          bytes: buffer,
          string: buffer.toString(),
          parsed: [ controlSequence.name, ...parameters ]
        });

        // stop looking for a terminator
        terminatorsToFind = [];

        // reset the buffer
        bufferedBytes = [];
      } else {
        // not a terminator so lets just buffer it
        bufferedBytes.push(currentByte);
      }
    }
  }

  if (bufferedBytes.length !== 0) {

    // we were still parsing a suspected escape sequence
    if (terminatorsToFind.length > 0) {
      // console.debug(`stream ended while attempting to parse an escape sequence`);
    }

    // the stream has ended but we have some bytes left over in the buffer
    // so package and output them as a raw message
    const buffer = Buffer.from(bufferedBytes);
    // console.debug('packaging raw message:', buffer.toString());
    output.push({
      type: MessageType.Raw,
      timestamp: input.timestamp,
      bytes: buffer,
      string: bufferedBytes
        .map(convertCP437toUTF8String)
        .join('')
    });
  }

  return output;
}

export function extractControlSequenceParameters(sequence: number[]): number[] {
  return sequence
    // remove the escape sequence (first 2 bytes)
    // remove the control sequence terminator (last byte)
    .slice(2, -1)
    // merge the parameter and intermediate bytes into a single string
    .join('')
    // split on ; (common intermediate byte)
    .split(';')
    // convert the string of numbers into actual numbers
    .map(parseInt);
}
