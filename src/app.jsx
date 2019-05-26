import React from 'react';
import Terminal from './terminal.jsx';

const address = 'mud.nocturnalreign.org';

const App = () => (
  <div>
    <Terminal host={address}/>
  </div>
);

export default App;
