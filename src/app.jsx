import React from 'react';
import Terminal from './terminal.jsx';

const address = 'mud.nocturnalreign.org';
const port = 55999;

const App = () => (
  <Terminal host={address} port={port} />
);

export default App;
