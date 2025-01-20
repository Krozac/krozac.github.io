import React, { useEffect } from 'react';
import workData from '../datas/work';
import { simulateTyping } from '../utils/simulateTyping';

function Work () {
    
      useEffect(() => {
        simulateTyping('Projets', 'write-box-content', 40); // Adjust speed if needed
      }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <section data-page="work" className="page">
            <div className="work">
                {workData.map((work, index) => (
                    <div key={index} className="card">
                        <h4>{work.title}</h4>
                        <p>{work.description}</p>
                        <div className="work-lang">
                        {work.lang.map((l)=>(
                                <p>{l}</p>
                            ))}
                        </div>
                        <a href={work.link} className="link-custom">Voir</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Work;
