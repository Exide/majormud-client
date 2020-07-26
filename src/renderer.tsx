import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../resources/base.css';
import '../resources/theme.css';

import Window from './components/Window';

const rootComponent = (<Window><App/></Window>);
const rootElement = document.getElementById('root');

ReactDOM.render(rootComponent, rootElement);
