// https://en.wikipedia.org/wiki/ANSI_escape_code#Escape_sequences

interface EscapeSequence {
  name: string;
  c0: number;
  c1: number;
}

export const EscapeSequences: EscapeSequence[] = [
  { name: 'ControlSequence', c0: 0x1b, c1:0x5b }
];

export const EscapeSequencesByName: { [key: string]: EscapeSequence } = EscapeSequences
  .reduce((output: object, sequence: EscapeSequence): object => {
    output[sequence.name] = sequence;
    return output;
  }, {});

export const EscapeSequencesByC0: { [key: number]: EscapeSequence } = EscapeSequences
  .reduce((output: object, sequence: EscapeSequence): object => {
    output[sequence.c0] = sequence;
    return output;
  }, {});

export const EscapeSequencesByC1: { [key: number]: EscapeSequence } = EscapeSequences
  .reduce((output: object, sequence: EscapeSequence): object => {
    output[sequence.c1] = sequence;
    return output;
  }, {});
