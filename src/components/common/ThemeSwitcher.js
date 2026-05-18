import React from 'react';
import { setTheme } from '../../utils/theme';

const ThemeSwitcher = () => {
    return (
        <div id="Theme">
            <span
                className="radio-box"
                id="theme-clair"
                onClick={() => setTheme('light')}
            ></span>

            <p>CLAIR</p>

            <span
                className="radio-box radioselected"
                id="theme-sombre"
                onClick={() => setTheme('dark')}
            ></span>

            <p>SOMBRE</p>
        </div>
    );
}

export default ThemeSwitcher;