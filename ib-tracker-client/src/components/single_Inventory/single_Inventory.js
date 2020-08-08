import React from 'react';
import config from '../../config'
import tokenServices from '../../services/tokenServices';
import axios from 'axios';
import './single_inventory-style.css';
class singleInventory extends React.Component {
	state = {
		showRemoveQTY: false,
		showSoldQTY: false,
		error: null,
		price:null
		
	};
	componentDidMount (){
		const {inventory} = this.props		
		return	axios.get(`${config.API_ENDPOINT}/api/product/${inventory.productid}`,{
			headers: {
				Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
			}
		
		}).then(res=>this.setState({price:res.data.price}))
	}

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
											this.props.index,
											this.state.price
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
						<label id="qtyError">{this.state.error}</label>
							<input name="quanityTobeSold" id="qtySold" placeholder="Sold QTY" />
							<button
								className="confirm"
								onClick={(e) => {
									e.preventDefault();
									const qtySold = document.querySelector('#qtySold');

									if (
										this.props.handleSellingInventory(
											inventory,
											qtySold.value,
											this.props.index,
											this.state.price
										)
									) {
										this.setState({ error: null });
										this.setState({ showSoldQTY: false });
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
			</tbody>
		);
	}
}

export default singleInventory;
