import React from 'react';
import './product-style.css';
const product = ({productInfo})=>{
   console.log(productInfo);
    return(
        <div className="product">
            <h3>{productInfo.title}</h3>
            <h4>{productInfo.type}</h4>
            <p>{productInfo.description} </p>
            <p> {productInfo.price}</p>
        </div>
    )
}

export default product;