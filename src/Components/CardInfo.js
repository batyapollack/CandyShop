import React from 'react';
import Button from './Button';
import CardBg from './CardBg';


const CardInfo = ({itemPrice,updateCart}) => {


return(
<div className = "cardInfo">
    <p>${itemPrice}</p>
    <Button addItem = {updateCart} />
</div>

)

}

export default CardInfo;