import React from 'react';
import axios from 'axios';
import userIcon from '../../assets/hiclipart.com.png';
import tokenServices from '../../services/tokenServices';
import './loginFrom-style.css';
const loginFrom = (props) => {
	const onSubmitHandler = (ev) => {
		const { userName, password } = ev.target;
		const loginInfo = {
			user_name: userName.value,
			password: password.value
		};
		axios
			.post('http://localhost:8000/api/login', loginInfo)
			.then((res) => {
				console.log(res);
				tokenServices.saveAuthToken(res.data.authToken);
				tokenServices.saveUser(res.data.sub,res.data.payload.user_id);
				props.setLogin(true);
				props.setUser(res.data.sub);
				if (res.status === 201) {
					props.history.push('/home');
				}
			})
			.catch((err) => console.log(err));
	};

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
					onSubmitHandler(e);
				}}
			>
			<img className="userIcon" src={userIcon} alt="user"/>
				<div className="input-icons">
					<label for="userName">User Name</label>
					<i className="material-icons icon">account_box</i>
					<input id="userName" className="input-field" name="userName" placeholder="JohnDoe" />
					<label for="password">Password</label>
					<i className="material-icons icon">vpn_key</i>
					<input type="password"id="password" className="input-field" name="password" placeholder="Password" />
					<button type="submit" id="loginBtn">LOGIN </button>
				</div>
			</form>
		</div>
			
		</div>
	);
};

export default loginFrom;
