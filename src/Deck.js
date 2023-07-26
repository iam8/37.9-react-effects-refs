import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";

// TODO: Error handling for API calls!!!


/**
 * Deck component - display cards drawn from a standard 52-card deck and buttons for drawing cards
 * and reshuffling the deck.
 *
 * Props:
 * - title (string): custom title for this deck
 *
 * State:
 * - deck (object): holds info about this deck - {deck_id, shuffled, remaining}
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

    // Get a fresh deck from API
    useEffect(() => {
        async function fetchDeck() {
            const deckResult = await axios.get(`${baseUrl}/new/shuffle`);
            const {deck_id, remaining} = deckResult.data;
            setDeck({deck_id, remaining});
        }

        fetchDeck();
    }, []);

    // Draw card and update state
    const drawCard = async () => {
        const cardsRes = await axios.get(`${baseUrl}/${deck.deck_id}/draw/?count=1`);
        const {deck_id, remaining, cards} = cardsRes.data;
        setDeck({deck_id, remaining});
        setDrawnCards([...drawnCards, ...cards]);
    }

    return (
        <div className="Deck">
            <h1>{title}</h1>
            <div>
                {deck ? <h2>Deck: {deck.deck_id}</h2> : <h2>Loading...</h2>}
            </div>
            <button className="Deck-draw-btn" onClick={drawCard}>Draw a card!</button>
            <div className="Deck-cards">
                {
                    drawnCards.map((card) => {
                        <Card />
                    })
                }
            </div>
        </div>
    )
}


export default Deck;
