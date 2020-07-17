import React from 'react';
import { Link } from 'react-router-dom';
import './navBar-style.css';
const navBar = () => {
	return (
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
				<div id="btn-loginOut"> login </div>
			</nav>
		</div>
	);
};

export default navBar;
