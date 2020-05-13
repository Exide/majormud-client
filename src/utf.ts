// https://en.wikipedia.org/wiki/UTF-8

export interface Character {
  name: string
  bytes: Buffer
}

const Characters: { [ key: string ]: Character } = {
  WhiteSquare: { name: 'White Square', bytes: Buffer.from([ 0xE2, 0x96, 0xA1 ]) }
};

export default Characters;
