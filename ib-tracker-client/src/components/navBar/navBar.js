import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import tokenServices from '../../services/tokenServices';
import IbContext from '../../context';
import homeIcon from '../../assets/home.png';
import budgetIcon from '../../assets/budget.png';
import inventoryIcon from '../../assets/inventory.png';
import productsIcon from '../../assets/products.png';
import logsIcon from '../../assets/logs.png'
import './navBar-style.css';

const navBar = (props) => {
	return (
		<IbContext.Consumer>
			{(context) => (
				<div>
					<nav>
					
						
						{context.login ? (
							<div className="user">
							<div className="profilePic">profile pic </div>
							<h5>{tokenServices.getUser()} </h5>
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
						
							<Link to="/home" style={{textDecoration:'none', color:'grey',fontWeight:"bold"}}>
								<li> <img src={homeIcon} alt="Home"/> Home</li>
							</Link>
							<Link to="/product" style={{textDecoration:'none', color:'grey',fontWeight:"bold"}}>
								<li><img src={productsIcon} alt="Product"/>Product</li>
							</Link>
							<Link to="/inventory" style={{textDecoration:'none', color:'grey',fontWeight:"bold"}}>
								<li><img src={inventoryIcon} alt="Inventory"/>Inventory</li>
							</Link>
							<Link to="/logs" style={{textDecoration:'none', color:'grey',fontWeight:"bold"}}>
								<li><img src={logsIcon} alt="Logs"/>Logs</li>
							</Link>
							<Link to="/budget" style={{textDecoration:'none', color:'grey',fontWeight:"bold"}}>
								<li><img src={budgetIcon} alt="Budget"/>Budget</li>
							</Link>
							
						</ul>
					</nav>
				</div>
			)}
		</IbContext.Consumer>
	);
};

export default withRouter(navBar);
