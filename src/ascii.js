export const keyCodes = {
  Null: 0,
  StartOfHeading: 1,
  Bell: 7,
  Backspace: 8,
  HorizontalTab: 9,
  LineFeed: 10,
  VerticalTab: 11,
  FormFeed: 12,
  CarriageReturn: 13,
  Escape: 27,
  LeftBracket: 91,
  UppercaseA: 65,
  UppercaseB: 66,
  UppercaseC: 67,
  UppercaseD: 68,
  UppercaseE: 69,
  UppercaseF: 70,
  UppercaseG: 71,
  UppercaseH: 72,
  UppercaseI: 73,
  UppercaseJ: 74,
  UppercaseK: 75,
  UppercaseL: 76,
  UppercaseM: 77,
  UppercaseN: 78,
  UppercaseO: 79,
  UppercaseP: 80,
  UppercaseQ: 81,
  UppercaseR: 82,
  UppercaseS: 83,
  UppercaseT: 84,
  UppercaseU: 85,
  UppercaseV: 86,
  UppercaseW: 87,
  UppercaseX: 88,
  UppercaseY: 89,
  UppercaseZ: 90,
  LowercaseA: 97,
  LowercaseB: 98,
  LowercaseC: 99,
  LowercaseD: 100,
  LowercaseE: 101,
  LowercaseF: 102,
  LowercaseG: 103,
  LowercaseH: 104,
  LowercaseI: 105,
  LowercaseJ: 106,
  LowercaseK: 107,
  LowercaseL: 108,
  LowercaseM: 109,
  LowercaseN: 110,
  LowercaseO: 111,
  LowercaseP: 112,
  LowercaseQ: 113,
  LowercaseR: 114,
  LowercaseS: 115,
  LowercaseT: 116,
  LowercaseU: 117,
  LowercaseV: 118,
  LowercaseW: 119,
  LowercaseX: 120,
  LowercaseY: 121,
  LowercaseZ: 122
};

export const keyCodeFromJSEvent = (event) => {
  if (isUppercaseLetter(event.keyCode) && !event.shiftKey) {
    return getLowercase(event.keyCode);
  } else {
    return event.keyCode;
  }
};

function isUppercaseLetter(code) {
  return code >= 65 && code <= 90;
}

function getLowercase(code) {
  return code + 32;
}
