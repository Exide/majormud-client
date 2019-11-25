import fixture from './fixtures/training.json';
import * as telnet from '../src/telnet';
import * as ansi from '../src/ansi';
import * as utils from '../src/utils';

test('training interface', () => {
  const bytes = Buffer.from(fixture);

  [ utils.buildRawMessage(bytes) ]
    .flatMap(telnet.parse)
    .flatMap(ansi.parse)
    .forEach(message => {
      // todo: something?
    });
});
