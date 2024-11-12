// simulateTyping.js

function simulateTyping(text, elementId, speed=100) {
    const element = document.getElementById(elementId);
    let index = 0;
    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeCharacter, speed);  // Repeat until done
        }
    }

    element.textContent = "";  // Clear any existing text
    typeCharacter();           // Start typing
}
