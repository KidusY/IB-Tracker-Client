import React from 'react';

import './user-style.css';
class User extends React.Component {
	//	if()
	render() {
		let userPic = this.props.userInfo.profilepic;
		if (!userPic) {
			userPic = 'https://i.imgur.com/4ePrUDp.png';
		}
		let admin = 'Basic User';
		if (this.props.userInfo.isadmin) {
			admin = 'Admin User';
		}
		return (
			<div className="userInfo" onClick={() => this.props.showEditUserForm(this.props.userInfo)}>
				<div className="userPic" style={{ background: `url(${userPic})`,
				 backgroundPosition: 'center',
				 backgroundSize:'cover'
				  }}>
					{' '}
				</div>
				<h2>{this.props.userInfo.user_name} </h2>
				<h3>{this.props.userInfo.full_name} </h3>
				<h3>{this.props.userInfo.nickname} </h3>
				<h4>{new Date(this.props.userInfo.date_created).toDateString()}</h4>
				<h5>{admin}</h5>
			</div>
		);
	}
}

export default User;
