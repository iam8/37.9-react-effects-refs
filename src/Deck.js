import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";


const BASE_URL = "https://deckofcardsapi.com/api/deck";


/**
 * Helper - make API call (via Axios) to the given URL and return the data retrieved.
 *
 * Return nothing and log error message to console if error occurs.
*/
const makeApiCall = async (url) => {
    let result;
    try {
        result = await axios.get(url);
    } catch (err) {
        console.log(err.message);
        return;
    }

    return result.data;
}


/**
 * Deck component - display cards drawn from a standard 52-card deck and buttons for drawing cards
 * and reshuffling the deck.
 *
 * Props:
 * - title (string): custom title for this deck
 *
 * State:
 * - deck (object): holds info about this deck - {id, remaining}
 * - drawnCards (array): an array holding all cards currently drawn from the deck.
 *      - Each card is represented by an object holding its info:
 *          {code, image, images, value, suit}
 * Events:
 * - Click (button): draw a new card from this deck
 * - Click (button): shuffle this deck
 */
function Deck({title="Deck of Cards"}) {
    console.log("Rendering Deck");
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);

    // Get a fresh deck
    useEffect(function getNewDeckWhenMounted() {
        console.log("In useEffect - resetting all state");
        setDeck(null);
        setDrawnCards([]);

        async function fetchDeck() {
            const deckResult = await makeApiCall(`${BASE_URL}/new/shuffle`);

            if (deckResult) {
                const {deck_id, remaining} = deckResult;
                setDeck({id: deck_id, remaining});
            }
        }

        fetchDeck();
    }, []);

    // Draw card and update state
    const drawCard = async () => {
        console.log("Cards remaining:", deck.remaining);

        // No cards remaining
        if (!deck.remaining) {
            alert("Error: no cards remaining!");
            return;
        }

        const cardsRes = await makeApiCall(`${BASE_URL}/${deck.id}/draw/?count=1`);

        if (cardsRes) {
            const {deck_id, remaining, cards} = cardsRes;

            setDeck({id: deck_id, remaining});
            setDrawnCards([...drawnCards, ...cards]);
        }
    }

    // Shuffle current deck and update state
    const shuffleDeck = async () => {
        console.log("Shuffling deck");
        setDeck(null);
        setDrawnCards([]);

        const deckRes = await makeApiCall(`${BASE_URL}/${deck.id}/shuffle`);

        if (deckRes) {
            const {deck_id, remaining} = deckRes;
            setDeck({id: deck_id, remaining});
        }
    }

    return (
        <div className="Deck">
            <h1>{title}</h1>

            <div>
                {
                    <button
                        disabled={!deck}
                        className="Deck-shuffle-btn"
                        onClick={shuffleDeck}>Shuffle deck
                    </button>
                }
            </div>

            <div>
                {
                    <button
                        disabled={!deck}
                        className="Deck-draw-btn"
                        onClick={drawCard}>Draw a card!
                    </button>
                }
            </div>

            <div>
                {
                    !deck &&
                        <h2 className="Deck-loading">Loading...</h2>
                }
            </div>

            <div className="Deck-cards">
                {
                    drawnCards.map((card) => {
                        return <Card key={card.code} imageUrl={card.image}/>
                    })
                }
            </div>
        </div>
    )
}


export default Deck;
