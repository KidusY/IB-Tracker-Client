import React from 'react';
import axios from 'axios';
import Header from '../header/header';
import NavBar from '../navBar/navBar';
import User from '../user/user';
import config from '../../config';
import spinner from '../../assets/spinner.gif';
import tokenServices from '../../services/tokenServices';
import Ibservices from '../../services/Ib-tracker-services';
import IBTrackerServices from '../../services/Ib-tracker-services';
import $ from 'jquery';
import './users-style.css';

class users extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			currentUserInfo: {},
			editForm: false,
			addUserForm: false,
			error: ''
		};
	}
	componentDidMount() {
		IBTrackerServices.getUsers().then((users) => this.setState({ users: users.data }));
	}

	showEditUserForm = (userInfo) => {
		if (!this.state.editForm) {
			$('.main').css({ opacity: '0.5', filter: 'grayscale(100%) brightness(40%)', background: 'grey' });
		} else {
			$('.main').css({ opacity: '1', filter: 'none', background: 'white' });
		}

		this.setState({
			editForm: !this.state.editForm,
			currentUserInfo: userInfo
		});
	};
	handleAddUserModal = () => {
		if (!this.state.addUserForm) {
			$('.main').css({ opacity: '0.5', filter: 'grayscale(100%) brightness(40%)', background: 'grey' });
		} else {
			$('.main').css({ opacity: '1', filter: 'none', background: 'white' });
		}
		this.setState({ addUserForm: !this.state.addUserForm });
	};

	updateUser = (userInfo) => {
		axios
			.put(`${config.API_ENDPOINT}/api/users/${this.state.currentUserInfo.id}`, userInfo, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then(() =>
				Ibservices.postLog({
					actions: `Updated User ${userInfo.user_name}`,
					user_name: `${tokenServices.getUser().user_name}`
				})
			)
			.catch((err) => console.log(err));
	};

	createUser = (userInfo) => {
		this.setState({ error: '' });
		console.log(tokenServices.getAuthToken(config.TOKEN_KEY));

		axios
			.post(`${config.API_ENDPOINT}/api/users`, userInfo, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			})
			.then(() => {
				this.handleAddUserModal();
				Ibservices.postLog({
					actions: `User Created ${userInfo.user_name} `,
					user_name: `${tokenServices.getUser().user_name}`
				});
			})
			.catch((err) => {
				console.log(err.response.data);
				if (err.response.data) return this.setState({ error: err.response.data.error });
			});
	};
	render() {
		const date = new Date();

		return (
			<div className="container">
				<NavBar />
				<Header location={this.props.location.pathname} />
				<div className="filler" />
				<div className="main">
					<div className="allUsers">
						{this.state.users.length === 0 ? (
							<img className="loadingSpinner" src={spinner} alt="spinner" />
						) : (
							this.state.users.map((userInfo, i) => (
								<User
									key={i}
									userInfo={userInfo}
									showEditUserForm={this.showEditUserForm}
									updateUser={this.updateUser}
								/>
							))
						)}
					</div>
					<button className="addUser-btn" onClick={() => this.handleAddUserModal()}>
						<i className="material-icons">account_circle</i>
					</button>
				</div>
				{this.state.addUserForm ? (
					<div>
						<form
							className="userForm"
							onSubmit={(ev) => {
								ev.preventDefault();
								const { _fullName, _nickName, _password, _imageLink, _userName, _isadmin } = ev.target;
								const userInfo = {
									full_name: _fullName.value,
									nickname: _nickName.value,
									password: _password.value,
									user_name: _userName.value,
									isadmin: _isadmin.value,
									profilepic: _imageLink.value
								};

								this.createUser(userInfo);
							}}
						>
							<label className="close" onClick={() => this.handleAddUserModal()}>
								<i className="material-icons">exit_to_app</i>
							</label>
							<label>Add User</label>
							<label htmlFor="" className="errorLabel">
								{this.state.error}
							</label>
							<input name="_userName" placeholder="User Name" required />
							<input type="password" name="_password" placeholder="Password" required />
							<input name="_fullName" placeholder="Full Name" required />
							<input name="_nickName" placeholder="Nick Name" />
							<input name="_imageLink" placeholder="Image Link" />
							<select name="_isadmin">
								<option value="true">Admin</option>
								<option value="false">Basic</option>
							</select>
							<button type="submit">Create User</button>
						</form>
					</div>
				) : (
					<div />
				)}

				{this.state.editForm ? (
					<div>
						<form
							className="userForm"
							onSubmit={(ev) => {
								ev.preventDefault();
								const { _fullName, _nickName, _imageLink, _userName, _isadmin } = ev.target;
								const userInfo = {
									full_name: `${_fullName.value}`,
									nickname: `${_nickName.value}`,
									user_name: `${_userName.value}`,
									isadmin: _isadmin.value,
									profilepic: `${_imageLink.value}`,
									date_modified: date
								};
								this.updateUser(userInfo);

								this.setState({ editForm: false });
								this.showEditUserForm();
							}}
						>
							<label className="close" onClick={() => this.showEditUserForm()}>
								<i className="material-icons">exit_to_app</i>
							</label>
							<label> Edit User </label>
							<input
								name="_userName"
								defaultValue={this.state.currentUserInfo.user_name}
								placeholder="User Name"
								required
							/>
							<input
								name="_fullName"
								defaultValue={this.state.currentUserInfo.full_name}
								placeholder="Full Name"
								required
							/>
							<input
								name="_nickName"
								defaultValue={this.state.currentUserInfo.nickname}
								placeholder="Nick Name"
							/>
							<input
								name="_imageLink"
								defaultValue={this.state.currentUserInfo.profilepic}
								placeholder="Image Link"
							/>
							<select name="_isadmin" defaultValue="false">
								<option value="true">Admin</option>
								<option value="false">Basic</option>
							</select>
							<button type="submit">Done</button>
						</form>
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default users;
