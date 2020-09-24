import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/products/products';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const value = {
		login: null
	};
	ReactDOM.render(
		<BrowserRouter>
			<IbContext.Provider value={value}>
				<Products />
			</IbContext.Provider>
			
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
