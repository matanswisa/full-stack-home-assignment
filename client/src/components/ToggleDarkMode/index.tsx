import React, { useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

// import ThemeConsumer

interface Props {
    onChange?: () => void;
}

export default class DarkModeToggle extends React.PureComponent<Props>{


    render() {
        return (
            <ThemeContext.Consumer>{({ darkMode, toggleDarkMode }) => {
                return (
                    <>
                        {darkMode ? 'dark mode' : 'light mode'}
                        <label className="switch">
                            <input type="checkbox" onChange={() => {
                                toggleDarkMode();
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