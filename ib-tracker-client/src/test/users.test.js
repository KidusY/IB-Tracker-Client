import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from '../components/users/users';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(
		<BrowserRouter>
			<Route path="/users" component={(props) => <Users {...props}  />} />
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
