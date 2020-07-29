import React from 'react';
import './user-style.css';
class User extends React.Component {
	render() {
		let admin="Basic User" 
		if(this.props.userInfo.isadmin){
			admin="Admin User"
		}
		return (
			<div className="userInfo" onClick={() => this.props.showEditUserForm(this.props.userInfo)}>
				<img src="https://i.imgur.com/4ePrUDp.png" alt="userpic" />
				<h2>{this.props.userInfo.user_name} </h2>
				<h3>{this.props.userInfo.full_name} </h3>
				<h3>{this.props.userInfo.nickname} </h3>
				<h4>{this.props.userInfo.date_created}</h4>
				<h5>{admin}</h5>
			</div>
		);
	}
}

export default User;
