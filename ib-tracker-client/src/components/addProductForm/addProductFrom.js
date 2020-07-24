import React from 'react';
import axios from 'axios';
import tokenService from '../../services/tokenServices';
import './addProductFrom-Style.css';

const addProductFrom = (props) => {
	const handleAddProducts = (productInfo) => {
		axios.post('http://localhost:8000/api/product/', productInfo, {
			headers: {
				Authorization: `bearer ${tokenService.getAuthToken()}`
			}
		}).catch(err=>console.log(err))
	};

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
					handleAddProducts(productInfo);
                    props.handleAddFormModal();
				}}
			>
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
