import React from 'react';
import tokenServices from '../../services/tokenServices';
import './addInventory-style.css';

const Addinventory = ({ handleAddInventoryForm, addInventory, productId, _title }) => {
	console.log(_title);
	return (
		<div>
			<form
				className="addInventory"
				onSubmit={(e) => {
					e.preventDefault();
					const { location, quantity, comments } = e.target;
					const inventory = {
						title: _title,
						productid: productId,
						location: location.value,
						quantity: quantity.value,
						comments: comments.value,
						userid: tokenServices.getUser().userId,
						user_name: tokenServices.getUser().user_name
					};
					addInventory(inventory);
					handleAddInventoryForm()
				}}
			>
			<label className="close" onClick={()=>handleAddInventoryForm()}><i className="material-icons">exit_to_app</i></label>
			<label>Add Inventory</label>
			<label className="title">*{_title}</label>
				<input name="location" placeholder="location" />
				<input name="quantity" placeholder="quantity" />
				<input name="comments" placeholder="comments" />
				<button type="submit" className="add-btn"> Add </button>
			</form>
		</div>
	);
};

export default Addinventory;
