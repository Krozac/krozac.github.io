function fadeOut(element, duration, callback) {
    let opacity = 1;
    const interval = 50;
    const fadeStep = interval / duration;

    function fade() {
        opacity -= fadeStep;
        if (opacity <= 0) {
            opacity = 0;
            element.style.opacity = opacity;
            clearInterval(fadeInterval);
            if (callback) callback();  // Appelle le callback après disparition
        } else {
            element.style.opacity = opacity;
        }
    }

    const fadeInterval = setInterval(fade, interval);
}

document.addEventListener("DOMContentLoaded", function() {
    const enterView = document.getElementById("EnterView");
    const title1 = enterView.querySelector("._t1");
    const title2 = enterView.querySelector("._t2");
    
    const initialDelay = 1000;
    
    setTimeout(() => {
        // Étape 1 : Faire disparaître le titre 1
        fadeOut(title1, 200);

        // Étape 2 : Lancer la disparition du titre 2 avec un léger décalage de 300 ms
        setTimeout(() => {
            fadeOut(title2, 200, function() {
                // Étape 3 : Faire disparaître progressivement #EnterView
                fadeOut(enterView, 200, function() {
                    enterView.remove();
                });
            });
        }, 100); // Décalage de 300 ms pour lancer le fondu du titre 2

    }, initialDelay); // Délai initial avant de lancer les animations
});