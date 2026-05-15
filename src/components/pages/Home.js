import React, { useEffect } from 'react';
import { simulateTyping } from '../../utils/simulateTyping';
function Home() {
    
      useEffect(() => {
        simulateTyping('Accueil', 'write-box-content', 40); // Adjust speed if needed
      }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <section data-page="home" className="page">
            <div className="page-content home">
                <p>
                        Développeur full stack passionné par les interfaces interactives, 
                        les systèmes temps réel et la visualisation de données. 
                        Je conçois des applications web mêlant expérience utilisateur, 
                        architecture logicielle et rendu graphique, avec un intérêt particulier 
                        pour les simulations, le multijoueur et les outils orientés données.
                </p>
                <div className="row" style={{ display: 'none' }}>
                    <a target="_blank" href="/" style={{ color: 'inherit' }}>Mon CV</a>
                    <a target="_blank" href="/" style={{ color: 'inherit' }}>Analyse de mes compétences</a>
                </div>
            </div>
        </section>
    );
}

export default Home;
