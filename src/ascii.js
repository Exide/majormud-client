// source: https://www.asciitable.com/
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
  'z': 122
};

/**
 * @param {KeyboardEvent} event
 * @returns {Number} ASCII character code
 */
export function getASCIICode(event) {
  switch (event.code) {
    case 'Enter': return CharacterCode.CR;
    case 'Space': return CharacterCode.SPACE;
    case 'Backspace': return CharacterCode.BS;
    case 'KeyA': return shouldCapitalize(event) ? CharacterCode.A : CharacterCode.a;
    case 'KeyB': return shouldCapitalize(event) ? CharacterCode.B : CharacterCode.b;
    case 'KeyC': return shouldCapitalize(event) ? CharacterCode.C : CharacterCode.c;
    case 'KeyD': return shouldCapitalize(event) ? CharacterCode.D : CharacterCode.d;
    case 'KeyE': return shouldCapitalize(event) ? CharacterCode.E : CharacterCode.e;
    case 'KeyF': return shouldCapitalize(event) ? CharacterCode.F : CharacterCode.f;
    case 'KeyG': return shouldCapitalize(event) ? CharacterCode.G : CharacterCode.g;
    case 'KeyH': return shouldCapitalize(event) ? CharacterCode.H : CharacterCode.h;
    case 'KeyI': return shouldCapitalize(event) ? CharacterCode.I : CharacterCode.i;
    case 'KeyJ': return shouldCapitalize(event) ? CharacterCode.J : CharacterCode.j;
    case 'KeyK': return shouldCapitalize(event) ? CharacterCode.K : CharacterCode.k;
    case 'KeyL': return shouldCapitalize(event) ? CharacterCode.L : CharacterCode.l;
    case 'KeyM': return shouldCapitalize(event) ? CharacterCode.M : CharacterCode.m;
    case 'KeyN': return shouldCapitalize(event) ? CharacterCode.N : CharacterCode.n;
    case 'KeyO': return shouldCapitalize(event) ? CharacterCode.O : CharacterCode.o;
    case 'KeyP': return shouldCapitalize(event) ? CharacterCode.P : CharacterCode.p;
    case 'KeyQ': return shouldCapitalize(event) ? CharacterCode.Q : CharacterCode.q;
    case 'KeyR': return shouldCapitalize(event) ? CharacterCode.R : CharacterCode.r;
    case 'KeyS': return shouldCapitalize(event) ? CharacterCode.S : CharacterCode.s;
    case 'KeyT': return shouldCapitalize(event) ? CharacterCode.T : CharacterCode.t;
    case 'KeyU': return shouldCapitalize(event) ? CharacterCode.U : CharacterCode.u;
    case 'KeyV': return shouldCapitalize(event) ? CharacterCode.V : CharacterCode.v;
    case 'KeyW': return shouldCapitalize(event) ? CharacterCode.W : CharacterCode.w;
    case 'KeyX': return shouldCapitalize(event) ? CharacterCode.X : CharacterCode.x;
    case 'KeyY': return shouldCapitalize(event) ? CharacterCode.Y : CharacterCode.y;
    case 'KeyZ': return shouldCapitalize(event) ? CharacterCode.Z : CharacterCode.z;
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
