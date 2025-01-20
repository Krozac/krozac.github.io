import React, { useEffect } from 'react';
import { simulateTyping } from '../utils/simulateTyping';
function Home() {
    
      useEffect(() => {
        simulateTyping('Accueil', 'write-box-content', 40); // Adjust speed if needed
      }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <section data-page="home" className="page">
            <div className="page-content home">
                <p>
                    Passionné de développement. Au fil des années, j'ai acquis une solide expérience dans ce domaine,ce qui m'a permis de développer mes compétences.Je crois fermement en l'importance de l'apprentissage tout au long de la vie et cherche constamment à enrichir mes connaissances. Dans ce portfolio, je partage mes réalisations, projets, et aspirations. J'espère que vous pourrez y découvrir plus sur moi et ce que je peux apporter à votre entreprise ou organisation. 
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
