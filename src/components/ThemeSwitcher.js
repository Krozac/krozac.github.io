import React from 'react';

const ThemeSwitcher = () => {
    const changeTheme = (theme) => {
        const root = document.documentElement;

        document.getElementById("theme-clair").classList.remove("radioselected");
        document.getElementById("theme-sombre").classList.remove("radioselected");

        if (theme === 'clair') {
            root.style.setProperty('--c-bg', 'rgb(230, 230, 230)');
            root.style.setProperty('--c-bg-dark', 'rgb(210, 210, 210)');
            document.getElementById("theme-clair").classList.add("radioselected");
        } else {
            root.style.setProperty('--c-bg', 'rgb(46, 46, 46)');
            root.style.setProperty('--c-bg-dark', 'rgb(23, 23, 23)');
            document.getElementById("theme-sombre").classList.add("radioselected");
        }
    };

    return (
        <div id="Theme">
            <span className="radio-box" id="theme-clair" onClick={() => changeTheme('clair')}></span><p>CLAIR</p>
            <span className="radio-box radioselected" id="theme-sombre" onClick={() => changeTheme('sombre')}></span><p>SOMBRE</p>
        </div>
    );
}

export default ThemeSwitcher;
