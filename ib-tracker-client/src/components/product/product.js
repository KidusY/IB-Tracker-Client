import React from 'react';
import './product-style.css';
import tokenService from '../../services/tokenServices';
import AddInventory from '../addInventoy/addInventory';
import axios from 'axios';
import config from '../../config';
class product extends React.Component {
	constructor() {
		super();
		this.state = {
			inventoryFrom: false
		};
	}

	handleAddForm = () => {
		this.setState({ inventoryFrom: !this.state.inventoryFrom });
	};
	handleDeleteProduct = (productId) => {
		axios
			.delete(`http://localhost:8000/api/product/${productId}`, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken()}`
				}
			})
			
	};
	addInventory = (inventory) => {
		console.log(inventory);
		axios
			.post(`${config.API_ENDPOINT}/api/inventory/`, inventory, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken()}`
				}
			})
			.then((res) => console.log('added inventory'));
	};
	render() {
		const { productInfo } = this.props;
		console.log(productInfo);
		return (
			<div className="product">
				<h3>{productInfo.title}</h3>
				<h4>{productInfo.type}</h4>
				<p>{productInfo.description} </p>
				<p>$ {productInfo.price}</p>
				<div className="btn-collection">
					<button id="add-Btn" className="btn" onClick={() => this.handleAddForm()}>
						<i className="material-icons">add_circle</i>
					</button>

					<button
						id="delete-Btn"
						className="btn"
						onClick={() => this.handleDeleteProduct(productInfo.productid)}
					>
						<i className="material-icons">indeterminate_check_box</i>
					</button>
				</div>
				{this.state.inventoryFrom ? (
					<AddInventory
						handleAddForm={this.handleAddForm}
						addInventory={this.addInventory}
						productId={productInfo.productid}
						_title={productInfo.title}
					/>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default product;
