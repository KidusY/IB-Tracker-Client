import React from 'react';
import { withRouter } from 'react-router-dom';
import './landingPage-style.css';
import IbContext from '../../context';
const landingPage = (props) => {
	return (
		<div className="landingPage">
			<header>
				{' '}
				<h1>IB tracker </h1>
				<div id="btn-login" onClick={() => props.history.push('/login')}>
					login
				</div>
			</header>

            <h2 style={{"margin": '300px'}}> LandingPage </h2>
		</div>
	);
};

export default withRouter(landingPage);
