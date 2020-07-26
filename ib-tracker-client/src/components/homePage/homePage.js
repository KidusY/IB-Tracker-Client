import React from 'react';
import NavBar from '../navBar/navBar';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import tokenServices from '../../services/tokenServices';
import './homePage-style.css';
import productIcon from '../../assets/Icon awesome-barcode@2x.png';
import budgetIcon from '../../assets/Group 4@2x.png';
import usersIcon from '../../assets/Group 5@2x.png';

const homepage = (props) => {
	const style ={
		color:"white",
		textDecoration: "none"
	}
	return (
		<div className="container">
			<NavBar />

			<div className="main">
				<Header location={' '} />
				<div className="collection home">
					<div className="homePage">
						<div className="homePageHeader">
							<h1> Hello, {tokenServices.getUser().user_name} </h1>
							<h2> Welcome to IB tracker </h2>
						</div>
						<div className="menu">
							<Link to="/product" style={style}>
								<div className="menu-items Product">
									<img src={productIcon} alt="productIcon" />
									Products
								</div>
							</Link>
							<Link to="/inventory" style={style}>
								<div className="menu-items Inventory">inventory</div>
							</Link>
							<Link to="/logs" style={style}>
								<div className="menu-items logs"> Logs</div>
							</Link>
							<Link to="/budget" style={style}>
								<div className="menu-items budget">
									<img src={budgetIcon} alt="budget" />
									Budget
								</div>
							</Link>
							<Link to="/users"style={style}>
								<div className="menu-items users">
									<img src={usersIcon} alt="users" />
									Users
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default homepage;
