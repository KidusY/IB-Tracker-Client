import React from 'react';
import NavBar from '../navBar/navBar';
import axios from 'axios';
import Header from '../header/header';
import './inventory-style.css';
import {withRouter} from 'react-router-dom';
import IbServices from '../../services/Ib-tracker-services';
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
	handleDeletingInventory = (inventory, qtyRemoved, index, price) => {
		if (
			Number(this.state.inventory[index].quantity) > Number(qtyRemoved) ||
			Number(this.state.inventory[index].quantity) === Number(qtyRemoved)
		) {
			const newInventory = this.state.inventory;
			newInventory[index].quantity = Number(newInventory[index].quantity) - Number(qtyRemoved);
			this.setState({ inventory: newInventory });

			axios
				.delete(`${config.API_ENDPOINT}/api/inventory/${inventory.inventoryid}`, {
					data: {
						quantity: qtyRemoved
					},
					headers: {
						Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
					}
				})
				.then(() => {
					IbServices.postLog({
						actions: `Removed Inventory`,
						quantity: Number(qtyRemoved),
						price: `-${Number(price) * Number(qtyRemoved)}`,
						user_name: `${tokenServices.getUser().user_name}`,
						productid: inventory.productid
					});
				});
			return true;
		}

		return false;
	};
	handleSellingInventory = (inventory, qtySold, index, price) => {
		if (
			Number(this.state.inventory[index].quantity) > Number(qtySold) ||
			Number(this.state.inventory[index].quantity) === Number(qtySold)
		) {
			const newInventory = this.state.inventory;
			newInventory[index].quantity = Number(newInventory[index].quantity) - Number(qtySold);
			this.setState({ inventory: newInventory });

			axios
				.delete(`${config.API_ENDPOINT}/api/inventory/${inventory.inventoryid}`, {
					data: {
						quantity: qtySold
					},
					headers: {
						Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
					}
				})
				.then(() => {
					IbServices.postLog({
						actions: `Sold Inventory`,
						quantity: Number(qtySold),
						price: Number(price) * Number(qtySold),
						user_name: `${tokenServices.getUser().user_name}`,
						productid: inventory.productid
					});
				});
			return true;
		}

		return false;
	};

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
		
		return (
			<div className="container">
				<NavBar />
				<Header location={this.props.location.pathname} />
				<div className="filler" />
				<div className="main">
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
								this.state.inventory.map((inventory, i) => {
									if (Number(inventory.quantity) !== 0) {
										return (
											<SingleIventory
												inventory={inventory}
												key={i}
												index={i}
												handleDeletingInventory={this.handleDeletingInventory}
												handleSellingInventory={this.handleSellingInventory}
											/>
										);
									}
								})
							)}
						</table>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(inventory);
