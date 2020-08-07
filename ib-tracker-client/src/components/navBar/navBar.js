import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import tokenServices from '../../services/tokenServices';
import IbContext from '../../context';
import homeIcon from '../../assets/home.png';
import budgetIcon from '../../assets/budget.png';
import inventoryIcon from '../../assets/inventory.png';
import productsIcon from '../../assets/products.png';
import logsIcon from '../../assets/logs.png';
import maleAvatar from '../../assets/undraw_male_avatar_323b.png';
import $ from 'jquery';
import './navBar-style.css';

const navBar = (props) => {
	let isAdmin = false;
	if (tokenServices.getUser().isAdmin === 'true') {
		isAdmin = true;
	}
	const handleMenuBar = () => {
		$('#navBar').toggle();
	};
	let userPic = tokenServices.getUser().profilePic;
	if (!userPic) {
		userPic = maleAvatar;
	}
	console.log(isAdmin);
	return (
		<IbContext.Consumer>
			{(context) => (
				<div>
					<div id="navBarIcon" onClick={() => handleMenuBar()}>
						<i className="material-icons">menu</i>{' '}
					</div>
					<nav id="navBar">
						<div className="navBarContent">
							{context.login ? (
								<div className="user">
									<div id="navBarIcon" onClick={() => handleMenuBar()}>
										<i className="material-icons closingIcon">close</i>
									</div>
									<h2>
										{' '}
										<i className="material-icons">track_changes</i> IB tracker{' '}
									</h2>
									<div
										className="profilePic"
										style={{
											background: `url(${userPic})`,
											backgroundPosition: 'center',
											backgroundSize: 'cover'
										}}
									/>
									<h4>{tokenServices.getUser().user_name} </h4>
									<div
										id="btn-logOut"
										onClick={() => {
											props.history.push('/login');
											tokenServices.clearAuthToken();
											context.setLogin(false);
										}}
									>
										logout
									</div>
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
							<ul>
								<Link to="/home" style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}>
									<li>
										{' '}
										<img src={homeIcon} alt="Home" /> Home
									</li>
								</Link>
								<Link
									to="/product"
									style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}
								>
									<li>
										<img src={productsIcon} alt="Product" />Product
									</li>
								</Link>
								<Link
									to="/inventory"
									style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}
								>
									<li>
										<img src={inventoryIcon} alt="Inventory" />Inventory
									</li>
								</Link>
								{isAdmin ? (
									<div>
										<Link
											to="/logs"
											style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}
										>
											<li>
												<img src={logsIcon} alt="Logs" />Logs
											</li>
										</Link>

										<Link
											to="/budget"
											style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}
										>
											<li>
												<img src={budgetIcon} alt="Budget" />Budget
											</li>
										</Link>
										<Link
											to="/users"
											style={{ textDecoration: 'none', color: 'grey', fontWeight: 'bold' }}
										>
											<li>
												<i className="material-icons">supervisor_account</i>users
											</li>
										</Link>
									</div>
								) : (
									<div />
								)}
							</ul>
						</div>
					</nav>
				</div>
			)}
		</IbContext.Consumer>
	);
};

export default withRouter(navBar);
