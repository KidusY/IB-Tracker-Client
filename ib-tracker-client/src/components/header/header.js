import React from 'react';
import './header-style.css';
const Header = (props)=>{
    const location = props.location.slice(1,props.location.length);
 
return(
    <header className="header">
    <div className="titleNav">    
     <span id="dashboardFont">Dashboard</span> <span id="currentLocation">&gt; {location}</span>
     </div>

    
     </header>
)
}
    


export default Header;