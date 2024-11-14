import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { PokemonList } from '../components/PokemonList';
import { PokemonDetails } from '../components/PokemonDetails';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:name" element={<PokemonDetails />} />
            </Routes>
        </Router>
    );
}

export { AppRoutes };
