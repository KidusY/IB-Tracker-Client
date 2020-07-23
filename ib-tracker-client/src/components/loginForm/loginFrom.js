import React from 'react';
import axios from 'axios';
import tokenServices from '../../services/tokenServices';
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
				tokenServices.saveUser(res.data.sub);				
				props.setLogin(true);	
				props.setUser (res.data.sub);
				if (res.status === 201) {                   
                    props.history.push('/home');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1>Login From</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitHandler(e);
				}}
			>
				<input id="userName" name="userName" placeholder="User Name" />
				<input id="password" name="password" placeholder="Password" />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
};

export default loginFrom;
