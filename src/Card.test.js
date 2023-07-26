import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


const TEST_URL = "test.png";


test("Renders without crashing", () => {
    render(<Card imageUrl={TEST_URL} />);
});


test("Matches snapshot", () => {
    const {asFragment} = render(<Card imageUrl={TEST_URL} />);
    expect(asFragment()).toMatchSnapshot();
});
