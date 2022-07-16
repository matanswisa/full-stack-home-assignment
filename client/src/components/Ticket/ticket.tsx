import React from 'react';
import { Ticket } from '../../api';
import { ThemeContext } from '../../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../../constants/themes';


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
            <ThemeContext.Consumer>{({ darkMode }) => {
                return (
                    <li key={ticket.id} className='ticket' style={darkMode ? darkTheme : lightTheme}>
                        <h5 className='title' style={darkMode ? darkTheme : lightTheme}>{ticket.title}</h5>
                        <footer>
                            <p className='content' style={darkMode ? darkTheme : lightTheme}>{ticket.content}</p>
                            <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
                            <button className="hidden-ticket" onClick={this.props.showTicket}>HIDE</button>
                        </footer>
                    </li>
                )
            }}

            </ThemeContext.Consumer>
        );
    }

}