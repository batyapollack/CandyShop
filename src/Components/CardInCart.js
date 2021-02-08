
import React from 'react';

const CardInCart = ({cartItems, clickRemove})=>{

return(
<div className = "shoppingCart">
                {cartItems.map((item)=>(
                    <div key= {item.id} className="cardRow">
                        <div className="cardImg">
                            <p> x {item.cartCount}</p>
                            <img src={item.img} alt="shoe" />
                        </div>
                        <h3 className="text">{item.text}</h3>
                        <div className="cardPrice">
                            <p>{item.price}$</p>
                            <i className="fas fa-times" onClick= {()=>{clickRemove(item.img,item.price)}}></i>
                        </div>
                    </div>
                ))}
            </div>
)
}


export default CardInCart;

