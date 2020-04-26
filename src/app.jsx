import React from 'react';
import Session from './session.jsx';

const address = 'mud.nocturnalreign.org';
const port = 55999;

const App = () => (
  <Session address={address} port={port} />
);

export default App;
