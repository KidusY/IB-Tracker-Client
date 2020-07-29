import React from 'react';
import { Route } from 'react-router-dom';
import spinner from './assets/spinner.gif';
import LoginForm from './components/loginForm/loginFrom';
import LandingPage from './components/landingPage/landingPage';
import HomePage from './components/homePage/homePage';
import Logs from './components/logs/logs';
import Inventory from './components/inventory/inventory';
import Product from './components/products/products';
import tokenServices from './services/tokenServices';
import Users from './components/users/users';
import config from './config';
import IbContext from './context';
import './App.css';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			login: false,
			user: '',
			loading: false
		};
	}

	setLogin = (login) => {
		return this.setState({ login: login });
	};
	setLoading = () => {
		this.setState({ loading: !this.state.loading });
		return this.state.loading;
	};
	setUser = (user) => {
		return this.setState({ user: user });
	};
	componentDidMount() {
		const authToken = tokenServices.getAuthToken(config.TOKEN_KEY);
		if (authToken) {
			this.setState({ login: true });
		}
	}

	render() {
		const value = {
			setLogin: this.setLogin,
			login: this.state.login,
			user: this.state.user,
			setLoading: this.setLoading
		};

		return (
			<IbContext.Provider value={value}>
				<div className="App">
					{this.state.loading ? <img className="loadingSpinner" src={spinner} alt="spinner" /> : <div />}
					<Route
						exact
						path="/"
						component={(props) => {
							return <LandingPage {...props} />;
						}}
					/>
					<Route
						path="/login"
						component={(props) => {
							return (
								<LoginForm
									{...props}
									setLogin={this.setLogin}
									setUser={this.setUser}
									setLoading={this.setLoading}
								/>
							);
						}}
					/>
					{this.state.login ? (
						<div>
							<Route path="/home" component={(props) => <HomePage {...props} />} />
							<Route
								path="/logs"
								component={(props) => <Logs {...props} setLoading={this.setLoading} />}
							/>
							<Route
								path="/inventory"
								component={(props) => <Inventory {...props} setLoading={this.setLoading} />}
							/>
							<Route
								path="/product"
								component={(props) => <Product {...props} setLoading={this.setLoading} />}
							/>
							<Route
								path="/users"
								component={(props) => <Users {...props} setLoading={this.setLoading} />}
							/>
						</div>
					) : (
						<div />
					)}
				</div>
			</IbContext.Provider>
		);
	}
}

export default App;
