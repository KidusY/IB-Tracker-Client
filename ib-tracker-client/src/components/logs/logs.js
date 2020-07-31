import React from 'react';
import axios from 'axios';
import config from '../../config';
import tokenServices from '../../services/tokenServices';
import NavBar from '../navBar/navBar';
import Log from '../log/log';
import spinner from '../../assets/spinner.gif';
import Header from '../header/header';

class logs extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: [],
			error: ''
		};
	}
	componentDidMount() {
		axios
			.get(`${config.API_ENDPOINT}/api/logs`, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then((res) => {
				this.setState({ logs: res.data });
			});
	}

	render() {
		return (
			<div className="container">
				<NavBar />
				<div className="main">
					<Header searchForProduct={this.searchForProduct} location={this.props.location.pathname} />
					<div className="collection">
						{this.state.logs.length === 0 ? (
							<img className="loadingSpinner" src={spinner} alt="spinner" />
						) : (
							<table className="table">
								<thead>
									<tr className="inventory tableHeader">
										<th className="col">User</th>
										<th className="col">Actions</th>
										<th className="col">Qty</th>
										<th className="col">Price</th>
										<th className="col">Product Id</th>
										<th className="col">Date</th>
									</tr>
								</thead>
                                <tbody>
                                {this.state.logs.map((log, i) => <Log log={log} key={i} />)}
                                </tbody>
								
							</table>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default logs;
