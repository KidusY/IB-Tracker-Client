import React from 'react';
import { withRouter } from 'react-router-dom';
import heroPic from '../../assets/undraw_heavy_box_agqi (2).png';
import productIcon from '../../assets/products.png';
import inventoryIcon from '../../assets/inventory.png';
import budgetIcon from '../../assets/budget.png';
import budget from '../../assets/undraw_personal_finance_tqcd.png'
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
				<div className="hero">
					<div className="heroImg">
						<img src={heroPic} alt="heroImg" />
					</div>
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
					<div className="card purple">
						<img src={productIcon} alt="product" />
						<h3> Product </h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</div>
					<div className="card scroll " data-direction="vertical" data-rate="-3">
						<img src={inventoryIcon} alt="product" />
						<h3>Inventory</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</div>
					<div className="card scroll purple" data-direction="vertical" data-rate="-2.5">
						<img src={budgetIcon} alt="product" />
						<h3>Budget</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</div>
				</div>
			
			<section className="secondSection">
			<div className="secondSectionText"> 
				<h3> Ib tracker is an inventory management platform that solves problems for small business. </h3>
				<h5> Not only it manages your inventory -- it manages your budget</h5>
					<ul>
						<li>Control Your inventory</li>
						<li>Get alerted before you are low</li>
						<li>Manage your employees activity</li>
					</ul>
				</div>

				<div className="secondSectionImg">
					<img src={budget} alt="budget"/>
				</div>
			</section>


			<footer>
			© Allrights resvered to IB tracker corp
			 </footer>
			
			</div>
		</div>
	);
};

export default withRouter(landingPage);
