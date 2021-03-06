import React from 'react';
import { withRouter } from 'react-router-dom'
import './header-style.css';
const Header = (props) => {
    const location = props.location.pathname.slice(1, props.location.length);
    let arrow = ''
    if (location) {
        arrow = <span>&gt;</span>
    }
    return (
        <header className="header">
            <div className="titleNav">
                <span style={{ cursor: 'pointer' }} id="dashboardFont" onClick={() => props.history.push('/home')}>Dashboard</span> {arrow} <span id="currentLocation"> {location}</span>
            </div>


        </header>
    )
}



export default withRouter(Header);