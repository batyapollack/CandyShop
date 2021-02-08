import React, {useState} from 'react';
import Container from './Container';


const Nav = ({itemCount,setHiddenMenu, hiddenMenu, filterItems}) =>
{
    return(
        <nav>
            <Container>
                <h2> Candy shop </h2>
                <div>
                <input  className="inputSearch" type="text" placeholder="Search item..." onChange={(e) => filterItems(e.target.value)}/>
                <i className="fas fa-search iconSearch" style={{color: 'white'}}> </i>
                </div>

                <div className="menuWrapper" onClick ={() => setHiddenMenu(!hiddenMenu)} >
                    <i className={hiddenMenu? "fas fa-times fa-lg" : "fas fa-shopping-cart fa-lg"}></i>
                    <p>{itemCount > 0 && itemCount }</p>
                </div>
            </Container>
        </nav>
    )
}

export default Nav;