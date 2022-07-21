import React from 'react';
import ReactDOM, { } from 'react-dom';
import { render, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import DarkModeToggle from '..';


it('dark mode is checked', async () => {
    const { getByRole } = render(<DarkModeToggle></DarkModeToggle>)
    const checkbox = getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
})

