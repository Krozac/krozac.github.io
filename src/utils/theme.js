    export function setTheme(theme) {
    const root = document.documentElement;

    const clair = document.getElementById("theme-clair");
    const sombre = document.getElementById("theme-sombre");

    clair?.classList.remove("radioselected");
    sombre?.classList.remove("radioselected");

    if (theme === "light" || theme === "clair") {
        root.style.setProperty('--c-bg', 'rgb(230, 230, 230)');
        root.style.setProperty('--c-bg-dark', 'rgb(210, 210, 210)');

        clair?.classList.add("radioselected");

        return "Theme changed to light";
    }

    if (theme === "dark" || theme === "sombre") {
        root.style.setProperty('--c-bg', 'rgb(46, 46, 46)');
        root.style.setProperty('--c-bg-dark', 'rgb(23, 23, 23)');

        sombre?.classList.add("radioselected");

        return "Theme changed to dark";
    }

    return `Unknown theme: ${theme}`;
}