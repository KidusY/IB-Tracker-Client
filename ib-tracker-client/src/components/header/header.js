import React from 'react';
const Header = ()=>(
    <header className="header">
    <div className="titleNav">
     <h2>Dashboard </h2>
     </div>

     <form> 
         <input placeholder = "Search" />
         <input placeholder="location"/>
         <input placeholder="Date Added"/>
     <button id="btn-search"type="submit">Search</button>
     </form>
     </header>
)

export default Header;