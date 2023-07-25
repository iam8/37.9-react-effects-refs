/**
 * Props:
 * - title (string): custom title for this deck
 * - id (string): the ID of this deck
 *
 * State:
 * - cards (array): an array holding all cards currently in the deck.
 *      - Each card is represented by an object holding its info:
 *          {code, image, images, value, suit}
 *
 * Events:
 * - Click (button to draw new card): draw a new card from this deck
 * - Click (button to reshuffle deck): shuffle this deck
 */