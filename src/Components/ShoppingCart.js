import React from 'react';
import TotalPrice from './TotalPrice';
import CardInCart from './CardInCart';

const ShoppingCart = (props) =>{

    const {
        totalPrice,
        itemCount,
        cartItems,
        hiddenMenu,
        clickRemove,
        pay,
    } = props;

    return(
    
        <div className={ `shoppingCartContainer ${!hiddenMenu ? "": "hidden"}`}> 
            <CardInCart cartItems={cartItems} clickRemove={clickRemove} />
            <TotalPrice totalPrice={totalPrice} itemCount={itemCount} pay={pay}/>
       </div>
    
    );  
}

export default ShoppingCart;