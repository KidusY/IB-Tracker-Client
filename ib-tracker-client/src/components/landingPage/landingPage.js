import React from 'react';
import { withRouter } from 'react-router-dom';
import heroPic from '../../assets/undraw_heavy_box_agqi (2).png';
import productIcon from '../../assets/products.png';
import inventoryIcon from '../../assets/inventory.png';
import budgetIcon from '../../assets/budget.png';
import where_to_start from '../../assets/undraw_start_building_vqhd.png';
import How_to_use from '../../assets/undraw_Terms_re_6ak4.png';
import budget from '../../assets/undraw_personal_finance_tqcd.png';
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
							This web app helps small businesses keep track of their inventory and their transactions.
							The admin will be able to track what his/her employee is doing, the amount of product sold,
							the amount of product discarded and the amount of product ordered from the main vendor. This
							web app also allows the admin to view their budget and calculate how much they can save
							based on their earnings.
						</p>
					</div>
				</div>

				<div className="landingPageInfo">
					<div className="card purple">
						<img src={productIcon} alt="product" />
						<h3> Product </h3>
						<p>
							Take control of your Product, you can view your products and add new products. You can also
							add descriptions so that your employees are well informed.
						</p>
					</div>
					<div className="card scroll " data-direction="vertical" data-rate="-3">
						<img src={inventoryIcon} alt="product" />
						<h3>Inventory</h3>
						<p>
							Managing inventory can be hard, don't let it stop you from owning your own bushiness. At
							IB-tracker you can manage your inventory with just one click.
						</p>
					</div>
					<div className="card scroll purple" data-direction="vertical" data-rate="-2.5">
						<img src={budgetIcon} alt="product" />
						<h3>Budget</h3>
						<p>
							Why hire an assistant manger when you can delegate management jobs to Ib-tracker. Ib-tracker
							helps you manage your inventory but also your budget
						</p>
					</div>
				</div>

				<section className="secondSection">
					<div className="secondSectionText">
						<h3>
							{' '}
							Ib tracker is an inventory management platform that solves problems for small businesses.{' '}
						</h3>
						<h5> Not only it manages your inventory -- it manages your budget</h5>
						<ul>
							<li>Control Your inventory</li>
							<li>Get alerted before you are low</li>
							<li>Manage your employees activity</li>
						</ul>
					</div>

					<div className="secondSectionImg">
						<img src={budget} alt="budget" />
					</div>
				</section>

				<section className="thirdSection">
					<div className="how_to_use">
						<img src={How_to_use} alt="how_to_use" />
						<div>
							<h3> How to use the app... </h3>
							<p>
								After logging in, get familiar with the app, go through all the tabs. On the left side is
								where you would find your options or on the dashboard which is the home screen. The
								products section should give you an idea how your product might display and all the
								functionalities that comes out of the box. You will be able to add your products to your
								current inventory. When adding or doing important actives the app logs all the
								transactions and you will able to view all the info in the logs page. All the logged
								information is changed into meaningful data in the budgets section where you will be
								able to see all your loss,income,profits and more.
							</p>
						</div>
					</div>
					<div className="where_to_start">
					
					<div>
					<h3> Where to start... </h3>
					<p>
						The best thing about Ib-Tracker is that it is customizable for your needs. Here at Ib-Tracker,
						we believe that all business are not created equal and some business require more logic that
						others. We don't provide a cookie cutter app, we tailor the app for you. click below to visit
						what your future app will do for you.
					</p>
					 </div>
					 <img src={where_to_start} alt="where to start "/>
					 </div>
					
					<button id="btn-login" onClick={() => props.history.push('/login')}>
						Start Here
					</button>
				</section>

				<footer>© All rights reserved to IB tracker corp.</footer>
			</div>
		</div>
	);
};

export default withRouter(landingPage);
