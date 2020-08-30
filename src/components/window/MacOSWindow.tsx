import React, { ReactElement } from 'react';
import Window from './Window';
import WindowTitle from './WindowTitle';

export default class MacOSWindow extends Window {
    render(): ReactElement {
        return (
            <div id='window'>
                <div id='window-title-bar' onDoubleClick={this.toggleMaximize}>
                    <WindowTitle align='center' />
                </div>
                <div id='window-content'>
                    { this.props.children }
                </div>
            </div>
        );
    }
}
