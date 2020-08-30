import React, { ReactElement, Component } from 'react';
import CSS from 'csstype';

interface WindowTitleProps {
    align: 'left' | 'center'
}

export default class WindowTitle extends Component<WindowTitleProps> {
    render(): ReactElement {
        const style: CSS.Properties = {
            display: 'flex',
            flex: '1 0 auto',
            order: 1,
            alignContent: 'center'
        };

        if (this.props.align === 'left') {
            style.justifyContent = 'start';
        } else {
            style.justifyContent = 'center';
        }

        return (
            <div id='window-title' style={style}>
                <img alt='MajorMUD Client' src={ require('../../../resources/title.png') } />
            </div>
        );
    }
}
