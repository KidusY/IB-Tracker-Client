import React from 'react';
import './addInventory-style.css';

const addinventory = ({ handleAddForm, addInventory, productId,_title }) => {
	return (
		<div>
			<form
				className="addInventory"
				onSubmit={(e) => {
					e.preventDefault();
					const { title, location, quantity, comments } = e.target;
					const inventory = {
						title:_title,
                        productid:productId,
						location: location.value,
						quantity: quantity.value,
						comments: comments.value,
                        userid:"2"
					};
					addInventory(inventory);
					handleAddForm();
				}}
			>
				
				<input name="location" placeholder="location" />
				<input name="quantity" placeholder="quantity" />
				<input name="comments" placeholder="comments" />
				<input type="submit" value="Add" />
			</form>
		</div>
	);
};
export default addinventory;
