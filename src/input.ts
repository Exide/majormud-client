import { convertDOMKeyToCP437 } from './characterEncodings';
import { ControlSequencesByName } from './ansi/controlSequences';

// todo: find this interface in the official TypeScript/Node.js/Electron/etc libs
export interface DOMKeyboardEvent {
  key: string
}

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
export function parseDOMKeyboardEvent(event: DOMKeyboardEvent): Buffer {
  switch (event.key) {
    case 'ArrowUp':
      return ControlSequencesByName.CursorUp.builder().build();
    case 'ArrowDown':
      return ControlSequencesByName.CursorDown.builder().build();
    case 'ArrowRight':
      return ControlSequencesByName.CursorForward.builder().build();
    case 'ArrowLeft':
      return ControlSequencesByName.CursorBackward.builder().build();
    default:
      const cp437 = convertDOMKeyToCP437(event.key);
      return Buffer.from([ cp437 ]);
  }
}
