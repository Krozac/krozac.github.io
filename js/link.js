let typingTimeout;  // Holds the current typing timeout reference

function simulateTyping(text, elementId, speed) {
    const element = document.getElementById(elementId);
    element.textContent = "";  // Clear existing text
    let index = 0;

    // Clear any ongoing typing animation
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    function type() {
        // Append the next character in the text
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            // Set timeout for the next character
            typingTimeout = setTimeout(type, speed);
        }
    }
    type();  // Start typing
}

// Code to handle link clicks
function hasBeforeElement(link) {
    const style = window.getComputedStyle(link, "::before");
    return style.content !== "none";  // Checks if ::before has content
}

document.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href") === "/" && hasBeforeElement(link)) {
        link.addEventListener("click", function(event) {
            event.preventDefault();  // Prevent default link action
            // Remove 'selected' class from other links
            document.querySelectorAll("a.selected").forEach(selectedLink => {
                selectedLink.classList.remove("selected");
            });
            
            // Add 'selected' class to the clicked link
            link.classList.add("selected");
            showhide(link.id);

            // Stop current typing and start a new typing animation with ::before content
            const beforeContent = window.getComputedStyle(link, "::before").content.slice(1, -1);
            simulateTyping(beforeContent, "write-box-content", 20);
        });
    }
});

function showhide(pageid) {
    document.querySelectorAll(".page").forEach(page => {
        if (page.dataset.page == pageid) {
            page.style.display = "block";
            fadein(page, 200);
        } else {
            page.style.display = "none";
            page.style.opacity = 0;
        }
    });
}


function fadein(element, duration, callback) {
    let opacity = 0;
    const interval = 50;
    const fadeStep = interval / duration;

    function fade() {
        opacity += fadeStep;
        if (opacity >= 1) {
            opacity = 1;
             element.style.opacity = opacity;
            clearInterval(fadeInterval);
            if (callback) callback(); 
        } else {
            element.style.opacity = opacity;
        }
    }

    const fadeInterval = setInterval(fade, interval);
}
