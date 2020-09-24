import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginFrom from '../components/loginForm/loginFrom';

it('renders without crashing', () => {
	const div = document.createElement('div');

	ReactDOM.render(
		<BrowserRouter>
			<LoginFrom />
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
