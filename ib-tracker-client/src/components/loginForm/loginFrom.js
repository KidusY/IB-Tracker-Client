import React from 'react';
import axios from 'axios';
import spinner from '../../assets/spinner.gif';
import userIcon from '../../assets/hiclipart.com.png';
import loginIcon from '../../assets/undraw_unlock_24mb.png'
import tokenServices from '../../services/tokenServices';
import config from '../../config';

import './loginFrom-style.css';
class loginFrom extends React.Component {
	constructor(){
		super();
		this.state = {
			error: '',
			pending:false
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
				console.log(res);				
				tokenServices.saveAuthToken(res.data.authToken);
				tokenServices.saveUser(res.data.sub, res.data.payload.user_id,res.data.userImage,res.data.isAdmin);
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
				this.setState({error:err.response.data.error, pending:false});
				
			});
	};

	render() {
		return (
			<div className="login">
				<div className="loginArt">
				
				</div>
				<div className="loginFrom">
				<h1> Ib Tracker </h1>
				<h3>Manage your Inventory</h3>
					<form
						onSubmit={(e) => {
							this.setState({pending:true})
							e.preventDefault();							
							this.onSubmitHandler(e);

						}}
					>
				
						<img className="userIcon" src={loginIcon} alt="user" />
						<div className="input-icons">
						<label htmlFor="" className="errorLabel" >{this.state.error}</label>
						{
							this.state.pending ?
							<label htmlFor="" ><img src={spinner} className="loginSpinner" alt="loading"/></label>
							: <div/>
						}
						
							<label htmlFor ="userName" className="inputLabel">User Name</label>
							<i className="material-icons icon">account_box</i>
							<input id="userName" className="input-field" name="userName" placeholder="JohnDoe" />
							<label htmlFor="password" className="inputLabel">Password</label>
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
