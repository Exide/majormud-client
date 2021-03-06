// https://en.wikipedia.org/wiki/Code_page_437
// ftp://ftp.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/PC/CP437.TXT

export const KeyCodes = {
  0x00:	{ utf8: 0x0000, name: 'Null' },
  0x01:	{ utf8: 0x0001, name: 'StartOfHeading' },
  0x02:	{ utf8: 0x0002, name: 'StartOfText' },
  0x03:	{ utf8: 0x0003, name: 'EndOfText' },
  0x04:	{ utf8: 0x0004, name: 'EndOfTransmission' },
  0x05:	{ utf8: 0x0005, name: 'Enquiry' },
  0x06:	{ utf8: 0x0006, name: 'Acknowledge' },
  0x07:	{ utf8: 0x0007, name: 'Bell' },
  0x08:	{ utf8: 0x0008, name: 'Backspace' },
  0x09:	{ utf8: 0x0009, name: 'HorizontalTabulation' },
  0x0a:	{ utf8: 0x000a, name: 'LineFeed' },
  0x0b:	{ utf8: 0x000b, name: 'VerticalTabulation' },
  0x0c:	{ utf8: 0x000c, name: 'FormFeed' },
  0x0d:	{ utf8: 0x000d, name: 'CarriageReturn' },
  0x0e:	{ utf8: 0x000e, name: 'ShiftOut' },
  0x0f:	{ utf8: 0x000f, name: 'ShiftIn' },
  0x10:	{ utf8: 0x0010, name: 'DataLinkEscape' },
  0x11:	{ utf8: 0x0011, name: 'DeviceControlOne' },
  0x12:	{ utf8: 0x0012, name: 'DeviceControlTwo' },
  0x13:	{ utf8: 0x0013, name: 'DeviceControlThree' },
  0x14:	{ utf8: 0x0014, name: 'DeviceControlFour' },
  0x15:	{ utf8: 0x0015, name: 'NegativeAcknowledge' },
  0x16:	{ utf8: 0x0016, name: 'SynchronousIdle' },
  0x17:	{ utf8: 0x0017, name: 'EndOfTransmissionBlock' },
  0x18:	{ utf8: 0x0018, name: 'Cancel' },
  0x19:	{ utf8: 0x0019, name: 'EndOfMedium' },
  0x1a:	{ utf8: 0x001a, name: 'Substitute' },
  0x1b:	{ utf8: 0x001b, name: 'Escape' },
  0x1c:	{ utf8: 0x001c, name: 'FileSeparator' },
  0x1d:	{ utf8: 0x001d, name: 'GroupSeparator' },
  0x1e:	{ utf8: 0x001e, name: 'RecordSeparator' },
  0x1f:	{ utf8: 0x001f, name: 'UnitSeparator' },
  0x20:	{ utf8: 0x0020, name: 'Space' },
  0x21:	{ utf8: 0x0021, name: 'ExclamationMark' },
  0x22:	{ utf8: 0x0022, name: 'QuotationMark' },
  0x23:	{ utf8: 0x0023, name: 'NumberSign' },
  0x24:	{ utf8: 0x0024, name: 'DollarSign' },
  0x25:	{ utf8: 0x0025, name: 'PercentSign' },
  0x26:	{ utf8: 0x0026, name: 'Ampersand' },
  0x27:	{ utf8: 0x0027, name: 'Apostrophe' },
  0x28:	{ utf8: 0x0028, name: 'LeftParenthesis' },
  0x29:	{ utf8: 0x0029, name: 'RightParenthesis' },
  0x2a:	{ utf8: 0x002a, name: 'Asterisk' },
  0x2b:	{ utf8: 0x002b, name: 'PlusSign' },
  0x2c:	{ utf8: 0x002c, name: 'Comma' },
  0x2d:	{ utf8: 0x002d, name: 'HyphenMinus' },
  0x2e:	{ utf8: 0x002e, name: 'FullStop' },
  0x2f:	{ utf8: 0x002f, name: 'Solidus' },
  0x30:	{ utf8: 0x0030, name: 'DigitZero' },
  0x31:	{ utf8: 0x0031, name: 'DigitOne' },
  0x32:	{ utf8: 0x0032, name: 'DigitTwo' },
  0x33:	{ utf8: 0x0033, name: 'DigitThree' },
  0x34:	{ utf8: 0x0034, name: 'DigitFour' },
  0x35:	{ utf8: 0x0035, name: 'DigitFive' },
  0x36:	{ utf8: 0x0036, name: 'DigitSix' },
  0x37:	{ utf8: 0x0037, name: 'DigitSeven' },
  0x38:	{ utf8: 0x0038, name: 'DigitEight' },
  0x39:	{ utf8: 0x0039, name: 'DigitNine' },
  0x3a:	{ utf8: 0x003a, name: 'Colon' },
  0x3b:	{ utf8: 0x003b, name: 'Semicolon' },
  0x3c:	{ utf8: 0x003c, name: 'LessThanSign' },
  0x3d:	{ utf8: 0x003d, name: 'EqualsSign' },
  0x3e:	{ utf8: 0x003e, name: 'GreaterThanSign' },
  0x3f:	{ utf8: 0x003f, name: 'QuestionMark' },
  0x40:	{ utf8: 0x0040, name: 'CommercialAt' },
  0x41:	{ utf8: 0x0041, name: 'LatinCapitalLetterA' },
  0x42:	{ utf8: 0x0042, name: 'LatinCapitalLetterB' },
  0x43:	{ utf8: 0x0043, name: 'LatinCapitalLetterC' },
  0x44:	{ utf8: 0x0044, name: 'LatinCapitalLetterD' },
  0x45:	{ utf8: 0x0045, name: 'LatinCapitalLetterE' },
  0x46:	{ utf8: 0x0046, name: 'LatinCapitalLetterF' },
  0x47:	{ utf8: 0x0047, name: 'LatinCapitalLetterG' },
  0x48:	{ utf8: 0x0048, name: 'LatinCapitalLetterH' },
  0x49:	{ utf8: 0x0049, name: 'LatinCapitalLetterI' },
  0x4a:	{ utf8: 0x004a, name: 'LatinCapitalLetterJ' },
  0x4b:	{ utf8: 0x004b, name: 'LatinCapitalLetterK' },
  0x4c:	{ utf8: 0x004c, name: 'LatinCapitalLetterL' },
  0x4d:	{ utf8: 0x004d, name: 'LatinCapitalLetterM' },
  0x4e:	{ utf8: 0x004e, name: 'LatinCapitalLetterN' },
  0x4f:	{ utf8: 0x004f, name: 'LatinCapitalLetterO' },
  0x50:	{ utf8: 0x0050, name: 'LatinCapitalLetterP' },
  0x51:	{ utf8: 0x0051, name: 'LatinCapitalLetterQ' },
  0x52:	{ utf8: 0x0052, name: 'LatinCapitalLetterR' },
  0x53:	{ utf8: 0x0053, name: 'LatinCapitalLetterS' },
  0x54:	{ utf8: 0x0054, name: 'LatinCapitalLetterT' },
  0x55:	{ utf8: 0x0055, name: 'LatinCapitalLetterU' },
  0x56:	{ utf8: 0x0056, name: 'LatinCapitalLetterV' },
  0x57:	{ utf8: 0x0057, name: 'LatinCapitalLetterW' },
  0x58:	{ utf8: 0x0058, name: 'LatinCapitalLetterX' },
  0x59:	{ utf8: 0x0059, name: 'LatinCapitalLetterY' },
  0x5a:	{ utf8: 0x005a, name: 'LatinCapitalLetterZ' },
  0x5b:	{ utf8: 0x005b, name: 'LeftSquareBracket' },
  0x5c:	{ utf8: 0x005c, name: 'ReverseSolidus' },
  0x5d:	{ utf8: 0x005d, name: 'RightSquareBracket' },
  0x5e:	{ utf8: 0x005e, name: 'CircumflexAccent' },
  0x5f:	{ utf8: 0x005f, name: 'LowLine' },
  0x60:	{ utf8: 0x0060, name: 'GraveAccent' },
  0x61:	{ utf8: 0x0061, name: 'LatinSmallLetterA' },
  0x62:	{ utf8: 0x0062, name: 'LatinSmallLetterB' },
  0x63:	{ utf8: 0x0063, name: 'LatinSmallLetterC' },
  0x64:	{ utf8: 0x0064, name: 'LatinSmallLetterD' },
  0x65:	{ utf8: 0x0065, name: 'LatinSmallLetterE' },
  0x66:	{ utf8: 0x0066, name: 'LatinSmallLetterF' },
  0x67:	{ utf8: 0x0067, name: 'LatinSmallLetterG' },
  0x68:	{ utf8: 0x0068, name: 'LatinSmallLetterH' },
  0x69:	{ utf8: 0x0069, name: 'LatinSmallLetterI' },
  0x6a:	{ utf8: 0x006a, name: 'LatinSmallLetterJ' },
  0x6b:	{ utf8: 0x006b, name: 'LatinSmallLetterK' },
  0x6c:	{ utf8: 0x006c, name: 'LatinSmallLetterL' },
  0x6d:	{ utf8: 0x006d, name: 'LatinSmallLetterM' },
  0x6e:	{ utf8: 0x006e, name: 'LatinSmallLetterN' },
  0x6f:	{ utf8: 0x006f, name: 'LatinSmallLetterO' },
  0x70:	{ utf8: 0x0070, name: 'LatinSmallLetterP' },
  0x71:	{ utf8: 0x0071, name: 'LatinSmallLetterQ' },
  0x72:	{ utf8: 0x0072, name: 'LatinSmallLetterR' },
  0x73:	{ utf8: 0x0073, name: 'LatinSmallLetterS' },
  0x74:	{ utf8: 0x0074, name: 'LatinSmallLetterT' },
  0x75:	{ utf8: 0x0075, name: 'LatinSmallLetterU' },
  0x76:	{ utf8: 0x0076, name: 'LatinSmallLetterV' },
  0x77:	{ utf8: 0x0077, name: 'LatinSmallLetterW' },
  0x78:	{ utf8: 0x0078, name: 'LatinSmallLetterX' },
  0x79:	{ utf8: 0x0079, name: 'LatinSmallLetterY' },
  0x7a:	{ utf8: 0x007a, name: 'LatinSmallLetterZ' },
  0x7b:	{ utf8: 0x007b, name: 'LeftCurlyBracket' },
  0x7c:	{ utf8: 0x007c, name: 'VerticalLine' },
  0x7d:	{ utf8: 0x007d, name: 'RightCurlyBracket' },
  0x7e:	{ utf8: 0x007e, name: 'Tilde' },
  0x7f:	{ utf8: 0x007f, name: 'Delete' },
  0x80:	{ utf8: 0x00c7, name: 'LatinCapitalLetterCWithCedilla' },
  0x81:	{ utf8: 0x00fc, name: 'LatinSmallLetterUWithDiaeresis' },
  0x82:	{ utf8: 0x00e9, name: 'LatinSmallLetterEWithAcute' },
  0x83:	{ utf8: 0x00e2, name: 'LatinSmallLetterAWithCircumflex' },
  0x84:	{ utf8: 0x00e4, name: 'LatinSmallLetterAWithDiaeresis' },
  0x85:	{ utf8: 0x00e0, name: 'LatinSmallLetterAWithGrave' },
  0x86:	{ utf8: 0x00e5, name: 'LatinSmallLetterAWithRingAbove' },
  0x87:	{ utf8: 0x00e7, name: 'LatinSmallLetterCWithCedilla' },
  0x88:	{ utf8: 0x00ea, name: 'LatinSmallLetterEWithCircumflex' },
  0x89:	{ utf8: 0x00eb, name: 'LatinSmallLetterEWithDiaeresis' },
  0x8a:	{ utf8: 0x00e8, name: 'LatinSmallLetterEWithGrave' },
  0x8b:	{ utf8: 0x00ef, name: 'LatinSmallLetterIWithDiaeresis' },
  0x8c:	{ utf8: 0x00ee, name: 'LatinSmallLetterIWithCircumflex' },
  0x8d:	{ utf8: 0x00ec, name: 'LatinSmallLetterIWithGrave' },
  0x8e:	{ utf8: 0x00c4, name: 'LatinCapitalLetterAWithDiaeresis' },
  0x8f:	{ utf8: 0x00c5, name: 'LatinCapitalLetterAWithRingAbove' },
  0x90:	{ utf8: 0x00c9, name: 'LatinCapitalLetterEWithAcute' },
  0x91:	{ utf8: 0x00e6, name: 'LatinSmallLigatureAe' },
  0x92:	{ utf8: 0x00c6, name: 'LatinCapitalLigatureAe' },
  0x93:	{ utf8: 0x00f4, name: 'LatinSmallLetterOWithCircumflex' },
  0x94:	{ utf8: 0x00f6, name: 'LatinSmallLetterOWithDiaeresis' },
  0x95:	{ utf8: 0x00f2, name: 'LatinSmallLetterOWithGrave' },
  0x96:	{ utf8: 0x00fb, name: 'LatinSmallLetterUWithCircumflex' },
  0x97:	{ utf8: 0x00f9, name: 'LatinSmallLetterUWithGrave' },
  0x98:	{ utf8: 0x00ff, name: 'LatinSmallLetterYWithDiaeresis' },
  0x99:	{ utf8: 0x00d6, name: 'LatinCapitalLetterOWithDiaeresis' },
  0x9a:	{ utf8: 0x00dc, name: 'LatinCapitalLetterUWithDiaeresis' },
  0x9b:	{ utf8: 0x00a2, name: 'CentSign' },
  0x9c:	{ utf8: 0x00a3, name: 'PoundSign' },
  0x9d:	{ utf8: 0x00a5, name: 'YenSign' },
  0x9e:	{ utf8: 0x20a7, name: 'PesetaSign' },
  0x9f:	{ utf8: 0x0192, name: 'LatinSmallLetterFWithHook' },
  0xa0:	{ utf8: 0x00e1, name: 'LatinSmallLetterAWithAcute' },
  0xa1:	{ utf8: 0x00ed, name: 'LatinSmallLetterIWithAcute' },
  0xa2:	{ utf8: 0x00f3, name: 'LatinSmallLetterOWithAcute' },
  0xa3:	{ utf8: 0x00fa, name: 'LatinSmallLetterUWithAcute' },
  0xa4:	{ utf8: 0x00f1, name: 'LatinSmallLetterNWithTilde' },
  0xa5:	{ utf8: 0x00d1, name: 'LatinCapitalLetterNWithTilde' },
  0xa6:	{ utf8: 0x00aa, name: 'FeminineOrdinalIndicator' },
  0xa7:	{ utf8: 0x00ba, name: 'MasculineOrdinalIndicator' },
  0xa8:	{ utf8: 0x00bf, name: 'InvertedQuestionMark' },
  0xa9:	{ utf8: 0x2310, name: 'ReversedNotSign' },
  0xaa:	{ utf8: 0x00ac, name: 'NotSign' },
  0xab:	{ utf8: 0x00bd, name: 'VulgarFractionOneHalf' },
  0xac:	{ utf8: 0x00bc, name: 'VulgarFractionOneQuarter' },
  0xad:	{ utf8: 0x00a1, name: 'InvertedExclamationMark' },
  0xae:	{ utf8: 0x00ab, name: 'LeftPointingDoubleAngleQuotationMark' },
  0xaf:	{ utf8: 0x00bb, name: 'RightPointingDoubleAngleQuotationMark' },
  0xb0:	{ utf8: 0x2591, name: 'LightShade' },
  0xb1:	{ utf8: 0x2592, name: 'MediumShade' },
  0xb2:	{ utf8: 0x2593, name: 'DarkShade' },
  0xb3:	{ utf8: 0x2502, name: 'BoxDrawingsLightVertical' },
  0xb4:	{ utf8: 0x2524, name: 'BoxDrawingsLightVerticalAndLeft' },
  0xb5:	{ utf8: 0x2561, name: 'BoxDrawingsVerticalSingleAndLeftDouble' },
  0xb6:	{ utf8: 0x2562, name: 'BoxDrawingsVerticalDoubleAndLeftSingle' },
  0xb7:	{ utf8: 0x2556, name: 'BoxDrawingsDownDoubleAndLeftSingle' },
  0xb8:	{ utf8: 0x2555, name: 'BoxDrawingsDownSingleAndLeftDouble' },
  0xb9:	{ utf8: 0x2563, name: 'BoxDrawingsDoubleVerticalAndLeft' },
  0xba:	{ utf8: 0x2551, name: 'BoxDrawingsDoubleVertical' },
  0xbb:	{ utf8: 0x2557, name: 'BoxDrawingsDoubleDownAndLeft' },
  0xbc:	{ utf8: 0x255d, name: 'BoxDrawingsDoubleUpAndLeft' },
  0xbd:	{ utf8: 0x255c, name: 'BoxDrawingsUpDoubleAndLeftSingle' },
  0xbe:	{ utf8: 0x255b, name: 'BoxDrawingsUpSingleAndLeftDouble' },
  0xbf:	{ utf8: 0x2510, name: 'BoxDrawingsLightDownAndLeft' },
  0xc0:	{ utf8: 0x2514, name: 'BoxDrawingsLightUpAndRight' },
  0xc1:	{ utf8: 0x2534, name: 'BoxDrawingsLightUpAndHorizontal' },
  0xc2:	{ utf8: 0x252c, name: 'BoxDrawingsLightDownAndHorizontal' },
  0xc3:	{ utf8: 0x251c, name: 'BoxDrawingsLightVerticalAndRight' },
  0xc4:	{ utf8: 0x2500, name: 'BoxDrawingsLightHorizontal' },
  0xc5:	{ utf8: 0x253c, name: 'BoxDrawingsLightVerticalAndHorizontal' },
  0xc6:	{ utf8: 0x255e, name: 'BoxDrawingsVerticalSingleAndRightDouble' },
  0xc7:	{ utf8: 0x255f, name: 'BoxDrawingsVerticalDoubleAndRightSingle' },
  0xc8:	{ utf8: 0x255a, name: 'BoxDrawingsDoubleUpAndRight' },
  0xc9:	{ utf8: 0x2554, name: 'BoxDrawingsDoubleDownAndRight' },
  0xca:	{ utf8: 0x2569, name: 'BoxDrawingsDoubleUpAndHorizontal' },
  0xcb:	{ utf8: 0x2566, name: 'BoxDrawingsDoubleDownAndHorizontal' },
  0xcc:	{ utf8: 0x2560, name: 'BoxDrawingsDoubleVerticalAndRight' },
  0xcd:	{ utf8: 0x2550, name: 'BoxDrawingsDoubleHorizontal' },
  0xce:	{ utf8: 0x256c, name: 'BoxDrawingsDoubleVerticalAndHorizontal' },
  0xcf:	{ utf8: 0x2567, name: 'BoxDrawingsUpSingleAndHorizontalDouble' },
  0xd0:	{ utf8: 0x2568, name: 'BoxDrawingsUpDoubleAndHorizontalSingle' },
  0xd1:	{ utf8: 0x2564, name: 'BoxDrawingsDownSingleAndHorizontalDouble' },
  0xd2:	{ utf8: 0x2565, name: 'BoxDrawingsDownDoubleAndHorizontalSingle' },
  0xd3:	{ utf8: 0x2559, name: 'BoxDrawingsUpDoubleAndRightSingle' },
  0xd4:	{ utf8: 0x2558, name: 'BoxDrawingsUpSingleAndRightDouble' },
  0xd5:	{ utf8: 0x2552, name: 'BoxDrawingsDownSingleAndRightDouble' },
  0xd6:	{ utf8: 0x2553, name: 'BoxDrawingsDownDoubleAndRightSingle' },
  0xd7:	{ utf8: 0x256b, name: 'BoxDrawingsVerticalDoubleAndHorizontalSingle' },
  0xd8:	{ utf8: 0x256a, name: 'BoxDrawingsVerticalSingleAndHorizontalDouble' },
  0xd9:	{ utf8: 0x2518, name: 'BoxDrawingsLightUpAndLeft' },
  0xda:	{ utf8: 0x250c, name: 'BoxDrawingsLightDownAndRight' },
  0xdb:	{ utf8: 0x2588, name: 'FullBlock' },
  0xdc:	{ utf8: 0x2584, name: 'LowerHalfBlock' },
  0xdd:	{ utf8: 0x258c, name: 'LeftHalfBlock' },
  0xde:	{ utf8: 0x2590, name: 'RightHalfBlock' },
  0xdf:	{ utf8: 0x2580, name: 'UpperHalfBlock' },
  0xe0:	{ utf8: 0x03b1, name: 'GreekSmallLetterAlpha' },
  0xe1:	{ utf8: 0x00df, name: 'LatinSmallLetterSharpS' },
  0xe2:	{ utf8: 0x0393, name: 'GreekCapitalLetterGamma' },
  0xe3:	{ utf8: 0x03c0, name: 'GreekSmallLetterPi' },
  0xe4:	{ utf8: 0x03a3, name: 'GreekCapitalLetterSigma' },
  0xe5:	{ utf8: 0x03c3, name: 'GreekSmallLetterSigma' },
  0xe6:	{ utf8: 0x00b5, name: 'MicroSign' },
  0xe7:	{ utf8: 0x03c4, name: 'GreekSmallLetterTau' },
  0xe8:	{ utf8: 0x03a6, name: 'GreekCapitalLetterPhi' },
  0xe9:	{ utf8: 0x0398, name: 'GreekCapitalLetterTheta' },
  0xea:	{ utf8: 0x03a9, name: 'GreekCapitalLetterOmega' },
  0xeb:	{ utf8: 0x03b4, name: 'GreekSmallLetterDelta' },
  0xec:	{ utf8: 0x221e, name: 'Infinity' },
  0xed:	{ utf8: 0x03c6, name: 'GreekSmallLetterPhi' },
  0xee:	{ utf8: 0x03b5, name: 'GreekSmallLetterEpsilon' },
  0xef:	{ utf8: 0x2229, name: 'Intersection' },
  0xf0:	{ utf8: 0x2261, name: 'IdenticalTo' },
  0xf1:	{ utf8: 0x00b1, name: 'PlusMinusSign' },
  0xf2:	{ utf8: 0x2265, name: 'GreaterThanOrEqualTo' },
  0xf3:	{ utf8: 0x2264, name: 'LessThanOrEqualTo' },
  0xf4:	{ utf8: 0x2320, name: 'TopHalfIntegral' },
  0xf5:	{ utf8: 0x2321, name: 'BottomHalfIntegral' },
  0xf6:	{ utf8: 0x00f7, name: 'DivisionSign' },
  0xf7:	{ utf8: 0x2248, name: 'AlmostEqualTo' },
  0xf8:	{ utf8: 0x00b0, name: 'DegreeSign' },
  0xf9:	{ utf8: 0x2219, name: 'BulletOperator' },
  0xfa:	{ utf8: 0x00b7, name: 'MiddleDot' },
  0xfb:	{ utf8: 0x221a, name: 'SquareRoot' },
  0xfc:	{ utf8: 0x207f, name: 'SuperscriptLatinSmallLetterN' },
  0xfd:	{ utf8: 0x00b2, name: 'SuperscriptTwo' },
  0xfe:	{ utf8: 0x25a0, name: 'BlackSquare' },
  0xff:	{ utf8: 0x00a0, name: 'NoBreakSpace' }
};
