import React from 'react';
import './App.scss';
import { createApiClient, Ticket } from './api';
import TicketListItem from './components/Ticket/ticket';
import DarkModeToggle from './components/ToggleDarkMode';
import { ThemeContext, } from './contexts/ThemeContext';
import { darkTheme, lightTheme } from './constants/themes';

export type AppState = {
	tickets?: Ticket[];
	search: string;
}


const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		tickets: []
	}

	searchDebounce: any = null;

	async componentDidMount() {
		const tickets = (await api.getTickets()).map((ticket) => { return { ...ticket, show: true } });

		this.setState({
			tickets
		});
	}

	restoreHiddenTickets = () => {
		const tickets = this.state.tickets as Ticket[];

		this.setState({
			tickets: tickets.map((ticket) => { return { ...ticket, show: true } })
		})
	}

	updateShowTicket = (index: number) => {
		return () => {
			const tickets = this.state.tickets as Ticket[];

			this.setState({
				tickets: tickets.map((ticket, i) => i !== index ? ticket : { ...ticket, show: !ticket.show })
			})
		}
	}

	renderTickets = (tickets: Ticket[]) => {

		const filteredTickets = tickets
			.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));


		return (<ul className='tickets'>
			{filteredTickets.map((ticket, index) => (ticket.show && <TicketListItem showTicket={this.updateShowTicket(index)} ticket={ticket} />))}
		</ul>);
	}


	onSearch = async (val: string, newPage?: number) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}

	render() {
		const { tickets } = this.state;


		return (
			<ThemeContext.Consumer>{({ darkMode }) => {
				return (
					<div className='App' style={!darkMode ? lightTheme : darkTheme}>
						<main>
							<h1>Tickets List</h1>

							<DarkModeToggle></DarkModeToggle>

							<button onClick={this.restoreHiddenTickets}>Restore tickets</button>
							<header>
								<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)} />
							</header>
							{tickets ? <div className='results'>Showing {tickets.length} results</div> : null}
							{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
						</main>
					</div>
				)
			}}
			</ThemeContext.Consumer>

		)
	}
}



export default App;