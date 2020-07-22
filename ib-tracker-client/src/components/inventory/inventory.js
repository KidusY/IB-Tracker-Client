import React from 'react';
import NavBar from '../navBar/navBar';
import axios from 'axios';
import './inventory-style.css'
import SingleIventory from '../single_Inventory/single_Inventory';
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
			.get('http://localhost:8000/api/inventory/',{
				headers:{
					Authorization:`bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}` 
				}
			})
			.then((resInventory) => this.setState({ inventory: resInventory.data }));
	}
	render() {
		return (
			<div>
				<NavBar />

				<h1>Ib inventory </h1>
                <div className="collection"> 
				{this.state.inventory.map((inventory) => <SingleIventory inventory={inventory} />)}
                </div>
			</div>
		);
	}
}
export default inventory;
