import { Message, MessageType } from './message';
import ASCII from './ascii';

// https://en.wikipedia.org/wiki/ANSI_escape_code

interface EscapeSequence {
  name: string;
  firstByte: number;
  secondByte: number;
  terminator: number;
}

interface ControlSequence extends EscapeSequence {
  parameterBytes?: Buffer;
  intermediateBytes?: Buffer;
}

export const EscapeSequences: { [key: string]: EscapeSequence } = {
  CursorUp:                   { name: 'Cursor Up',                    firstByte: 27, secondByte: 91, terminator: 65 },
  CursorDown:                 { name: 'Cursor Down',                  firstByte: 27, secondByte: 91, terminator: 66 },
  CursorForward:              { name: 'Cursor Forward',               firstByte: 27, secondByte: 91, terminator: 67 },
  CursorBackward:             { name: 'Cursor Backward',              firstByte: 27, secondByte: 91, terminator: 68 },
  CursorNextLine:             { name: 'Cursor Next Line',             firstByte: 27, secondByte: 91, terminator: 69 },
  CursorPreviousLine:         { name: 'Cursor Previous Line',         firstByte: 27, secondByte: 91, terminator: 70 },
  CursorHorizontalAbsolute:   { name: 'Cursor Horizontal Absolute',   firstByte: 27, secondByte: 91, terminator: 71 },
  CursorPosition:             { name: 'Cursor Position',              firstByte: 27, secondByte: 91, terminator: 72 },
  EraseDisplay:               { name: 'Erase Display',                firstByte: 27, secondByte: 91, terminator: 74 },
  EraseLine:                  { name: 'Erase Line',                   firstByte: 27, secondByte: 91, terminator: 75 },
  ScrollUp:                   { name: 'Scroll Up',                    firstByte: 27, secondByte: 91, terminator: 83 },
  ScrollDown:                 { name: 'Scroll Down',                  firstByte: 27, secondByte: 91, terminator: 84 },
  HorizontalVerticalPosition: { name: 'Horizontal Vertical Position', firstByte: 27, secondByte: 91, terminator: 102 },
  SelectGraphicRendition:     { name: 'Select Graphic Rendition',     firstByte: 27, secondByte: 91, terminator: 109 },
  SaveCursorPosition:         { name: 'Save Cursor Position',         firstByte: 27, secondByte: 91, terminator: 115 },
  RestoreCursorPosition:      { name: 'Restore Cursor Position',      firstByte: 27, secondByte: 91, terminator: 117 }
};

export enum SGRParameters {
  Reset = 0,
  Bold = 1,
  Faint = 2,
  Italic = 3,
  Underline = 4,
  SlowBlink = 5,
  RapidBlink = 6,
  ReverseVideo = 7,
  Conceal = 8,
  CrossedOut = 9,
  SetForegroundBlack = 30,
  SetForegroundRed = 31,
  SetForegroundGreen = 32,
  SetForegroundYellow = 33,
  SetForegroundBlue = 34,
  SetForegroundMagenta = 35,
  SetForegroundCyan = 36,
  SetForegroundWhite = 37,
  SetForegroundExtended = 38, // takes more arguments (e.g. `5;n`, `2;r;g;b`)
  SetForegroundDefault = 39,  // system default
  SetBackgroundBlack = 40,
  SetBackgroundRed = 41,
  SetBackgroundGreen = 42,
  SetBackgroundYellow = 43,
  SetBackgroundBlue = 44,
  SetBackgroundMagenta = 45,
  SetBackgroundCyan = 46,
  SetBackgroundWhite = 47,
  SetBackgroundExtended = 48, // takes more arguments (e.g. `5;n`, `2;r;g;b`)
  SetDefaultBackground = 49   // system default
}

export function parseRawMessage(input: Message): Message[] {
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

      if (currentByte === ASCII.Escape.byte) {
        // we potentially have the start of a new escape sequence

        // capture the next byte
        const nextByte = input.bytes[0];

        // can we infer an escape sequence from these 2 bytes?
        const knownSecondBytes = new Set(Object.values(EscapeSequences).map(sequence => sequence.secondByte));
        if (knownSecondBytes.has(nextByte)) {
          // console.debug(`first two bytes of an escape sequence found: ${currentByte} ${nextByte}`);

          // package and output any bytes currently in the buffer
          if (bufferedBytes.length > 0) {
            const buffer = Buffer.from(bufferedBytes);
            // console.debug('packaging raw message:', buffer.toString());
            output.push({
              type: MessageType.Raw,
              timestamp: input.timestamp,
              bytes: buffer,
              string: buffer.toString()
            });
          }

          // save both bytes to a new buffer
          bufferedBytes = [ currentByte, nextByte ];

          // move the cursor on the stream past the second byte
          input.bytes = input.bytes.slice(1);

          // save a list of terminators to look for
          terminatorsToFind = Object.values(EscapeSequences)
            .filter(sequence => sequence.secondByte == nextByte)
            .map(sequence => sequence.terminator);

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
        const escapeSequence = Object.values(EscapeSequences).find(sequence => sequence.terminator === currentByte);
        if (!escapeSequence) throw new Error(`i think i have a known terminator (${currentByte}) but i can't find a corresponding escape sequence`);

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
          parsed: [ escapeSequence, ...parameters ]
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
      string: buffer.toString()
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
