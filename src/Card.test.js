import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


test("Renders without crashing", () => {
    render(<Card />);
});
