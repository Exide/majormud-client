import React, { ReactElement } from 'react';
import Window from './Window';
import WindowTitle from './WindowTitle';

export default class LinuxWindow extends Window {
    render(): ReactElement {
        return (
            <div id='window'>
                <div id='window-title-bar'>
                    <WindowTitle align='center' />
                </div>
                <div id='window-content'>
                    { this.props.children }
                </div>
            </div>
        );
    }
}
