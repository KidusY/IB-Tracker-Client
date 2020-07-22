import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import tokenServices from '../../services/tokenServices';
import IbContext from '../../context';
import './navBar-style.css';

const navBar = (props) => {
	
	return (
		<IbContext.Consumer>
			{(context) => (
				<div>
					<nav>
						<ul>
							<Link to="/home">
								<li>Home</li>
							</Link>
							<Link to="/product">
								<li>Product</li>
							</Link>
							<Link to="/inventory">
								<li>Inventory</li>
							</Link>
							<Link to="/logs">
								<li>Logs</li>
							</Link>
						</ul>
						{context.login ? (
							<div
								id="btn-loginOut"
								onClick={() => {
									props.history.push('/login');
									tokenServices.clearAuthToken();
									context.setLogin(false);
								}}
							>
								logout
							</div>
						) : (
							<div
								id="btn-logOut"
								onClick={() => {									
									tokenServices.clearAuthToken();
									context.setLogin(false);								
								}}
							>
								{' '}
								login{' '}
							</div>
						)}
					</nav>
				</div>
			)}
		</IbContext.Consumer>
	);
};

export default withRouter(navBar);
