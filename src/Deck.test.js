import React from 'react';
import { render } from '@testing-library/react';
import Deck from './Deck';


test("Renders without crashing", () => {
    render(<Deck title="New Deck" />);
});


test("Matches snapshot", () => {
    const {asFragment} = render(<Deck title="New Deck" />);
    expect(asFragment()).toMatchSnapshot();
})
