import React, { useEffect } from 'react';
import { simulateTyping } from '../../utils/simulateTyping';
import socialData from '../../datas/Social';
import '../../styles/About.css';
function About() {
    useEffect(() => {
        simulateTyping('Réseaux', 'write-box-content', 40); // Adjust speed if needed
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div className="about-page">
            <div className="social-links">
                <ul>
                    {socialData.map((social, index) => (
                        <li key={index} className="social-item">
                            <a href={social.link} target="_blank" rel="noopener noreferrer">
                                <img src={social.image} alt={`${social.title} icon`} className="social-icon" />
                                <p>{social.title}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default About;