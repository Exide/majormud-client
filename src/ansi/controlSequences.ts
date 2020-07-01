// https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_sequences

export interface ControlSequence {
  name: string;
  parameterBytes?: Buffer;
  intermediateBytes?: Buffer;
  finalByte: number,
  builder: Function
}

export const ControlSequences: ControlSequence[] = [
  { name: 'CursorUp',                   finalByte: 0x41 },
  { name: 'CursorDown',                 finalByte: 0x42 },
  { name: 'CursorForward',              finalByte: 0x43 },
  { name: 'CursorBackward',             finalByte: 0x44 },
  { name: 'CursorNextLine',             finalByte: 0x45 },
  { name: 'CursorPreviousLine',         finalByte: 0x46 },
  { name: 'CursorHorizontalAbsolute',   finalByte: 0x47 },
  { name: 'CursorPosition',             finalByte: 0x48 },
  { name: 'EraseDisplay',               finalByte: 0x4a },
  { name: 'EraseLine',                  finalByte: 0x4b },
  { name: 'ScrollUp',                   finalByte: 0x53 },
  { name: 'ScrollDown',                 finalByte: 0x54 },
  { name: 'HorizontalVerticalPosition', finalByte: 0x66 },
  { name: 'SelectGraphicRendition',     finalByte: 0x6d },
  { name: 'SaveCursorPosition',         finalByte: 0x73 },
  { name: 'RestoreCursorPosition',      finalByte: 0x75 }
].map(attachSequenceFunction);

function attachSequenceFunction(s: ControlSequence): ControlSequence {
  s.builder = () => new ControlSequenceBuilder(s.finalByte);
  return s;
}

export const ControlSequencesByName: { [key: string]: ControlSequence } = ControlSequences
  .reduce((output: object, sequence: ControlSequence): object => {
    output[sequence.name] = sequence;
    return output;
  }, {});

export const ControlSequencesByFinalByte: { [key: number]: ControlSequence } = ControlSequences
  .reduce((output: object, sequence: ControlSequence): object => {
    output[sequence.finalByte] = sequence;
    return output;
  }, {});

class ControlSequenceBuilder {

  private readonly c0: number = 0x1b;
  private readonly c1: number = 0x5b;
  private readonly parameters: number[] = [];
  private readonly intermediates: number[] = [];
  private readonly finalByte: number;

  constructor(finalByte: number) {
    this.finalByte = finalByte;
  }

  parameterByte(byte: number): ControlSequenceBuilder {
    this.parameters.push(byte);
    return this;
  }

  parameterBytes(bytes: number[]): ControlSequenceBuilder {
    this.parameters.push(...bytes);
    return this;
  }

  intermediateByte(byte: number): ControlSequenceBuilder {
    this.intermediates.push(byte);
    return this;
  }

  intermediateBytes(bytes: number[]): ControlSequenceBuilder {
    this.intermediates.push(...bytes);
    return this;
  }

  build(): Buffer {
    return Buffer.from([
      this.c0,
      this.c1,
      ...this.parameters,
      ...this.intermediates,
      this.finalByte
    ]);
  }

}
