import React from 'react';
import axios from 'axios';
import Header from '../header/header';
import NavBar from '../navBar/navBar';
import User from '../user/user';
import config from '../../config';
import spinner from '../../assets/spinner.gif';
import tokenServices from '../../services/tokenServices';
import IBTrackerServices from '../../services/Ib-tracker-services';
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
		this.setState({
			editForm: !this.state.editForm,
			currentUserInfo: userInfo
		});
	};

	updateUser = (userInfo) => {
		axios
			.put(`${config.API_ENDPOINT}/api/users/${this.state.currentUserInfo.id}`, userInfo, {
				headers: {
					Authorization: tokenServices.getAuthToken()
				}
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	createUser = (userInfo) => {
		this.setState({ error: '' });
		axios
			.post(`${config.API_ENDPOINT}/api/users`, userInfo, {
				headers: {
					Authorization: tokenServices.getAuthToken()
				}
			})
			.then(() => this.setState({ addUserForm: false }))
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
				<div className="main">
					<Header location={this.props.location.pathname} />
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
					<button
						className="addUser-btn"
						onClick={() => this.setState({ addUserForm: !this.state.addUserForm })}
					>
						<i className="material-icons">account_circle</i>
					</button>
					{this.state.editForm ? (
						<div>
							<form
								className="userForm"
								onSubmit={(ev) => {
									ev.preventDefault();
									const { _fullName, _nickName, _imageLink, _userName, _isadmin } = ev.target;
									const userInfo = {
										full_name: _fullName.value,
										nickname: _nickName.value,
										user_name: _userName.value,
										isadmin: _isadmin,
										profilepic: _imageLink.value,
										date_modified: date
									};
									this.updateUser(userInfo);

									this.setState({ editForm: false });
								}}
							>
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
								<input name="_imageLink" placeholder="Image Link" />
								<select name="_isadmin">
									<option value="true">Admin</option>
									<option value="false">Basic</option>
								</select>
								<button type="submit">Done</button>
							</form>
						</div>
					) : (
						<div />
					)}

					{this.state.addUserForm ? (
						<div>
							<form
								className="userForm"
								onSubmit={(ev) => {
									ev.preventDefault();
									const {
										_fullName,
										_nickName,
										_password,
										_imageLink,
										_userName,
										_isadmin
									} = ev.target;
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
								<label htmlFor="">{this.state.error}</label>
								<input name="_userName" placeholder="User Name" required />
								<input name="_password" placeholder="Password" required />
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
				</div>
			</div>
		);
	}
}

export default users;
