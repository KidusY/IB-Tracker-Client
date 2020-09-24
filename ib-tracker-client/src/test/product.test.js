import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Product from '../components/product/product';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const value = {
		productInfo: null
	};
	ReactDOM.render(
		<BrowserRouter>
			<IbContext.Provider value={value}>
				<Product />
			</IbContext.Provider>
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
