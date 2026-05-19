import React, { useEffect, useState } from 'react';
import workData from '../../datas/work';
import { simulateTyping } from '../../utils/simulateTyping';
import useGithubStats from '../../hooks/useGithubStats';

function Work () {
    
    const {
        githubStats,
        loading
    } = useGithubStats(workData);
    
    useEffect(() => {
        simulateTyping('Projets', 'write-box-content', 40); 
    }, []); 

    if (loading) {
        return (
            <section data-page="work" className="page">
                <div className="work loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            </section>
        )
    }
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
                        {!loading && githubStats[work.path] && (
                            <div className="github-stats">
                                {(githubStats[work.path].stars > 0 || githubStats[work.path].forks > 0 || githubStats[work.path].watchers > 0) && <p>
                                    {githubStats[work.path].stars > 0 && <span>★ {githubStats[work.path].stars} | </span>}
                                    {githubStats[work.path].forks > 0 && <span>⑂ {githubStats[work.path].forks} | </span>}
                                    {githubStats[work.path].watchers > 0 && <span>👁 {githubStats[work.path].watchers}</span>}
                                </p>}
                                <p>
                                    ⎇ {githubStats[work.path].commits} commits
                                    {' '}| 📄 {githubStats[work.path].loc.toLocaleString()} LOC
                                </p>

                            </div>
                        )}
                        <a href={work.link}  className="link-custom color-green" target="_blank" rel="noopener noreferrer">Voir</a>
                        {work.link !== work.repo &&
                            <a href={work.repo}  className="link-custom color-purple" target="_blank" rel="noopener noreferrer">Git</a>
                        }
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Work;
