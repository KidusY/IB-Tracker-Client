import React from 'react';
import './header-style.css';
const Header = (props)=>{
    const location = props.location.slice(1,props.location.length);
    console.log(location);
return(
    <header className="header">
    <div className="titleNav">
    
     <h2>Dashboard &gt; {location}</h2>
     </div>

    
     </header>
)
}
    


export default Header;