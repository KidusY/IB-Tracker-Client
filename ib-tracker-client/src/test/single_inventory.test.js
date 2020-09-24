import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SingleInventory from '../components/single_Inventory/single_Inventory';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const value = {
		login: null
	};
	ReactDOM.render(
		<BrowserRouter>
			<IbContext.Provider value={value}>
				<SingleInventory />
			</IbContext.Provider>
			
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
