import React, { useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

// import ThemeConsumer

interface Props {
    onChange?: () => void;
}

export default class DarkModeToggle extends React.PureComponent<Props>{


    render() {
        return (
            <ThemeContext.Consumer>{({ currentTheme, setThemeMode }) => {
                return (
                    <>
                        {currentTheme === 'light' ? 'light mode' : 'dark mode'}
                        <label className="switch">
                            <input type="checkbox" onChange={() => {
                                setThemeMode(currentTheme == 'light' ? 'dark' : 'light');
                            }} />


                            <span className="slider round"></span>
                        </label>
                    </>
                )
            }}
            </ThemeContext.Consumer>

        )
    }


}