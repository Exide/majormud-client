// source: http://www.asciitable.com/
export const CharacterCode = {
  'NULL': 0,
  'SOH': 1,
  'STX': 2,
  'ETX': 3,
  'EOT': 4,
  'ENQ': 5,
  'ACK': 6,
  'BELL': 7,
  'BS': 8,
  'TAB': 9,
  'LF': 10,
  'VT': 11,
  'FF': 12,
  'CR': 13,
  'SO': 14,
  'SI': 15,
  'DLE': 16,
  'DC1': 17,
  'DC2': 18,
  'DC3': 19,
  'DC4': 20,
  'NAK': 21,
  'SYN': 22,

  'ESC': 27,

  'SPACE': 32,
  '!': 33,
  '"': 34,
  '#': 35,
  '$': 36,
  '%': 37,
  '&': 38,
  '\'': 39,
  '(': 40,
  ')': 41,
  '*': 42,
  '+': 43,
  ',': 44,
  '-': 45,
  '.': 46,
  '/': 47,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  ':': 58,
  ';': 59,
  '<': 60,
  '=': 61,
  '>': 62,
  '?': 63,
  '@': 64,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  '[': 91,
  '\\': 92,
  ']': 93,
  '^': 94,
  '_': 95,
  '`': 96,
  'a': 97,
  'b': 98,
  'c': 99,
  'd': 100,
  'e': 101,
  'f': 102,
  'g': 103,
  'h': 104,
  'i': 105,
  'j': 106,
  'k': 107,
  'l': 108,
  'm': 109,
  'n': 110,
  'o': 111,
  'p': 112,
  'q': 113,
  'r': 114,
  's': 115,
  't': 116,
  'u': 117,
  'v': 118,
  'w': 119,
  'x': 120,
  'y': 121,
  'z': 122,
  '{': 123,
  '|': 124,
  '}': 125,
  '~': 126,
  'DEL': 127
};

export function getCode(character) {
  if (character in CharacterCode) {
    return CharacterCode[character];
  } else {
    throw new TypeError(character);
  }
}

/**
 * @param {KeyboardEvent} event
 * @returns {Number} ASCII character code
 */
export function getASCIICode(event) {
  switch (event.code) {
    case 'Enter': return CharacterCode.CR;
    case 'Space': return CharacterCode.SPACE;
    case 'Backspace': return CharacterCode.BS;
    case 'KeyA': return shouldCapitalize(event) ? getCode('A') : getCode('a');
    case 'KeyB': return shouldCapitalize(event) ? getCode('B') : getCode('b');
    case 'KeyC': return shouldCapitalize(event) ? getCode('C') : getCode('c');
    case 'KeyD': return shouldCapitalize(event) ? getCode('D') : getCode('d');
    case 'KeyE': return shouldCapitalize(event) ? getCode('E') : getCode('e');
    case 'KeyF': return shouldCapitalize(event) ? getCode('F') : getCode('f');
    case 'KeyG': return shouldCapitalize(event) ? getCode('G') : getCode('g');
    case 'KeyH': return shouldCapitalize(event) ? getCode('H') : getCode('h');
    case 'KeyI': return shouldCapitalize(event) ? getCode('I') : getCode('i');
    case 'KeyJ': return shouldCapitalize(event) ? getCode('J') : getCode('j');
    case 'KeyK': return shouldCapitalize(event) ? getCode('K') : getCode('k');
    case 'KeyL': return shouldCapitalize(event) ? getCode('L') : getCode('l');
    case 'KeyM': return shouldCapitalize(event) ? getCode('M') : getCode('m');
    case 'KeyN': return shouldCapitalize(event) ? getCode('N') : getCode('n');
    case 'KeyO': return shouldCapitalize(event) ? getCode('O') : getCode('o');
    case 'KeyP': return shouldCapitalize(event) ? getCode('P') : getCode('p');
    case 'KeyQ': return shouldCapitalize(event) ? getCode('Q') : getCode('q');
    case 'KeyR': return shouldCapitalize(event) ? getCode('R') : getCode('r');
    case 'KeyS': return shouldCapitalize(event) ? getCode('S') : getCode('s');
    case 'KeyT': return shouldCapitalize(event) ? getCode('T') : getCode('t');
    case 'KeyU': return shouldCapitalize(event) ? getCode('U') : getCode('u');
    case 'KeyV': return shouldCapitalize(event) ? getCode('V') : getCode('v');
    case 'KeyW': return shouldCapitalize(event) ? getCode('W') : getCode('w');
    case 'KeyX': return shouldCapitalize(event) ? getCode('X') : getCode('x');
    case 'KeyY': return shouldCapitalize(event) ? getCode('Y') : getCode('y');
    case 'KeyZ': return shouldCapitalize(event) ? getCode('Z') : getCode('z');
    case 'Digit1': return shouldUseAlternateKey(event) ? getCode('!') : getCode('1');
    case 'Digit2': return shouldUseAlternateKey(event) ? getCode('@') : getCode('2');
    case 'Digit3': return shouldUseAlternateKey(event) ? getCode('#') : getCode('3');
    case 'Digit4': return shouldUseAlternateKey(event) ? getCode('$') : getCode('4');
    case 'Digit5': return shouldUseAlternateKey(event) ? getCode('%') : getCode('5');
    case 'Digit6': return shouldUseAlternateKey(event) ? getCode('^') : getCode('6');
    case 'Digit7': return shouldUseAlternateKey(event) ? getCode('&') : getCode('7');
    case 'Digit8': return shouldUseAlternateKey(event) ? getCode('*') : getCode('8');
    case 'Digit9': return shouldUseAlternateKey(event) ? getCode('(') : getCode('9');
    case 'Digit0': return shouldUseAlternateKey(event) ? getCode(')') : getCode('0');
    case 'Minus': return shouldUseAlternateKey(event) ? getCode('_') : getCode('-');
    case 'Equal': return shouldUseAlternateKey(event) ? getCode('+') : getCode('=');
    default:
      console.warn('no key mapping:', event.code);
      return CharacterCode.NULL;
  }
}

function shouldCapitalize(event) {
  let capsLocked = event.getModifierState('CapsLock');
  let shifted = event.getModifierState('Shift');
  return capsLocked || shifted;
}

function shouldUseAlternateKey(event) {
  return event.getModifierState('Shift');
}
