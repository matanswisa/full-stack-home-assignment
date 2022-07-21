import React from 'react';
import ReactDOM, { } from 'react-dom';
import { Ticket } from '../../../api';
import TicketListItem from "../ticket";
import { render, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen, within, waitForElementToBeRemoved, fireEvent } from '@testing-library/dom';
import { shallow } from 'enzyme';
import App from '../../../App';
import '@testing-library/jest-dom/extend-expect';


const ticket = {
    id: "4545540",
    title: "React forum",
    content: "how to render a component",
    creationTime: 500,
    userEmail: "matan.swisa@gmail.com",
    labels: [''],
    show: true,
}

const propsTicketItem = {
    cloneTicket: (ticket: Ticket) => { },
    showTicket: () => { },
    ticket,
    key: '1'
}

it("renders Ticket component without crashing", () => {
    render(<TicketListItem {...propsTicketItem} ></TicketListItem>);
})

it("hide ticket button class name has the class name 'hidden-ticket'", () => {
    const className = 'hidden-ticket'
    const { container } = render(<TicketListItem {...propsTicketItem} ></TicketListItem>);
    const button = Array.from(container.querySelectorAll('button')).find(button => button.className === className);

    expect(button?.className).toBe(className);
})


it("hide ticket button's click evnet unmounts the Ticket component", async () => {
    const { getByRole } = render(<TicketListItem {...propsTicketItem} ></TicketListItem>);


    const btn = getByRole('button', { name: 'HIDE' })

    fireEvent(
        btn,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        })
    );

    expect(getByRole('listitem')).not.toBeInTheDocument();
});