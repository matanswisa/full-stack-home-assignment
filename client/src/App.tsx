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
	page: number;
}


export const api = createApiClient();
const MAX_PER_PAGE = 20;


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		tickets: [],
		page: 0,
	}

	searchDebounce: any = null;

	async componentDidMount() {
		const tickets = (await api.getTicketsByPageNumber(this.state.page)).map((ticket) => { return { ...ticket, show: true } });

		this.setState({
			tickets
		});
	}

	restoreHiddenTickets = () => {
		const tickets = this.state.tickets as Ticket[];

		this.handleTicketsShow(tickets);
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
			{filteredTickets.map((ticket, index) => (ticket.show && <TicketListItem cloneTicket={this.cloneTicket} showTicket={this.updateShowTicket(index)} ticket={ticket} />))}
		</ul>);
	}

	cloneTicket = (ticket: Ticket) => {
		const { tickets } = this.state;
		api.cloneTicket(ticket).then((status) => {
			console.log(status);
			this.setState({ tickets: [...(tickets as Ticket[]), ticket] });
		});
	}

	onSearch = async (val: string, newPage?: number) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}

	increasePageCount = async () => {
		await this.setState({ page: this.state.page + 1 });
	}


	handleTicketsPerPageAppearence = async () => {
		const tickets = await (await api.getTicketsByPageNumber(this.state.page)).map(ticket => ({ ...ticket, show: true }));
		await this.setState({ tickets: this.state.tickets?.map(ticket => { return { ...ticket, show: false } }) });
		await this.setState((prevState) => {
			return { tickets: [...tickets] }
		});
	}

	onNextPageClick = async () => {
		await this.increasePageCount();
		await this.handleTicketsPerPageAppearence();
	}

	onPrevPageClick = async () => {
		await this.decreasePageCount();
		await this.handleTicketsPerPageAppearence();
	}


	decreasePageCount = async () => {
		if (this.state.page)
			await this.setState((prevState) => {
				return { page: this.state.page - 1 }
			});
	}

	handleTicketsShow = async (tickets: Ticket[]) => {
		await this.setState({
			tickets: tickets.map((ticket) => { return { ...ticket, show: true } })
		})
	}


	render() {
		const { tickets, page } = this.state;
		const results = tickets?.length as number;

		return (
			<ThemeContext.Consumer>{({ darkMode }) => {
				return (
					<div className='App' style={!darkMode ? lightTheme : darkTheme}>
						<main>
							<h1>Tickets List</h1>

							<button onClick={this.onPrevPageClick} disabled={!page}>Previous page</button>
							<button onClick={this.onNextPageClick} disabled={results < MAX_PER_PAGE}>Next page</button>
							<h4>Page Number:{this.state.page + 1}</h4>

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