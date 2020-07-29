import React from 'react';
import axios from 'axios';
import userIcon from '../../assets/hiclipart.com.png';
import tokenServices from '../../services/tokenServices';
import config from '../../config';

import './loginFrom-style.css';
class loginFrom extends React.Component {
	constructor(){
		super();
		this.state = {
			error: ''
		}
	}
	

	onSubmitHandler = (ev) => {
				
		const { userName, password } = ev.target;
		const loginInfo = {
			user_name: userName.value,
			password: password.value
		};
		axios
			.post(`${config.API_ENDPOINT}/api/login`, loginInfo)
			.then((res) => {				
				tokenServices.saveAuthToken(res.data.authToken);
				tokenServices.saveUser(res.data.sub, res.data.payload.user_id);
				this.props.setLogin(true);
				this.props.setUser(res.data.sub);
				if (res.status === 201) {
					
					this.props.history.push('/home');
				}
				else{
					this.props.setLoading();
				}
			})
			.catch((err) => {
				console.log(err.response.data.error)
				this.setState({error:err.response.data.error});
				
			});
	};

	render() {
		return (
			<div className="login">
				<div className="loginArt">
					<h1>IB tracker </h1>
					<h2> Manage your inventory and more </h2>
				</div>
				<div className="loginFrom">
					<form
						onSubmit={(e) => {
							e.preventDefault();							
							this.onSubmitHandler(e);

						}}
					>
				
						<img className="userIcon" src={userIcon} alt="user" />
						<div className="input-icons">
						<label htmlFor="" >{this.state.error}</label>
							<label htmlFor ="userName">User Name</label>
							<i className="material-icons icon">account_box</i>
							<input id="userName" className="input-field" name="userName" placeholder="JohnDoe" />
							<label htmlFor="password">Password</label>
							<i className="material-icons icon">vpn_key</i>
							<input
								type="password"
								id="password"
								className="input-field"
								name="password"
								placeholder="Password"
							/>
							<button type="submit" id="loginBtn">
								LOGIN
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default loginFrom;
