import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";


const BASE_URL = "https://deckofcardsapi.com/api/deck";


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
 * - Click (button to draw new card): draw a new card from this deck
 * - Click (button to reshuffle deck): shuffle this deck
 */
function Deck({title="Deck of Cards"}) {
    console.log("Rendering Deck");
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);

    // Get a fresh deck
    useEffect(() => {
        console.log("In useEffect - resetting all state");
        setDeck(null);
        setDrawnCards([]);

        async function fetchDeck() {
            let deckResult;
            try {
                deckResult = await axios.get(`${BASE_URL}/new/shuffle`);
            } catch (err) {
                console.log(err.message);
                return;
            }

            const {deck_id, remaining} = deckResult.data;
            setDeck({id: deck_id, remaining});
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

        let cardsRes;
        try {
            cardsRes = await axios.get(`${BASE_URL}/${deck.id}/draw/?count=1`);
        } catch (err) {
            console.log(err.message);
            return;
        }

        const {deck_id, remaining, cards} = cardsRes.data;

        setDeck({id: deck_id, remaining});
        setDrawnCards([...drawnCards, ...cards]);
    }

    // Shuffle current deck and update state
    const shuffleDeck = async () => {
        console.log("Shuffling deck");
        setDeck(null);
        setDrawnCards([]);

        let deckRes;
        try {
            deckRes = await axios.get(`${BASE_URL}/${deck.id}/shuffle`);
        } catch (err) {
            console.log(err.message);
            return;
        }

        const {deck_id, remaining} = deckRes.data;
        setDeck({id: deck_id, remaining});
    }

    return (
        <div className="Deck">
            <h1>{title}</h1>

            <div>
                {
                    deck ?
                        <></> :
                        <h2 className="Deck-loading">Loading...</h2>
                }
            </div>

            <div>
                {
                    deck ?
                        <button
                            className="Deck-shuffle-btn"
                            onClick={shuffleDeck}>Shuffle deck
                        </button> :
                        <></>
                }
            </div>

            <div>
                {
                    deck ?
                        <button
                            className="Deck-draw-btn"
                            onClick={drawCard}>Draw a card!
                        </button> :
                        <></>
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
