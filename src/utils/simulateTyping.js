const typingStates = {};

export function simulateTyping(text, elementId, speed) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Check if the typing is already in progress for this element
  if (typingStates[elementId]) return;

  // Set the flag to indicate typing has started
  typingStates[elementId] = true;

  element.textContent = ''; // Clear content before starting

  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      // Reset the flag when typing is done
      typingStates[elementId] = false;
    }
  }

  type();
}
