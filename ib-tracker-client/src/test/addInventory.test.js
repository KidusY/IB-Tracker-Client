import React from 'react';

import ReactDOM from 'react-dom';

import AddInventory from '../components/addInventoy/addInventory';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(<AddInventory />, div);

	ReactDOM.unmountComponentAtNode(div);
});
