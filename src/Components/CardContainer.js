import React from 'react';
import Card from './Card';


const CardContainer = ({listFilter,updateCart})=>{


return(
    <div className="cardContainer">
       <Card listFilter={listFilter} updateCart={updateCart}/>
    </div>
)

}

export default CardContainer;