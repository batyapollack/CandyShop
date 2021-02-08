import React from 'react';
import CartImg from '../img/cart.png'; 

const TotalPrice  = ({totalPrice,itemCount, pay}) =>{

    return(
        <div className="shoppingCartPrice">
            <h2>Total price: ${totalPrice}</h2>
            <div className ="allCartItems" onClick={pay}  style={{background: `url("${CartImg}") no-repeat center/cover`}} >
                <div className ="itemsAmountWrap">
                    <p>{itemCount}</p>
                </div>
            </div>
        </div>
    )
}
export default TotalPrice;