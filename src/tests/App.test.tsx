import React from 'react';
import {render, screen} from '@testing-library/react';
import Movie from "../view/Movie";

test('movie render', () => {
    const Text = 'Simple text';
    render(<Movie movie={{Title: 'Test', Poster: '', Year: '2020'}}/>);
    expect(screen.getByText('Test')).toBeInTheDocument();
});