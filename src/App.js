/**
 * Top level application component.
 *
 * Renders a deck of cards.
 */


import React from 'react';
import Deck from './Deck';
import './App.css';


function App() {
    return (
        <div className="App">
            <Deck />
        </div>
    );
}

export default App;
