import React, { useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface ProviderProps {
    children?: React.ReactElement;
}

export default class DarkModeContextProvider extends React.PureComponent<ProviderProps> {

    state = {
        currentTheme: 'light'
    }

    setTheme = (theme: string) => {
        console.log(theme);

        this.setState(() => {
            return { currentTheme: theme }
        });
    }

    render() {

        const { currentTheme } = this.state;
        console.log(currentTheme);


        return (
            <ThemeContext.Provider
                value=
                {{
                    currentTheme,
                    setThemeMode: this.setTheme,
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}