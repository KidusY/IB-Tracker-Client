import React from 'react';
import './product-style.css';
import tokenService from '../../services/tokenServices';
import IbServices from '../../services/Ib-tracker-services';
import AddInventory from '../addInventoy/addInventory';
import axios from 'axios';
import config from '../../config';
import $ from 'jquery';
class product extends React.Component {
	constructor() {
		super();
		this.state = {
			inventoryFrom:false,
			error:''
		};
	}


	handleAddInventoryForm = () => {
		if (!this.state.inventoryFrom) {
			$('.collection ,.product, .products').css({ background: '#797979' });
			$('.products h3,h4').css({ color: '#797979' });		
			$('.btn').css({ display: 'none' });
		} else {
			$('.collection ,.product, .products').css({ background: 'white' });
			$('.collection').css({ background: '#e0e0e0' });
			$('.products h3,h4').css({ color: 'black' });	
			$('.btn').css({ display: 'block' });
		}
		this.setState({ inventoryFrom: !this.state.inventoryFrom });
	};
	addInventory = (inventory) => {
		
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
					price:Number(this.props.productInfo.price) *Number(inventory.quantity),
					quantity: inventory.quantity
				})
			);
	};
	render() {
		const { productInfo } = this.props;

		return (
			<div className="product">
				<div className="btn-collection">
					<button id="add-Btn" className="btn" onClick={() => this.handleAddInventoryForm()}>
						<i className="material-icons">add_circle</i>
					</button>

					<button
						id="delete-Btn"
						className="btn"
						onClick={() => this.props.handleDeleteProduct(productInfo.productid,productInfo.price)}
					>
						<i className="material-icons">indeterminate_check_box</i>
					</button>
				</div>
				<h3>{productInfo.title}</h3>
				<h4>{productInfo.type}</h4>
				<p>{productInfo.description} </p>
				<p>$ {productInfo.price}</p>
			
				{this.state.inventoryFrom ? (
					<AddInventory
						handleAddInventoryForm={this.handleAddInventoryForm}
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
