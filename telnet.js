const IAC = 255;

export const commands = {
  255: 'IAC',
  254: 'DONT',
  253: 'DO',
  252: 'WONT',
  251: 'WILL',
  250: 'SB',
  240: 'SE'
};

export const options = {
  1: 'ECHO',
  3: 'SUPPRESS-GO-AHEAD'
};

/**
 * Reads through a byte array looking for Telnet commands, removing them.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export const parse = (buffer) => {
  if (buffer === undefined)
    throw new TypeError('buffer cannot be undefined');

  console.log('buffer:', buffer);

  for (let i = 0; i < buffer.length; ++i) {
    let isIAC = buffer[i] === IAC;
    let remainingBytes = buffer.length - (i + 1);
    let hasRoom = remainingBytes >= 2;
    if (isIAC && hasRoom) {
      let iac = buffer[i];
      let command = buffer[i+1];
      let option = buffer[i+2];
      buffer = buffer.slice(3);
      console.log('Telnet command received:', commandToString(iac, command, option));
    }
  }

  return buffer;
};

const commandToString = (iac, command, option) => {
  let output = [];
  output.push(commands[iac]);
  output.push(commands[command]);
  option = option.toString();
  let isKnownOption = option in Object.keys(options);
  if (isKnownOption)
    output.push(options[option]);
  else
    output.push(option);
  return output.join(' ');
};

const negotiate = (socket, buffer) => {
  let data = buffer;
  let command;
  let response;

  for (let i = 0; i < buffer.length; i += 3) {
    if (buffer[i] != 255) {
      data = buffer.slice(0, i);
      command = buffer.slice(i);
      break
    }
  }

  response = data.toString('hex')
    .replace(/fd/g, 'fc')
    .replace(/fb/g, 'fd');

  socket.write(Buffer(response, 'hex'));

  if (command !== undefined)
    return command;
};
