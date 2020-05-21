import { parseRawMessage, SGRParameters, EscapeSequences } from './ansi';
import { Message, MessageType } from './message';
import { readFileSync } from 'fs';
import path from 'path';
import moment from 'moment';

describe('parseRawMessage', () => {

  test('return original message if its not raw', () => {
    const buffer = Buffer.from([ 0, 1, 2 ]);
    const message: Message = {
      type: MessageType.ANSI,
      timestamp: moment.utc(),
      bytes: buffer,
      string: buffer.toString()
    };
    const value = parseRawMessage(message);
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
    const value = parseRawMessage(message);
    expect(value).toHaveLength(20);
    expect(value[0]).toMatchObject({ type: MessageType.ANSI });
    expect(value[1]).toMatchObject({ type: MessageType.ANSI });
    expect(value[2]).toMatchObject({ type: MessageType.ANSI });
    expect(value[3]).toMatchObject({ type: MessageType.ANSI });
    expect(value[4]).toMatchObject({ type: MessageType.Raw, string: 'You are carrying 167 gold crowns, 4 silver nobles, 17 copper farthings, astral\nslippers (Feet), silver hood (Head), astral robes (Torso), fingerbone bracelet\n(Wrist), silver bracelet (Wrist), fine platinum chain (Waist), elven cloak\n(Back), prismatic trousers (Legs), silver bracers (Arms), moonstone ring\n(Finger), diamond overcloak (Worn), silver gloves (Hands), oaken staff (Weapon\nHand), quest medallion, rope and grapple, pristine scroll\n' });
    expect(value[5]).toMatchObject({ type: MessageType.ANSI });
    expect(value[6]).toMatchObject({ type: MessageType.ANSI });
    expect(value[7]).toMatchObject({ type: MessageType.ANSI });
    expect(value[8]).toMatchObject({ type: MessageType.Raw, string: 'You have no keys.\n' });
    expect(value[9]).toMatchObject({ type: MessageType.ANSI });
    expect(value[10]).toMatchObject({ type: MessageType.Raw, string: 'Wealth: ' });
    expect(value[11]).toMatchObject({ type: MessageType.ANSI });
    expect(value[12]).toMatchObject({ type: MessageType.Raw, string: '16757 copper farthings\n' });
    expect(value[13]).toMatchObject({ type: MessageType.ANSI });
    expect(value[14]).toMatchObject({ type: MessageType.Raw, string: 'Encumbrance: ' });
    expect(value[15]).toMatchObject({ type: MessageType.ANSI });
    expect(value[16]).toMatchObject({ type: MessageType.Raw, string: '683/2640 - ' });
    expect(value[17]).toMatchObject({ type: MessageType.ANSI });
    expect(value[18]).toMatchObject({ type: MessageType.Raw, string: 'Light [25%]' });
    expect(value[19]).toMatchObject({ type: MessageType.ANSI, parsed: [ EscapeSequences.SelectGraphicRendition, SGRParameters.SetBackgroundExtended ] });
  });

});
