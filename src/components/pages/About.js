import React, { useEffect } from 'react';
import { simulateTyping } from '../../utils/simulateTyping';
function About(){
    useEffect(() => {
        simulateTyping('Réseaux', 'write-box-content', 40); // Adjust speed if needed
      }, []); // Empty dependency array ensures it runs only once on mount

    return(<div></div>);
}

export default About