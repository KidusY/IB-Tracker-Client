import React from 'react';
import NavBar from '../navBar/navBar';
import axios from 'axios';
import Header from '../header/header';
import './inventory-style.css';
import SingleIventory from '../single_Inventory/single_Inventory';
import spinner from '../../assets/spinner.gif';

import tokenServices from '../../services/tokenServices';

import config from '../../config';
class inventory extends React.Component {
	constructor() {
		super();
		this.state = {
			inventory: []
		};
	}

	componentDidMount() {
		axios
			.get(`${config.API_ENDPOINT}/api/inventory/`, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then((resInventory) => {
				this.setState({ inventory: resInventory.data });
			});
	}
	render() {
		console.log();
		return (
			<div className="container">
				<NavBar />
				<div className="main">
					<Header location={this.props.location.pathname} />

					<div className="collection">
						<table className="table">
							<thead>
								<tr className="inventory tableHeader">
									<th className="col unImportant">Id </th>
									<th className="col">Title</th>
									<th className="col">Location</th>
									<th className="col">Qty</th>
									<th className="col unImportant">Comment</th>
									<th className="col unImportant">User</th>
									<th className="col">{''} </th>
									<th className="col">{''} </th>
								</tr>
							</thead>
							{this.state.inventory.length === 0 ? (
								<img className="loadingSpinner" src={spinner} alt="spinner" />
							) : (
								this.state.inventory.map((inventory, i) => (
									<SingleIventory inventory={inventory} key={i} />
								))
							)}
						</table>
					</div>
				</div>
			</div>
		);
	}
}
export default inventory;
