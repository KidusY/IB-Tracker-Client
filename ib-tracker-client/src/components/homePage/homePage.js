import React from 'react';
import NavBar from '../navBar/navBar';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import tokenServices from '../../services/tokenServices';
import './homePage-style.css';

const homepage = (props) => {
	const style = {
		color: 'white',
		textDecoration: 'none'
	};
	return (
		<div className="container">
			<NavBar />
			<Header location={' '} />
			<div className="filler" />
			<div className="main">
				<div className="collection home">
					<div className="homePage">
						<div className="homePageHeader">
							<div className="textHeader">
								<h1> Hello, {tokenServices.getUser().user_name} </h1>
								<h2> Welcome to IB tracker </h2>
							</div>
							<div className="date">{new Date().toString()}</div>
						</div>
						
						<div className="menu">
						
							<Link to="/product" style={style}>
								<div className="menu-items Product">
									<h3> Products </h3>
								</div>
							</Link>
							<Link to="/inventory" style={style}>
								<div className="menu-items Inventory">
									<h3> inventory </h3>
								</div>
							</Link>
							<Link to="/logs" style={style}>
								<div className="menu-items logs">
								<h3> Logs </h3>
									
								</div>
							</Link>
							<Link to="/budget" style={style}>
								<div className="menu-items budget">
								<h3> Budget </h3>
									
								</div>
							</Link>
							<Link to="/users" style={style}>
								<div className="menu-items users">
								<h3>Users</h3>
									
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
