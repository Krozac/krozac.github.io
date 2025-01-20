import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Work from './components/Work';
import About from './components/About';
import Frame from './components/Frame';
import Background from './components/Background';
import Title from './components/Title';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/App.css';

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
                </Routes>
            </div>
            <Footer />
        </Router>

    );
}

export default App;
