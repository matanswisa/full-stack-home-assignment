import React, { useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface ProviderProps {
    children?: React.ReactElement;
}

interface ProviderState {
    darkMode: boolean;
}

export default class DarkModeContextProvider extends React.PureComponent<ProviderProps, ProviderState> {

    state = {
        darkMode: false
    }

    toggleDarkMode = () => {
        if (!this.state.darkMode) document.body.style.backgroundColor = 'black';
        else document.body.style.backgroundColor = 'white';

        this.setState(() => {
            return { darkMode: !this.state.darkMode }
        });
    }

    render() {

        const { darkMode } = this.state;
        console.log(darkMode);


        return (
            <ThemeContext.Provider
                value=
                {{
                    darkMode,
                    toggleDarkMode: this.toggleDarkMode,
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}