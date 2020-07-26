import React from 'react';
import Ibcontext from '../../context';
import tokenServices from '../../services/tokenServices';
import './addInventory-style.css';

const addinventory = ({ handleAddForm, addInventory, productId, _title }) => {
	return (
		<Ibcontext.Consumer>
			{(context) => (
				<div>
					<form
						className="addInventory"
						onSubmit={(e) => {
							e.preventDefault();
							const {location, quantity, comments } = e.target;
							const inventory = {
								title: _title,
								productid: productId,
								location: location.value,
								quantity: quantity.value,
								comments: comments.value,
								userid: `${tokenServices.getUser().userId}`,
								user_name: tokenServices.getUser().user
							};
							addInventory(inventory);
							handleAddForm();
						}}
					>
						<input name="location" placeholder="location" />
						<input name="quantity" placeholder="quantity" />
						<input name="comments" placeholder="comments" />
						<button type="submit"> Add </button>
					</form>
				</div>
			)}
		</Ibcontext.Consumer>
	);
};
export default addinventory;
