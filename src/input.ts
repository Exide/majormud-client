import ASCII from './ascii';

/**
 * @param {KeyboardEvent} event
 * @returns {Number} ASCII character code
 */
export function convertKeyboardEventToEncoding(event) {
  switch (event.code) {
    case 'Enter': return ASCII.CarriageReturn;
    case 'Space': return ASCII.Space;
    case 'Backspace': return ASCII.Backspace;
    case 'KeyA': return shouldCapitalize(event) ? ASCII.A : ASCII.a;
    case 'KeyB': return shouldCapitalize(event) ? ASCII.B : ASCII.b;
    case 'KeyC': return shouldCapitalize(event) ? ASCII.C : ASCII.c;
    case 'KeyD': return shouldCapitalize(event) ? ASCII.D : ASCII.d;
    case 'KeyE': return shouldCapitalize(event) ? ASCII.E : ASCII.e;
    case 'KeyF': return shouldCapitalize(event) ? ASCII.F : ASCII.f;
    case 'KeyG': return shouldCapitalize(event) ? ASCII.G : ASCII.g;
    case 'KeyH': return shouldCapitalize(event) ? ASCII.H : ASCII.h;
    case 'KeyI': return shouldCapitalize(event) ? ASCII.I : ASCII.i;
    case 'KeyJ': return shouldCapitalize(event) ? ASCII.J : ASCII.j;
    case 'KeyK': return shouldCapitalize(event) ? ASCII.K : ASCII.k;
    case 'KeyL': return shouldCapitalize(event) ? ASCII.L : ASCII.l;
    case 'KeyM': return shouldCapitalize(event) ? ASCII.M : ASCII.m;
    case 'KeyN': return shouldCapitalize(event) ? ASCII.N : ASCII.n;
    case 'KeyO': return shouldCapitalize(event) ? ASCII.O : ASCII.o;
    case 'KeyP': return shouldCapitalize(event) ? ASCII.P : ASCII.p;
    case 'KeyQ': return shouldCapitalize(event) ? ASCII.Q : ASCII.q;
    case 'KeyR': return shouldCapitalize(event) ? ASCII.R : ASCII.r;
    case 'KeyS': return shouldCapitalize(event) ? ASCII.S : ASCII.s;
    case 'KeyT': return shouldCapitalize(event) ? ASCII.T : ASCII.t;
    case 'KeyU': return shouldCapitalize(event) ? ASCII.U : ASCII.u;
    case 'KeyV': return shouldCapitalize(event) ? ASCII.V : ASCII.v;
    case 'KeyW': return shouldCapitalize(event) ? ASCII.W : ASCII.w;
    case 'KeyX': return shouldCapitalize(event) ? ASCII.X : ASCII.x;
    case 'KeyY': return shouldCapitalize(event) ? ASCII.Y : ASCII.y;
    case 'KeyZ': return shouldCapitalize(event) ? ASCII.Z : ASCII.z;
    case 'Digit1': return shouldUseAlternateKey(event) ? ASCII.ExclamationMark : ASCII.One;
    case 'Digit2': return shouldUseAlternateKey(event) ? ASCII.At : ASCII.Two;
    case 'Digit3': return shouldUseAlternateKey(event) ? ASCII.Hash : ASCII.Three;
    case 'Digit4': return shouldUseAlternateKey(event) ? ASCII.Dollar : ASCII.Four;
    case 'Digit5': return shouldUseAlternateKey(event) ? ASCII.Percent : ASCII.Five;
    case 'Digit6': return shouldUseAlternateKey(event) ? ASCII.Caret : ASCII.Six;
    case 'Digit7': return shouldUseAlternateKey(event) ? ASCII.Ampersand : ASCII.Seven;
    case 'Digit8': return shouldUseAlternateKey(event) ? ASCII.Asterisk : ASCII.Eight;
    case 'Digit9': return shouldUseAlternateKey(event) ? ASCII.LeftParenthesis : ASCII.Nine;
    case 'Digit0': return shouldUseAlternateKey(event) ? ASCII.RightParenthesis : ASCII.Zero;
    case 'Minus': return shouldUseAlternateKey(event) ? ASCII.Underscore : ASCII.Dash;
    case 'Equal': return shouldUseAlternateKey(event) ? ASCII.Plus : ASCII.Equals;
    default:
      console.warn('no key mapping:', event.code);
      return ASCII.Null;
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
