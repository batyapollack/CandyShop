import React from 'react';
import CardBg from './CardBg';
import CardInfo from './CardInfo';



const Card = ({listFilter, updateCart}) =>{

    return(
        <div> 
        { listFilter.map((item , index )=> (
            <div key={index} className="card">
                <CardBg itemImg ={item.cardImg}/>
                <h3 className="text"> {item.text}</h3>
                <CardInfo 
                 updateCart = {()=> updateCart(item.cardImg,item.cardPrice, item.text)}
                 itemPrice = {item.cardPrice} 
                 />
            </div>

        ))}
       </div>
    );
}

export default Card;