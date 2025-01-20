import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="siteHeader">
            <h1 className="siteHeader_title">Théo Guénézan</h1>
            <p className="siteHeader_label">Développeur Full Stack</p>
            <nav className="navbar">
                <div className="container">
                    <ul className="nav-links">
                        <li><Link className="selected" to="/">Accueil</Link></li>
                        <li><Link to="/work">Projets</Link></li>
                        <li><Link to="/about">Réseaux</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
