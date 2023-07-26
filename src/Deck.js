import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";


/**
 * Deck component - display cards drawn from a standard 52-card deck and buttons for drawing cards
 * and reshuffling the deck.
 *
 * Props:
 * - title (string): custom title for this deck
 *
 * State:
 * - deck (object): holds info about this deck.
 *      - Deck state fields: {deck_id, shuffled, remaining}
 * - drawnCards (array): an array holding all cards currently drawn from the deck.
 *      - Each card is represented by an object holding its info:
 *          {code, image, images, value, suit}
 * Events:
 * - Click (button to draw new card): draw a new card from this deck
 * - Click (button to reshuffle deck): shuffle this deck
 */
function Deck({title="Deck of Cards"}) {
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);

    const baseUrl = "https://deckofcardsapi.com/api/deck";

    // console.log("Before useEffect call");

    // Get a fresh deck from API
    useEffect(() => {
        // console.log("In useEffect()");
        async function fetchDeck() {
            // console.log("Inside fetchDeck() - beginning");
            const deckResult = await axios.get(`${baseUrl}/new/shuffle`);
            const {deck_id, remaining, shuffled} = deckResult.data;
            setDeck({deck_id, remaining, shuffled});
            // console.log("End of fetchDeck()");
        }

        // console.log("Before call to fetchDeck()");
        fetchDeck();
        // console.log("After call to fetchDeck()");
    }, []);

    // console.log("After useEffect() call");
    return (
        <div className="Deck">
            <h1>{title}</h1>
            <div>
                {deck ? <h2>Deck ID: {deck.deck_id}</h2> : <h2>Loading...</h2>}
            </div>
        </div>
    )
}


export default Deck;
