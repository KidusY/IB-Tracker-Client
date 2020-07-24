import React from 'react';
import axios from 'axios';
import config from '../../config';
import tokenServices from '../../services/tokenServices';
import Ibcontext from '../../context';
import './single_inventory-style.css';
class singleInventory extends React.Component {
	state = {
		showRemoveQTY: false,
		showSoldQTY: false,
		inventory: true
	};

	render() {
		const { inventory } = this.props;
		return (
			<Ibcontext.Consumer>
				{(context) => (
					<tbody>
						{this.state.inventory ? (
							<tr className="inventory">
								<td className="col unImportant">{inventory.productid}</td>
								<td className="col">{inventory.title}</td>
								<td className="col">{inventory.location}</td>
								<td className="col">{inventory.quantity}</td>
								<td className="col unImportant">{inventory.comments}</td>
								<td className="col unImportant">{inventory.user_name}</td>

								<td className="col">
									{' '}
									<button
										id="sold"
										onClick={() => this.setState({ showSoldQTY: !this.state.showSoldQTY })}
									>
										Sold
									</button>
								</td>
								<td className="col">
									<button
										id="remove"
										onClick={() => this.setState({ showRemoveQTY: !this.state.showRemoveQTY })}
									>
										{' '}
										Remove{' '}
									</button>
								</td>
							</tr>
						) : (
							<div />
						)}
						{this.state.showRemoveQTY ? (
							<tr className="qtyInput">
								<input name="quanityTobeRemoved" id="qtyRemoved" placeholder="Remove QTY" />
								<button
									class="confirm"
									onClick={(e) => {
										e.preventDefault();
										const qtyRemoved = document.querySelector('#qtyRemoved');
										console.log(inventory.inventoryid);

										axios
											.delete(`http://localhost:8000/api/inventory/${inventory.inventoryid}`, {
												data: {
													quantity: qtyRemoved.value
												},
												headers: {
													Authorization: `bearer ${tokenServices.getAuthToken(
														config.TOKEN_KEY
													)}`
												}
											})
											.then(() => {
												if (inventory.quantity === 0 || inventory.quantity < qtyRemoved.value) {
													inventory.quantity = 0;
													this.setState({ inventory: false });
												} else {
													inventory.quantity =
														Number(inventory.quantity) - Number(qtyRemoved.value);
												}

												this.setState({ showRemoveQTY: false });
											});
									}}
								>
									Confrim
								</button>
							</tr>
						) : (
							<tr />
						)}
						{this.state.showSoldQTY ? (
							<tr className="qtyInput">
								<input name="quanityTobeSold" id="qtyRemoved" placeholder="Sold QTY" />
								<button className="confirm">Confrim</button>
							</tr>
						) : (
							<tr />
						)}
					</tbody>
				)}
			</Ibcontext.Consumer>
		);
	}
}

export default singleInventory;
