import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Work from './components/pages/Work';
import About from './components/pages/About';
import Frame from './components/layout/Frame';
import Background from './components/common/Background';
import Title from './components/common/Title';
import ThemeSwitcher from './components/common/ThemeSwitcher';
import './styles/App.css';
import Sim from './components/pages/Sim';

function App() {
    return (
        <Router>
            <Header />
            <Frame />
            <Background />
            <Title />
            <ThemeSwitcher />
            <div className="content-wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/sim" element={<Sim />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
