//hook

import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { cli } from './cli_engine';
import { registerCommands } from './registerCommands';

import Socials from '../../datas/Social';
import Work from '../../datas/work';


function generateRoutes() {
    const routes = {
        home: {type:"internal", path:"/"},
        work: {type:"internal", path:"/work"},
        about: {type:"internal", path:"/about"},
    };

    // Dynamically add routes for social links
    Socials.forEach(social => {
        routes[social.path] = {
            type: "external",
            url: social.link,
        };
    }
    );

    // Dynamically add routes for work projects
    Work.forEach(project => {
        routes[project.path] = {
            type: "external",
            url: project.link,
        };
    });

    return routes;
}

const routes = generateRoutes();

export function useCli() {
    const navigate = useNavigate();

    useEffect(() => {
        registerCommands();
        cli.setContext({ navigate, routes });
    }, []);

    return cli;
}