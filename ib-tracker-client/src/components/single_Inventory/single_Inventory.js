import React from 'react';
import axios from 'axios';
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
					<div>
						{this.state.inventory ? (
							<div className="inventory">
								<h4 id="productId">{inventory.productid} </h4>
								<h4 id="title">{inventory.title} </h4>
								<h4 id="location">{inventory.location} </h4>
								<h4 id="quantity">{inventory.quantity} </h4>
								<h4 id="comments">{inventory.comments} </h4>
								<h4 id="userId">{context.users} </h4>

								<button
									id="sold"
									onClick={() => this.setState({ showSoldQTY: !this.state.showSoldQTY })}
								>
									Sold
								</button>
								<button
									id="remove"
									onClick={() => this.setState({ showRemoveQTY: !this.state.showRemoveQTY })}
								>
									{' '}
									Remove{' '}
								</button>
							</div>
						) : (
							<div />
						)}
						{this.state.showRemoveQTY ? (
							<div>
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
							</div>
						) : (
							<div />
						)}
						{this.state.showSoldQTY ? (
							<div>
								<input name="quanityTobeSold" placeholder="Sold QTY" />
								<button class="confirm">Confrim</button>
							</div>
						) : (
							<div />
						)}
					</div>
				)}
			</Ibcontext.Consumer>
		);
	}
}

export default singleInventory;
