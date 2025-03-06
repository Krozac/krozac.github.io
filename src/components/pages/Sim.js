import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Sim.css';

import SimData from '../../datas/Sim';

const Sim = () => {
    const [selectedSim, setSelectedSim] = useState(null);
    const [simData, setSimData] = useState(SimData);

    useEffect(() => {
        
    }, []);

    const handleSimClick = (sim) => {
        setSelectedSim(sim);
    };
    const handleHover = (description) => {
        const simDescription = document.querySelector('.sim-description-p');
        simDescription.innerHTML = description;
    }

    return (
        <section data-page="sim" className="page">
            <div className="sim-page">
                <div className="sim-description">
                    <p className="sim-description-p"></p>
                    <div className="sim-container-back"></div>
                    <div className="sim-container-back-small"></div>
                </div>
                <div className='sim-canvas'>
                    <canvas id="simCanvas" width="450" height="400"></canvas>
                    <div className='button-container'>
                        <button onClick={() => {
                            const canvas = document.getElementById('simCanvas');
                            const context = canvas.getContext('2d');
                            import(`../../simulations/${selectedSim.link}`).then(module => {
                                module.init(context,100);
                                requestAnimationFrame(module.gameLoop);
                            }).catch(error => {
                                console.error("Error loading simulation script:", error);
                            });
                        }} className="sim-start-button">
                            Start Simulation
                        </button>  
                    </div>
                    <div className="sim-container-back"></div>
                    <div className="sim-container-back-small"></div>
                </div>
                <div className="sim-container">
                    <div className="sim-container-back"></div>
                    <div className="sim-container-back-small"></div>
                    <table className="sim-table">
                        <thead>
                            <tr>
                                <th>Simulation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {simData.map((sim, index) => (
                                <tr key={index} onClick={() => handleSimClick(sim)} onMouseOver={() => handleHover(sim.description)} className="sim-row">
                                    <td>{sim.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        <React.Fragment>
                            <table className="sim-details-table">
                                <thead>
                                    <tr>
                                        <th>Entités</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedSim && (
                                    selectedSim.ecsData.entities.map((entity, index) => (
                                        <tr key={index} onMouseOver={() => handleHover(entity.description)}>
                                            <td>{entity.fileName}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            <table className="sim-details-table">
                                <thead>
                                    <tr>
                                        <th>Composants</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedSim && (selectedSim.ecsData.components.map((component, index) => (
                                        <tr key={index} onMouseOver={() => handleHover(component.description)}>
                                            <td>{component.fileName}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            <table className="sim-details-table">
                                <thead>
                                    <tr>
                                        <th>Systems</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedSim && (selectedSim.ecsData.systems.map((system, index) => (
                                        <tr key={index} onMouseOver={() => handleHover(system.description)}>
                                            <td>{system.fileName}</td>
                                        </tr>
                                    ))
                                    )}
                                </tbody>
                            </table>
                        </React.Fragment>
                  
                </div>
            </div>
        </section>
    );
};

export default Sim;