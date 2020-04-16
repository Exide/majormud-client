import * as telnet from './telnet';
import * as utils from './utils';

export default class StreamParser {

  constructor() {
    // this.buffer = new Buffer();
  }

  parse(bytes) {
    // return [ utils.buildRawMessage(bytes) ]
    //   .flatMap(telnet.parse)
    //   .filter(m => m.type === 'raw');

    return bytes;
  }

}
