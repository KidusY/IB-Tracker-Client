import React from 'react';
import './product-style.css';
import tokenService from '../../services/tokenServices';
import IbServices from '../../services/Ib-tracker-services';
import AddInventory from '../addInventoy/addInventory';
import axios from 'axios';
import config from '../../config';
class product extends React.Component {
	constructor() {
		super();
		this.state = {
			inventoryFrom: false,
			error:''
		};
	}

	handleAddForm = () => {
		this.setState({ inventoryFrom: !this.state.inventoryFrom });
	};
	handleDeleteProduct = (productId) => {
		axios
			.delete(`${config.API_ENDPOINT}/api/product/${productId}`, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken()}`
				}
			})
			.then(
				res=>{
					IbServices.postLog({
						actions: 'Product Deleted',
						user_name: `${tokenService.getUser().user_name}`,
						productid: productId,
						quantity:1
						
					})
				}
				
			).catch(err=>this.setState({error:err.response.data}))
	};
	addInventory = (inventory) => {
		console.log(inventory);
		axios
			.post(`${config.API_ENDPOINT}/api/inventory/`, inventory, {
				headers: {
					Authorization: `bearer ${tokenService.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then(
				IbServices.postLog({
					actions: 'Added Inventory',
					user_name: `${tokenService.getUser().user_name}`,
					productid: inventory.productid,
					quantity: inventory.quantity
				})
			);
	};
	render() {
		const { productInfo } = this.props;

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
