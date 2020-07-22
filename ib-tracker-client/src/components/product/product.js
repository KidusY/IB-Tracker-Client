import React from 'react';
import './product-style.css';
import AddInventory from '../addInventoy/addInventory';
import axios from 'axios';
class product extends React.Component {
	constructor() {
		super();
		this.state = {
			inventoryFrom: false
		};
	}

	handleAddForm = () => {
		this.setState({ inventoryFrom: !this.state.inventoryFrom });
		console.log(this.state.inventoryFrom);
	};
	addInventory = (inventory) => {
        console.log(inventory);
		axios.post('http://localhost:8000/api/inventory/', inventory).then((res) => console.log('added inventory'));
	};
	render() {
		const { productInfo } = this.props;

		return (
			<div className="product">
				<h3>{productInfo.title}</h3>
				<h4>{productInfo.type}</h4>
				<p>{productInfo.description} </p>
				<p> {productInfo.price}</p>
				<button onClick={() => this.handleAddForm()}>Add</button>
				{this.state.inventoryFrom ? (
					<AddInventory handleAddForm={this.handleAddForm} addInventory={this.addInventory} productId={productInfo.productid} _title={productInfo.title} />
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default product;