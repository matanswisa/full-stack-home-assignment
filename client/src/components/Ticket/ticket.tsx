import React from 'react';
import { Ticket } from '../../api';


interface ListItemProps {
    key?: string;
    ticket: Ticket;
    showTicket: () => void;
}

interface ListItemState {
    ticket: Ticket
    isHidden: boolean
}

export default class TicketListItem extends React.Component<ListItemProps, ListItemState> {


    constructor(props: ListItemProps) {
        super(props);

        this.state = {
            ticket: this.props.ticket,
            isHidden: false
        }

        this.handleHideButtonClick = this.handleHideButtonClick.bind(this);
    }

    handleHideButtonClick() {
        this.props.showTicket()
    }


    render() {
        const ticket = this.state.ticket;

        return (
            <li key={ticket.id} className='ticket'>
                <h5 className='title'>{ticket.title}</h5>
                <footer>
                    <p className='content'>{ticket.content}</p>
                    <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
                    <button className="hidden-ticket" onClick={this.props.showTicket}>HIDE</button>
                </footer>
            </li>);
    }

}