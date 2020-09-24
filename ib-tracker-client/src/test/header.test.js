import React from 'react';
import IbContext from '../context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/header/header';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const value = {
		login: null
	};
	ReactDOM.render(
		<BrowserRouter>
			<IbContext.Provider value={value}>
				<Header />
			</IbContext.Provider>
			
		</BrowserRouter>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
