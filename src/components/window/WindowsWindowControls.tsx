import React, { ReactElement, Component } from 'react';
import CSS, { Pseudos } from 'csstype';
import WindowControls from './WindowControls';

type PropertiesAndPseudos = CSS.Properties & { [key in Pseudos]?: CSS.Properties };

export default class WindowsWindowControls extends Component <WindowControls> {

    private readonly buttonStyle: PropertiesAndPseudos

    constructor(props: WindowControls) {
        super(props);

        this.buttonStyle = {
            userSelect: 'none',
            display: 'flex',
            flex: '0 1 auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '46px',
            height: '32px',
            fontFamily: 'Segoe MDL2 Assets',
            fontSize: '10px',
            border: 0,
            borderRadius: 0,
            ':hover': {
                background: 'rgba(255,255,255,0.1)'
            },
            ':active': {
                background: 'rgba(255,255,255,0.2)'
            }
        };
    }

    buildMinimizeStyle(): PropertiesAndPseudos {
        return Object.assign({ order: 1 }, this.buttonStyle);
    }

    buildMaximizeStyle(): PropertiesAndPseudos {
        const style: PropertiesAndPseudos = {};

        if (this.props.isMaximized()) {
            style.display = 'none !important';
        } else {
            style.display = 'flex !important';
        }

        return Object.assign({ order: 2 }, this.buttonStyle);
    }

    buildRestoreStyle(): PropertiesAndPseudos {
        const style: PropertiesAndPseudos = {};

        if (this.props.isMaximized()) {
            style.display = 'flex !important';
        } else {
            style.display = 'none !important';
        }

        return Object.assign({ order: 2 }, style, this.buttonStyle);
    }

    buildCloseStyle(): PropertiesAndPseudos {
        const style = {
            order: 3,
            ':hover': {
                background: '#E81123 !important'
            },
            ':active': {
                background: '#F1707A !important'
            }
        }
        return Object.assign(style, this.buttonStyle);
    }

    render(): ReactElement {
        return (
            <div id='window-controls' style={{
                display: 'flex',
                order: 2
            }}>
                <button id='minimize-button' style={this.buildMinimizeStyle()} onClick={this.props.minimize}>&#xE921;</button>
                <button id='maximize-button' style={this.buildMaximizeStyle()} onClick={this.props.maximize}>&#xE922;</button>
                <button id='restore-button' style={this.buildRestoreStyle()} onClick={this.props.restore}>&#xE923;</button>
                <button id='close-button' style={this.buildCloseStyle()} onClick={this.props.close}>&#xE8BB;</button>
            </div>
        );
    }
}
