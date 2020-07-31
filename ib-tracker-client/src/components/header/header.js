import React from 'react';
import './header-style.css';
const Header = (props)=>{
    const location = props.location.slice(1,props.location.length);
    let arrow = ''
    if(location){
        arrow = <span>&gt;</span>
    }
return(
    <header className="header">
    <div className="titleNav">    
     <span id="dashboardFont">Dashboard</span> {arrow} <span id="currentLocation"> {location}</span>
     </div>

    
     </header>
)
}
    


export default Header;