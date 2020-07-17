import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from './components/loginForm/loginFrom';
import HomePage from './components/homePage/homePage';
import Logs from './components/logs/logs';
import Inventory from './components/inventory/inventory';
import Product from './components/products/products';
import './App.css';
class App extends React.Component{
  constructor (){
    super();
    this.state={

    }
  }

  render() {
   return (
     <div className="App">
     <Route path="/login" component={(props)=><LoginForm {...props}/>}/>
     <Route path="/home" component={(props)=><HomePage {...props}/>}/>
     <Route path="/logs" component={(props)=><Logs {...props}/>}/>
     <Route path="/inventory" component={(props)=><Inventory {...props}/>}/>
     <Route path="/product" component={(props)=><Product {...props}/>}/>      
     </div>
   );
}
}

export default App;
