import { convertDOMKeyToCP437 } from './characterEncodings';

export function parseDOMKeyInput(key): Buffer {
  switch (key) {
    case 'ArrowUp':
      return Buffer.from([ 0x1b, 0x5b, 0x41 ]); // ^[A
    case 'ArrowDown':
      return Buffer.from([ 0x1b, 0x5b, 0x42 ]); // ^[B
    case 'ArrowRight':
      return Buffer.from([ 0x1b, 0x5b, 0x43 ]); // ^[C
    case 'ArrowLeft':
      return Buffer.from([ 0x1b, 0x5b, 0x44 ]); // ^[D
    default:
      const cp437 = convertDOMKeyToCP437(key);
      return Buffer.from([ cp437 ]);
  }
}
