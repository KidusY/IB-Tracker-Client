import React from 'react';

import Ibcontext from '../../context';
import './single_inventory-style.css';
class singleInventory extends React.Component {
	state = {
		showRemoveQTY: false,
		showSoldQTY: false,
		error: null
	};

	render() {
		const { inventory } = this.props;
		return (
			<tbody>
				<tr className="inventory">
					<td className="col unImportant">{inventory.productid}</td>
					<td className="col">{inventory.title}</td>
					<td className="col">{inventory.location}</td>
					<td className="col">{inventory.quantity}</td>
					<td className="col unImportant">{inventory.comments}</td>
					<td className="col unImportant">{inventory.user_name}</td>

					<td className="col">
						<button id="sold" onClick={() => this.setState({ showSoldQTY: !this.state.showSoldQTY })}>
							Sold
						</button>
					</td>
					<td className="col">
						<button id="remove" onClick={() => this.setState({ showRemoveQTY: !this.state.showRemoveQTY })}>
							<i className="material-icons">remove_circle_outline</i>
						</button>
					</td>
				</tr>

				{this.state.showRemoveQTY ? (
					<tr className="qtyInput">
						<td>
							<label id="qtyError">{this.state.error}</label>
							<input name="quanityTobeRemoved" id="qtyRemoved" placeholder="Remove QTY" />
							<button
								className="confirm"
								onClick={(e) => {
									e.preventDefault();
									const qtyRemoved = document.querySelector('#qtyRemoved');

									if (
										this.props.handleDeletingInventory(
											inventory,
											qtyRemoved.value,
											this.props.index
										)
									) {
										this.setState({ error: null });
										this.setState({ showRemoveQTY: false });
									} else {
										this.setState({ error: 'Quantity Exceeds' });
									}
								}}
							>
								Confrim
							</button>
						</td>
					</tr>
				) : (
					<tr />
				)}
				{this.state.showSoldQTY ? (
					<tr className="qtyInput">
						<td>
							<input name="quanityTobeSold" id="qtyRemoved" placeholder="Sold QTY" />
							<button className="confirm">Confrim</button>
						</td>
					</tr>
				) : (
					<tr />
				)}
			</tbody>
		);
	}
}

export default singleInventory;
