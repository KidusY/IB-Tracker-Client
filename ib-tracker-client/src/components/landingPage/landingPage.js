import React from 'react';
import { withRouter } from 'react-router-dom';
import heroPic from '../../assets/landingPagePic.png';
import productIcon from '../../assets/products.png';
import inventoryIcon from '../../assets/inventory.png';
import budgetIcon from '../../assets/budget.png';
import './landingPage-style.css';

const landingPage = (props) => {
	return (
		<div>
			<div className="landingPage">
				<header>
					<h2 className="logo">
						{' '}
						<i className="material-icons">track_changes</i> IB tracker{' '}
					</h2>
					<button id="btn-login" onClick={() => props.history.push('/login')}>
						Login
					</button>
				</header>
				<img className="heroPic" src={heroPic} alt="heroPic" />
				<div className="heroText">
					<h1> Success Starts With A Great App. </h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse
					</p>
				</div>
			</div>
			<div className="landingPageInfo">
				<div className="card">
				<img src = {productIcon} alt="product"/>
					<h3> Product </h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. 
					</p>
				</div>
				<div className="card">
				<img src = {inventoryIcon} alt="product"/>
					<h3>Inventory</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</p>
				</div>
				<div className="card">
				<img src = {budgetIcon} alt="product"/>
					<h3>Budget</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. 
					</p>
				</div>
			</div>
		</div>
	);
};

export default withRouter(landingPage);
