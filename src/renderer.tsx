import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WindowsWindow from './components/window/WindowsWindow';
import MacOSWindow from './components/window/MacOSWindow';
import LinuxWindow from './components/window/LinuxWindow';
import os from 'os';

import '../resources/base.css';
import '../resources/theme.css';

const rootComponent = wrapWithPlatformSpecificWindow();
const rootElement = document.getElementById('root');

ReactDOM.render(rootComponent, rootElement);

function wrapWithPlatformSpecificWindow(): ReactElement {
    switch (os.platform()) {
        case 'win32': return <WindowsWindow><App/></WindowsWindow>
        case 'darwin': return <MacOSWindow><App/></MacOSWindow>
        default: return <LinuxWindow><App/></LinuxWindow>
    }
}
