import React from 'react';

import './addProductFrom-Style.css';

const addProductFrom = (props) => {
	return (
		<div>
			<form
				className="addProductFrom"
				onSubmit={(e) => {
					e.preventDefault();
					const { upc, title, description, type, height, width, price, rating } = e.target;
					const productInfo = {
						upc: upc.value,
						title: title.value,
						description: description.value,
						type: type.value,
						height: height.value,
						width: width.value,
						price: price.value,
						rating: rating.value
					};
					props.handleAddProducts(productInfo);
					props.handleAddFormModal();
				}}
			>
			<label className="close" onClick={()=>props.handleAddFormModal()}><i className="material-icons">exit_to_app</i></label>
				<label>Add Product</label>

				

				<input name="upc" placeholder="UPC" />
				<input name="title" placeholder="Name" />
				<input name="description" placeholder="Description" />
				<input name="type" placeholder="Type" />
				<input name="height" placeholder="Height" />
				<input name="width" placeholder="Width" />
				<input name="price" placeholder="Price" />
				<input name="rating" placeholder="Rating" />

				<button type="submit">Add Product</button>
			</form>
		</div>
	);
};

export default addProductFrom;
