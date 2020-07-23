import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm/loginFrom';
import LandingPage from './components/landingPage/landingPage';
import HomePage from './components/homePage/homePage';
import Logs from './components/logs/logs';
import Inventory from './components/inventory/inventory';
import Product from './components/products/products';
import tokenServices from './services/tokenServices';
import config from './config';
import IbContext from './context';
import './App.css';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			login: false,
			user:''
		};
	}

	setLogin = (login) => {
		this.setState({ login: login });
	};
	setUser = (user)=>{
this.setState({user:user})
	}
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
			user:this.state.user			
			
		};
	

		return (
			<IbContext.Provider value={value}>
				<div className="App">
				<Switch>
					
				</Switch>

					<Route
						exact path="/"
						component={(props) => {						
							return <LandingPage {...props} />;
						}}
					/>
					<Route
						path="/login"
						component={(props) => {						
							return <LoginForm {...props} setLogin={this.setLogin} setUser={this.setUser} />;
						}}
					/>
					{this.state.login ? (
						<div>
							<Route path="/home" component={(props) => <HomePage {...props} />} />
							<Route path="/logs" component={(props) => <Logs {...props} />} />
							<Route path="/inventory" component={(props) => <Inventory {...props} />} />
							<Route path="/product" component={(props) => <Product {...props} />} />
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
