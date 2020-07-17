import React from 'react';
import NavBar from '../navBar/navBar';
import Product from '../product/product';
import service from '../../services/Ib-tracker-services';
import './products-style .css';
class products extends React.Component{
  constructor (){
    super();
    this.state={
      productsInfo:[]
    }
  }


  componentDidMount(){
    service.getProducts()
   .then(products=> {       
     const productInfo = products.data  
     this.setState({productsInfo:productInfo})   
    
    } )
  
  
  }
   
  
   render(){

     return(
         <div>
         <NavBar/>
         <h1>Ib product</h1>
         <div className="products"> 
         {
        this.state.productsInfo.map((productInfo)=><Product productInfo= {productInfo}/>)  
         }
         </div>
      
         </div>
     )
   }
}

export default products;