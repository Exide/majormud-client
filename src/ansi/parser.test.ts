import parse from './parser';
import { Message, MessageType } from '../message';
import { EscapeSequencesByName } from './escapeSequences';
import { SelectGraphicRenditionParameters } from './selectGraphicRendition';
import { readFileSync } from 'fs';
import path from 'path';
import moment from 'moment';

test('return original message if its not raw', () => {
  const buffer = Buffer.from([ 0, 1, 2 ]);
  const message: Message = {
    type: MessageType.ANSI,
    timestamp: moment.utc(),
    bytes: buffer,
    string: buffer.toString()
  };
  const value = parse(message);
  expect(value).toHaveLength(1);
  expect(value[0]).toBe(message);
});

test('correctly parses inventory', async () => {
  const fixturePath = path.resolve('tests/fixtures/inventory.cp437');
  const fixture = readFileSync(fixturePath);
  const message: Message = {
    type: MessageType.Raw,
    timestamp: moment.utc(),
    bytes: fixture,
    string: fixture.toString()
  };
  const value = parse(message);
  expect(value).toHaveLength(20);
  expect(value[0]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48, 59, 51, 55, 59, 52, 48 ] });
  expect(value[1]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48, 59, 51, 55, 59, 52, 48 ] });
  expect(value[2]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'CursorBackward', 55, 57 ] });
  expect(value[3]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'EraseLine' ] });
  expect(value[4]).toMatchObject({ type: MessageType.Raw, string: 'You are carrying 167 gold crowns, 4 silver nobles, 17 copper farthings, astral\nslippers (Feet), silver hood (Head), astral robes (Torso), fingerbone bracelet\n(Wrist), silver bracelet (Wrist), fine platinum chain (Waist), elven cloak\n(Back), prismatic trousers (Legs), silver bracers (Arms), moonstone ring\n(Finger), diamond overcloak (Worn), silver gloves (Hands), oaken staff (Weapon\nHand), quest medallion, rope and grapple, pristine scroll\n' });
  expect(value[5]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'CursorBackward', 55, 57 ] });
  expect(value[6]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'EraseLine' ] });
  expect(value[7]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48, 59, 51, 55, 59, 52, 48 ] });
  expect(value[8]).toMatchObject({ type: MessageType.Raw, string: 'You have no keys.\n' });
  expect(value[9]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48, 59, 51, 50 ] });
  expect(value[10]).toMatchObject({ type: MessageType.Raw, string: 'Wealth: ' });
  expect(value[11]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 51, 54 ] });
  expect(value[12]).toMatchObject({ type: MessageType.Raw, string: '16757 copper farthings\n' });
  expect(value[13]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48, 59, 51, 50 ] });
  expect(value[14]).toMatchObject({ type: MessageType.Raw, string: 'Encumbrance: ' });
  expect(value[15]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 51, 54 ] });
  expect(value[16]).toMatchObject({ type: MessageType.Raw, string: '683/2640 - ' });
  expect(value[17]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 51, 50 ] });
  expect(value[18]).toMatchObject({ type: MessageType.Raw, string: 'Light [25%]' });
  expect(value[19]).toMatchObject({ type: MessageType.ANSI, parsed: [ 'SelectGraphicRendition', 48 ] });
});

test('displays the train stats characters/layout correctly', async () => {
  const fixturePath = path.resolve('tests/fixtures/train-stats.cp437');
  const fixture = readFileSync(fixturePath);
  const message: Message = {
    type: MessageType.Raw,
    timestamp: moment.utc(),
    bytes: fixture,
    string: fixture.toString()
  };
  const value = parse(message);
  expect(value).toHaveLength(352);
  expect(value[4]).toMatchObject({ type: MessageType.Raw, string:  '    .─────────────────────────────────────.──.\r\n       / ' });
  expect(value[6]).toMatchObject({ type: MessageType.Raw, string:  'M A J O R  M U D ' });
  expect(value[8]).toMatchObject({ type: MessageType.Raw, string:  'Character Creation ' });
  expect(value[10]).toMatchObject({ type: MessageType.Raw, string: '/    \\  ' });
  expect(value[12]).toMatchObject({ type: MessageType.Raw, string: '┌─    ' });
  expect(value[14]).toMatchObject({ type: MessageType.Raw, string: 'Point Cost Chart    ' });
  expect(value[16]).toMatchObject({ type: MessageType.Raw, string: '─┐\r\n  ' });
  expect(value[18]).toMatchObject({ type: MessageType.Raw, string: '│                                     ├──.   │ ' });
  expect(value[20]).toMatchObject({ type: MessageType.Raw, string: '│                          │\r\n  ' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
  // expect(value[]).toMatchObject({ type: MessageType.Raw, string: '' });
});
