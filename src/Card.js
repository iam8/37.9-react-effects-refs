import React from "react";

/**
 * Card component - display an image of a single card.
 *
 * Props:
 * - imageUrl (string): a URL to the card's image
 *
 * State: none
 * Events: none
 */
function Card ({imageUrl}) {

    return (
        <div className="Card">
            <img src={imageUrl} alt="playing-card"/>
        </div>
    )
}


export default Card;
