import { TextDecoder } from 'util';

const utf16Decoder = new TextDecoder('utf-16le');

// https://en.wikipedia.org/wiki/Code_page_437

export interface Character {
  name: string
  cp437: number
  utf16: number
  domKey?: string
}

export const Characters: Character[] = [
  { name: 'Null', cp437: 0x00, utf16: 0x0000 },
  { name: 'StartOfHeading', cp437: 0x01, utf16: 0x0001 },
  { name: 'StartOfText', cp437: 0x02, utf16: 0x0002 },
  { name: 'EndOfText', cp437: 0x03, utf16: 0x0003 },
  { name: 'EndOfTransmission', cp437: 0x04, utf16: 0x0004 },
  { name: 'Enquiry', cp437: 0x05, utf16: 0x0005 },
  { name: 'Acknowledge', cp437: 0x06, utf16: 0x0006 },
  { name: 'Bell', cp437: 0x07, utf16: 0x0007 },
  { name: 'Backspace', cp437: 0x08, utf16: 0x0008, domKey: 'Backspace' },
  { name: 'HorizontalTabulation', cp437: 0x09, utf16: 0x0009, domKey: 'Tab' },
  { name: 'LineFeed', cp437: 0x0a, utf16: 0x000a },
  { name: 'VerticalTabulation', cp437: 0x0b, utf16: 0x000b },
  { name: 'FormFeed', cp437: 0x0c, utf16: 0x000c },
  { name: 'CarriageReturn', cp437: 0x0d, utf16: 0x000d, domKey: 'Enter' },
  { name: 'ShiftOut', cp437: 0x0e, utf16: 0x000e },
  { name: 'ShiftIn', cp437: 0x0f, utf16: 0x000f },
  { name: 'DataLinkEscape', cp437: 0x10, utf16: 0x0010 },
  { name: 'DeviceControlOne', cp437: 0x11, utf16: 0x0011 },
  { name: 'DeviceControlTwo', cp437: 0x12, utf16: 0x0012 },
  { name: 'DeviceControlThree', cp437: 0x13, utf16: 0x0013 },
  { name: 'DeviceControlFour', cp437: 0x14, utf16: 0x0014 },
  { name: 'NegativeAcknowledge', cp437: 0x15, utf16: 0x0015 },
  { name: 'SynchronousIdle', cp437: 0x16, utf16: 0x0016 },
  { name: 'EndOfTransmissionBlock', cp437: 0x17, utf16: 0x0017 },
  { name: 'Cancel', cp437: 0x18, utf16: 0x0018 },
  { name: 'EndOfMedium', cp437: 0x19, utf16: 0x0019 },
  { name: 'Substitute', cp437: 0x1a, utf16: 0x001a },
  { name: 'Escape', cp437: 0x1b, utf16: 0x001b, domKey: 'Escape' },
  { name: 'FileSeparator', cp437: 0x1c, utf16: 0x001c },
  { name: 'GroupSeparator', cp437: 0x1d, utf16: 0x001d },
  { name: 'RecordSeparator', cp437: 0x1e, utf16: 0x001e },
  { name: 'UnitSeparator', cp437: 0x1f, utf16: 0x001f },
  { name: 'Space', cp437: 0x20, utf16: 0x0020, domKey: ' ' },
  { name: 'ExclamationMark', cp437: 0x21, utf16: 0x0021, domKey: '!' },
  { name: 'QuotationMark', cp437: 0x22, utf16: 0x0022, domKey: '"' },
  { name: 'NumberSign', cp437: 0x23, utf16: 0x0023, domKey: '#' },
  { name: 'DollarSign', cp437: 0x24, utf16: 0x0024, domKey: '$' },
  { name: 'PercentSign', cp437: 0x25, utf16: 0x0025, domKey: '%' },
  { name: 'Ampersand', cp437: 0x26, utf16: 0x0026, domKey: '&' },
  { name: 'Apostrophe', cp437: 0x27, utf16: 0x0027, domKey: '\'' },
  { name: 'LeftParenthesis', cp437: 0x28, utf16: 0x0028, domKey: '(' },
  { name: 'RightParenthesis', cp437: 0x29, utf16: 0x0029, domKey: ')' },
  { name: 'Asterisk', cp437: 0x2a, utf16: 0x002a, domKey: '*' },
  { name: 'PlusSign', cp437: 0x2b, utf16: 0x002b, domKey: '+' },
  { name: 'Comma', cp437: 0x2c, utf16: 0x002c, domKey: ',' },
  { name: 'HyphenMinus', cp437: 0x2d, utf16: 0x002d, domKey: '-' },
  { name: 'FullStop', cp437: 0x2e, utf16: 0x002e, domKey: '.' },
  { name: 'Solidus', cp437: 0x2f, utf16: 0x002f, domKey: '/' },
  { name: 'DigitZero', cp437: 0x30, utf16: 0x0030, domKey: '0' },
  { name: 'DigitOne', cp437: 0x31, utf16: 0x0031, domKey: '1' },
  { name: 'DigitTwo', cp437: 0x32, utf16: 0x0032, domKey: '2' },
  { name: 'DigitThree', cp437: 0x33, utf16: 0x0033, domKey: '3' },
  { name: 'DigitFour', cp437: 0x34, utf16: 0x0034, domKey: '4' },
  { name: 'DigitFive', cp437: 0x35, utf16: 0x0035, domKey: '5' },
  { name: 'DigitSix', cp437: 0x36, utf16: 0x0036, domKey: '6' },
  { name: 'DigitSeven', cp437: 0x37, utf16: 0x0037, domKey: '7' },
  { name: 'DigitEight', cp437: 0x38, utf16: 0x0038, domKey: '8' },
  { name: 'DigitNine', cp437: 0x39, utf16: 0x0039, domKey: '9' },
  { name: 'Colon', cp437: 0x3a, utf16: 0x003a, domKey: ':' },
  { name: 'Semicolon', cp437: 0x3b, utf16: 0x003b, domKey: ';' },
  { name: 'LessThanSign', cp437: 0x3c, utf16: 0x003c, domKey: '<' },
  { name: 'EqualsSign', cp437: 0x3d, utf16: 0x003d, domKey: '=' },
  { name: 'GreaterThanSign', cp437: 0x3e, utf16: 0x003e, domKey: '>' },
  { name: 'QuestionMark', cp437: 0x3f, utf16: 0x003f, domKey: '?' },
  { name: 'CommercialAt', cp437: 0x40, utf16: 0x0040, domKey: '@' },
  { name: 'LatinCapitalLetterA', cp437: 0x41, utf16: 0x0041, domKey: 'A' },
  { name: 'LatinCapitalLetterB', cp437: 0x42, utf16: 0x0042, domKey: 'B' },
  { name: 'LatinCapitalLetterC', cp437: 0x43, utf16: 0x0043, domKey: 'C' },
  { name: 'LatinCapitalLetterD', cp437: 0x44, utf16: 0x0044, domKey: 'D' },
  { name: 'LatinCapitalLetterE', cp437: 0x45, utf16: 0x0045, domKey: 'E' },
  { name: 'LatinCapitalLetterF', cp437: 0x46, utf16: 0x0046, domKey: 'F' },
  { name: 'LatinCapitalLetterG', cp437: 0x47, utf16: 0x0047, domKey: 'G' },
  { name: 'LatinCapitalLetterH', cp437: 0x48, utf16: 0x0048, domKey: 'H' },
  { name: 'LatinCapitalLetterI', cp437: 0x49, utf16: 0x0049, domKey: 'I' },
  { name: 'LatinCapitalLetterJ', cp437: 0x4a, utf16: 0x004a, domKey: 'J' },
  { name: 'LatinCapitalLetterK', cp437: 0x4b, utf16: 0x004b, domKey: 'K' },
  { name: 'LatinCapitalLetterL', cp437: 0x4c, utf16: 0x004c, domKey: 'L' },
  { name: 'LatinCapitalLetterM', cp437: 0x4d, utf16: 0x004d, domKey: 'M' },
  { name: 'LatinCapitalLetterN', cp437: 0x4e, utf16: 0x004e, domKey: 'N' },
  { name: 'LatinCapitalLetterO', cp437: 0x4f, utf16: 0x004f, domKey: 'O' },
  { name: 'LatinCapitalLetterP', cp437: 0x50, utf16: 0x0050, domKey: 'P' },
  { name: 'LatinCapitalLetterQ', cp437: 0x51, utf16: 0x0051, domKey: 'Q' },
  { name: 'LatinCapitalLetterR', cp437: 0x52, utf16: 0x0052, domKey: 'R' },
  { name: 'LatinCapitalLetterS', cp437: 0x53, utf16: 0x0053, domKey: 'S' },
  { name: 'LatinCapitalLetterT', cp437: 0x54, utf16: 0x0054, domKey: 'T' },
  { name: 'LatinCapitalLetterU', cp437: 0x55, utf16: 0x0055, domKey: 'U' },
  { name: 'LatinCapitalLetterV', cp437: 0x56, utf16: 0x0056, domKey: 'V' },
  { name: 'LatinCapitalLetterW', cp437: 0x57, utf16: 0x0057, domKey: 'W' },
  { name: 'LatinCapitalLetterX', cp437: 0x58, utf16: 0x0058, domKey: 'X' },
  { name: 'LatinCapitalLetterY', cp437: 0x59, utf16: 0x0059, domKey: 'Y' },
  { name: 'LatinCapitalLetterZ', cp437: 0x5a, utf16: 0x005a, domKey: 'Z' },
  { name: 'LeftSquareBracket', cp437: 0x5b, utf16: 0x005b, domKey: '[' },
  { name: 'ReverseSolidus', cp437: 0x5c, utf16: 0x005c, domKey: '\\' },
  { name: 'RightSquareBracket', cp437: 0x5d, utf16: 0x005d, domKey: ']' },
  { name: 'CircumflexAccent', cp437: 0x5e, utf16: 0x005e, domKey: '^' },
  { name: 'LowLine', cp437: 0x5f, utf16: 0x005f, domKey: '_' },
  { name: 'GraveAccent', cp437: 0x60, utf16: 0x0060, domKey: '`' },
  { name: 'LatinSmallLetterA', cp437: 0x61, utf16: 0x0061, domKey: 'a' },
  { name: 'LatinSmallLetterB', cp437: 0x62, utf16: 0x0062, domKey: 'b' },
  { name: 'LatinSmallLetterC', cp437: 0x63, utf16: 0x0063, domKey: 'c' },
  { name: 'LatinSmallLetterD', cp437: 0x64, utf16: 0x0064, domKey: 'd' },
  { name: 'LatinSmallLetterE', cp437: 0x65, utf16: 0x0065, domKey: 'e' },
  { name: 'LatinSmallLetterF', cp437: 0x66, utf16: 0x0066, domKey: 'f' },
  { name: 'LatinSmallLetterG', cp437: 0x67, utf16: 0x0067, domKey: 'g' },
  { name: 'LatinSmallLetterH', cp437: 0x68, utf16: 0x0068, domKey: 'h' },
  { name: 'LatinSmallLetterI', cp437: 0x69, utf16: 0x0069, domKey: 'i' },
  { name: 'LatinSmallLetterJ', cp437: 0x6a, utf16: 0x006a, domKey: 'j' },
  { name: 'LatinSmallLetterK', cp437: 0x6b, utf16: 0x006b, domKey: 'k' },
  { name: 'LatinSmallLetterL', cp437: 0x6c, utf16: 0x006c, domKey: 'l' },
  { name: 'LatinSmallLetterM', cp437: 0x6d, utf16: 0x006d, domKey: 'm' },
  { name: 'LatinSmallLetterN', cp437: 0x6e, utf16: 0x006e, domKey: 'n' },
  { name: 'LatinSmallLetterO', cp437: 0x6f, utf16: 0x006f, domKey: 'o' },
  { name: 'LatinSmallLetterP', cp437: 0x70, utf16: 0x0070, domKey: 'p' },
  { name: 'LatinSmallLetterQ', cp437: 0x71, utf16: 0x0071, domKey: 'q' },
  { name: 'LatinSmallLetterR', cp437: 0x72, utf16: 0x0072, domKey: 'r' },
  { name: 'LatinSmallLetterS', cp437: 0x73, utf16: 0x0073, domKey: 's' },
  { name: 'LatinSmallLetterT', cp437: 0x74, utf16: 0x0074, domKey: 't' },
  { name: 'LatinSmallLetterU', cp437: 0x75, utf16: 0x0075, domKey: 'u' },
  { name: 'LatinSmallLetterV', cp437: 0x76, utf16: 0x0076, domKey: 'v' },
  { name: 'LatinSmallLetterW', cp437: 0x77, utf16: 0x0077, domKey: 'w' },
  { name: 'LatinSmallLetterX', cp437: 0x78, utf16: 0x0078, domKey: 'x' },
  { name: 'LatinSmallLetterY', cp437: 0x79, utf16: 0x0079, domKey: 'y' },
  { name: 'LatinSmallLetterZ', cp437: 0x7a, utf16: 0x007a, domKey: 'z' },
  { name: 'LeftCurlyBracket', cp437: 0x7b, utf16: 0x007b, domKey: '{' },
  { name: 'VerticalLine', cp437: 0x7c, utf16: 0x007c, domKey: '|' },
  { name: 'RightCurlyBracket', cp437: 0x7d, utf16: 0x007d, domKey: '}' },
  { name: 'Tilde', cp437: 0x7e, utf16: 0x007e, domKey: '~' },
  { name: 'Delete', cp437: 0x7f, utf16: 0x007f, domKey: 'Delete' },
  { name: 'LatinCapitalLetterCWithCedilla', cp437: 0x80, utf16: 0x00c7 },
  { name: 'LatinSmallLetterUWithDiaeresis', cp437: 0x81, utf16: 0x00fc },
  { name: 'LatinSmallLetterEWithAcute', cp437: 0x82, utf16: 0x00e9 },
  { name: 'LatinSmallLetterAWithCircumflex', cp437: 0x83, utf16: 0x00e2 },
  { name: 'LatinSmallLetterAWithDiaeresis', cp437: 0x84, utf16: 0x00e4 },
  { name: 'LatinSmallLetterAWithGrave', cp437: 0x85, utf16: 0x00e0 },
  { name: 'LatinSmallLetterAWithRingAbove', cp437: 0x86, utf16: 0x00e5 },
  { name: 'LatinSmallLetterCWithCedilla', cp437: 0x87, utf16: 0x00e7 },
  { name: 'LatinSmallLetterEWithCircumflex', cp437: 0x88, utf16: 0x00ea },
  { name: 'LatinSmallLetterEWithDiaeresis', cp437: 0x89, utf16: 0x00eb },
  { name: 'LatinSmallLetterEWithGrave', cp437: 0x8a, utf16: 0x00e8 },
  { name: 'LatinSmallLetterIWithDiaeresis', cp437: 0x8b, utf16: 0x00ef },
  { name: 'LatinSmallLetterIWithCircumflex', cp437: 0x8c, utf16: 0x00ee },
  { name: 'LatinSmallLetterIWithGrave', cp437: 0x8d, utf16: 0x00ec },
  { name: 'LatinCapitalLetterAWithDiaeresis', cp437: 0x8e, utf16: 0x00c4 },
  { name: 'LatinCapitalLetterAWithRingAbove', cp437: 0x8f, utf16: 0x00c5 },
  { name: 'LatinCapitalLetterEWithAcute', cp437: 0x90, utf16: 0x00c9 },
  { name: 'LatinSmallLigatureAe', cp437: 0x91, utf16: 0x00e6 },
  { name: 'LatinCapitalLigatureAe', cp437: 0x92, utf16: 0x00c6 },
  { name: 'LatinSmallLetterOWithCircumflex', cp437: 0x93, utf16: 0x00f4 },
  { name: 'LatinSmallLetterOWithDiaeresis', cp437: 0x94, utf16: 0x00f6 },
  { name: 'LatinSmallLetterOWithGrave', cp437: 0x95, utf16: 0x00f2 },
  { name: 'LatinSmallLetterUWithCircumflex', cp437: 0x96, utf16: 0x00fb },
  { name: 'LatinSmallLetterUWithGrave', cp437: 0x97, utf16: 0x00f9 },
  { name: 'LatinSmallLetterYWithDiaeresis', cp437: 0x98, utf16: 0x00ff },
  { name: 'LatinCapitalLetterOWithDiaeresis', cp437: 0x99, utf16: 0x00d6 },
  { name: 'LatinCapitalLetterUWithDiaeresis', cp437: 0x9a, utf16: 0x00dc },
  { name: 'CentSign', cp437: 0x9b, utf16: 0x00a2 },
  { name: 'PoundSign', cp437: 0x9c, utf16: 0x00a3 },
  { name: 'YenSign', cp437: 0x9d, utf16: 0x00a5 },
  { name: 'PesetaSign', cp437: 0x9e, utf16: 0x20a7 },
  { name: 'LatinSmallLetterFWithHook', cp437: 0x9f, utf16: 0x0192 },
  { name: 'LatinSmallLetterAWithAcute', cp437: 0xa0, utf16: 0x00e1 },
  { name: 'LatinSmallLetterIWithAcute', cp437: 0xa1, utf16: 0x00ed },
  { name: 'LatinSmallLetterOWithAcute', cp437: 0xa2, utf16: 0x00f3 },
  { name: 'LatinSmallLetterUWithAcute', cp437: 0xa3, utf16: 0x00fa },
  { name: 'LatinSmallLetterNWithTilde', cp437: 0xa4, utf16: 0x00f1 },
  { name: 'LatinCapitalLetterNWithTilde', cp437: 0xa5, utf16: 0x00d1 },
  { name: 'FeminineOrdinalIndicator', cp437: 0xa6, utf16: 0x00aa },
  { name: 'MasculineOrdinalIndicator', cp437: 0xa7, utf16: 0x00ba },
  { name: 'InvertedQuestionMark', cp437: 0xa8, utf16: 0x00bf },
  { name: 'ReversedNotSign', cp437: 0xa9, utf16: 0x2310 },
  { name: 'NotSign', cp437: 0xaa, utf16: 0x00ac },
  { name: 'VulgarFractionOneHalf', cp437: 0xab, utf16: 0x00bd },
  { name: 'VulgarFractionOneQuarter', cp437: 0xac, utf16: 0x00bc },
  { name: 'InvertedExclamationMark', cp437: 0xad, utf16: 0x00a1 },
  { name: 'LeftPointingDoubleAngleQuotationMark', cp437: 0xae, utf16: 0x00ab },
  { name: 'RightPointingDoubleAngleQuotationMark', cp437: 0xaf, utf16: 0x00bb },
  { name: 'LightShade', cp437: 0xb0, utf16: 0x2591 },
  { name: 'MediumShade', cp437: 0xb1, utf16: 0x2592 },
  { name: 'DarkShade', cp437: 0xb2, utf16: 0x2593 },
  { name: 'BoxDrawingsLightVertical', cp437: 0xb3, utf16: 0x2502 },
  { name: 'BoxDrawingsLightVerticalAndLeft', cp437: 0xb4, utf16: 0x2524 },
  { name: 'BoxDrawingsVerticalSingleAndLeftDouble', cp437: 0xb5, utf16: 0x2561 },
  { name: 'BoxDrawingsVerticalDoubleAndLeftSingle', cp437: 0xb6, utf16: 0x2562 },
  { name: 'BoxDrawingsDownDoubleAndLeftSingle', cp437: 0xb7, utf16: 0x2556 },
  { name: 'BoxDrawingsDownSingleAndLeftDouble', cp437: 0xb8, utf16: 0x2555 },
  { name: 'BoxDrawingsDoubleVerticalAndLeft', cp437: 0xb9, utf16: 0x2563 },
  { name: 'BoxDrawingsDoubleVertical', cp437: 0xba, utf16: 0x2551 },
  { name: 'BoxDrawingsDoubleDownAndLeft', cp437: 0xbb, utf16: 0x2557 },
  { name: 'BoxDrawingsDoubleUpAndLeft', cp437: 0xbc, utf16: 0x255d },
  { name: 'BoxDrawingsUpDoubleAndLeftSingle', cp437: 0xbd, utf16: 0x255c },
  { name: 'BoxDrawingsUpSingleAndLeftDouble', cp437: 0xbe, utf16: 0x255b },
  { name: 'BoxDrawingsLightDownAndLeft', cp437: 0xbf, utf16: 0x2510 },
  { name: 'BoxDrawingsLightUpAndRight', cp437: 0xc0, utf16: 0x2514 },
  { name: 'BoxDrawingsLightUpAndHorizontal', cp437: 0xc1, utf16: 0x2534 },
  { name: 'BoxDrawingsLightDownAndHorizontal', cp437: 0xc2, utf16: 0x252c },
  { name: 'BoxDrawingsLightVerticalAndRight', cp437: 0xc3, utf16: 0x251c },
  { name: 'BoxDrawingsLightHorizontal', cp437: 0xc4, utf16: 0x2500 },
  { name: 'BoxDrawingsLightVerticalAndHorizontal', cp437: 0xc5, utf16: 0x253c },
  { name: 'BoxDrawingsVerticalSingleAndRightDouble', cp437: 0xc6, utf16: 0x255e },
  { name: 'BoxDrawingsVerticalDoubleAndRightSingle', cp437: 0xc7, utf16: 0x255f },
  { name: 'BoxDrawingsDoubleUpAndRight', cp437: 0xc8, utf16: 0x255a },
  { name: 'BoxDrawingsDoubleDownAndRight', cp437: 0xc9, utf16: 0x2554 },
  { name: 'BoxDrawingsDoubleUpAndHorizontal', cp437: 0xca, utf16: 0x2569 },
  { name: 'BoxDrawingsDoubleDownAndHorizontal', cp437: 0xcb, utf16: 0x2566 },
  { name: 'BoxDrawingsDoubleVerticalAndRight', cp437: 0xcc, utf16: 0x2560 },
  { name: 'BoxDrawingsDoubleHorizontal', cp437: 0xcd, utf16: 0x2550 },
  { name: 'BoxDrawingsDoubleVerticalAndHorizontal', cp437: 0xce, utf16: 0x256c },
  { name: 'BoxDrawingsUpSingleAndHorizontalDouble', cp437: 0xcf, utf16: 0x2567 },
  { name: 'BoxDrawingsUpDoubleAndHorizontalSingle', cp437: 0xd0, utf16: 0x2568 },
  { name: 'BoxDrawingsDownSingleAndHorizontalDouble', cp437: 0xd1, utf16: 0x2564 },
  { name: 'BoxDrawingsDownDoubleAndHorizontalSingle', cp437: 0xd2, utf16: 0x2565 },
  { name: 'BoxDrawingsUpDoubleAndRightSingle', cp437: 0xd3, utf16: 0x2559 },
  { name: 'BoxDrawingsUpSingleAndRightDouble', cp437: 0xd4, utf16: 0x2558 },
  { name: 'BoxDrawingsDownSingleAndRightDouble', cp437: 0xd5, utf16: 0x2552 },
  { name: 'BoxDrawingsDownDoubleAndRightSingle', cp437: 0xd6, utf16: 0x2553 },
  { name: 'BoxDrawingsVerticalDoubleAndHorizontalSingle', cp437: 0xd7, utf16: 0x256b },
  { name: 'BoxDrawingsVerticalSingleAndHorizontalDouble', cp437: 0xd8, utf16: 0x256a },
  { name: 'BoxDrawingsLightUpAndLeft', cp437: 0xd9, utf16: 0x2518 },
  { name: 'BoxDrawingsLightDownAndRight', cp437: 0xda, utf16: 0x250c },
  { name: 'FullBlock', cp437: 0xdb, utf16: 0x2588 },
  { name: 'LowerHalfBlock', cp437: 0xdc, utf16: 0x2584 },
  { name: 'LeftHalfBlock', cp437: 0xdd, utf16: 0x258c },
  { name: 'RightHalfBlock', cp437: 0xde, utf16: 0x2590 },
  { name: 'UpperHalfBlock', cp437: 0xdf, utf16: 0x2580 },
  { name: 'GreekSmallLetterAlpha', cp437: 0xe0, utf16: 0x03b1 },
  { name: 'LatinSmallLetterSharpS', cp437: 0xe1, utf16: 0x00df },
  { name: 'GreekCapitalLetterGamma', cp437: 0xe2, utf16: 0x0393 },
  { name: 'GreekSmallLetterPi', cp437: 0xe3, utf16: 0x03c0 },
  { name: 'GreekCapitalLetterSigma', cp437: 0xe4, utf16: 0x03a3 },
  { name: 'GreekSmallLetterSigma', cp437: 0xe5, utf16: 0x03c3 },
  { name: 'MicroSign', cp437: 0xe6, utf16: 0x00b5 },
  { name: 'GreekSmallLetterTau', cp437: 0xe7, utf16: 0x03c4 },
  { name: 'GreekCapitalLetterPhi', cp437: 0xe8, utf16: 0x03a6 },
  { name: 'GreekCapitalLetterTheta', cp437: 0xe9, utf16: 0x0398 },
  { name: 'GreekCapitalLetterOmega', cp437: 0xea, utf16: 0x03a9 },
  { name: 'GreekSmallLetterDelta', cp437: 0xeb, utf16: 0x03b4 },
  { name: 'Infinity', cp437: 0xec, utf16: 0x221e },
  { name: 'GreekSmallLetterPhi', cp437: 0xed, utf16: 0x03c6 },
  { name: 'GreekSmallLetterEpsilon', cp437: 0xee, utf16: 0x03b5 },
  { name: 'Intersection', cp437: 0xef, utf16: 0x2229 },
  { name: 'IdenticalTo', cp437: 0xf0, utf16: 0x2261 },
  { name: 'PlusMinusSign', cp437: 0xf1, utf16: 0x00b1 },
  { name: 'GreaterThanOrEqualTo', cp437: 0xf2, utf16: 0x2265 },
  { name: 'LessThanOrEqualTo', cp437: 0xf3, utf16: 0x2264 },
  { name: 'TopHalfIntegral', cp437: 0xf4, utf16: 0x2320 },
  { name: 'BottomHalfIntegral', cp437: 0xf5, utf16: 0x2321 },
  { name: 'DivisionSign', cp437: 0xf6, utf16: 0x00f7 },
  { name: 'AlmostEqualTo', cp437: 0xf7, utf16: 0x2248 },
  { name: 'DegreeSign', cp437: 0xf8, utf16: 0x00b0 },
  { name: 'BulletOperator', cp437: 0xf9, utf16: 0x2219 },
  { name: 'MiddleDot', cp437: 0xfa, utf16: 0x00b7 },
  { name: 'SquareRoot', cp437: 0xfb, utf16: 0x221a },
  { name: 'SuperscriptLatinSmallLetterN', cp437: 0xfc, utf16: 0x207f },
  { name: 'SuperscriptTwo', cp437: 0xfd, utf16: 0x00b2 },
  { name: 'BlackSquare', cp437: 0xfe, utf16: 0x25a0 },
  { name: 'NoBreakSpace', cp437: 0xff, utf16: 0x00a0 }
];

export const CharactersByName: { [key: string]: Character } = Characters
  .reduce((output: object, character: Character): object => {
    output[character.name] = character;
    return output;
  }, {});

export const CharactersByCP437: { [key: number]: Character } = Characters
  .reduce((output: object, character: Character): object => {
    output[character.cp437] = character;
    return output;
  }, {});

export const CharactersByUTF16: { [key: number]: Character } = Characters
  .reduce((output: object, character: Character): object => {
    output[character.utf16] = character;
    return output;
  }, {});

export const CharactersByDOMKey: { [key: string]: Character } = Characters
  .reduce((output: object, character: Character): object => {
    if (character.domKey === undefined) return output;
    output[character.domKey] = character;
    return output;
  }, {});

export function convertCP437toUTF8String(byte): string {
  const character: Character = CharactersByCP437[byte];
  if (character === undefined) {
    console.warn(`unknown CP437 key code: ${byte}`);
    return Buffer.from([ 0x00 ]).toString('utf8');
  } else {
    const utf16array = new Uint16Array([ character.utf16 ]);
    return utf16Decoder.decode(utf16array);
  }
}

export function convertCP437toUTF16(byte): number {
  const character: Character = CharactersByCP437[byte];
  if (character === undefined) {
    console.warn(`unknown CP437 key code: ${byte}`);
    return 0x00;
  } else {
    return character.utf16;
  }
}

export function convertDOMKeyToCP437(key): number {
  const character: Character = CharactersByDOMKey[key];
  if (character === undefined) {
    console.warn(`unknown DOM key: ${key}`);
    return 0x00;
  } else {
    return character.cp437;
  }
}
