import React, { ReactElement } from 'react';
import Window from './Window';
import WindowTitle from './WindowTitle';
import WindowsWindowControls from './WindowsWindowControls';

export default class WindowsWindow extends Window {
    render(): ReactElement {
        return (
            <div id='window'>
                <div id='window-title-bar'>
                    <WindowTitle align='left' />
                    <WindowsWindowControls
                        minimize={this.minimize}
                        maximize={this.maximize}
                        restore={this.restore}
                        close={this.close}
                        isMaximized={this.isMaximized}
                    />
                </div>
                <div id='window-content'>
                    { this.props.children }
                </div>
            </div>
        );
    }
}
