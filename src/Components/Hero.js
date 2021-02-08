import React, {useState, useRef, useEffect}  from 'react';
import { v4 as uuidv4 } from 'uuid';
import Nav from './Nav';
import Container from './Container';
import CardContainer from './CardContainer';
import ShoppingCart from './ShoppingCart';
import ListData from './ListData';
import PaypalButtons from './PaypalButtons';


const Hero = () => {

    const [totalPrice, setTotalPrice] = useState(0); 
    const [itemCount, setItemCount] = useState(0);
    const [cartItems, setCardItems] = useState([]);
    const [listFilter, setListFilter] = useState(ListData);
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const firstRender  = useRef(true);
    const [payPaypel, setPayPaypel] = useState(false);

    const updateCart = (itemImg, itemPrice, itemText) => {

        setItemCount(prevCount=> prevCount +1);
        setTotalPrice(prevPrice=> prevPrice + itemPrice);
        const result = cartItems.find((item) => item.img === itemImg );
        if(result){ 
            result.cartCount++
            setCardItems(cartItems.map((item)=>  item.img === itemImg ?
              {...cartItems, 
                img: itemImg,
                price: itemPrice,
                text: item.text,
                cartCount: result.cartCount
            }: item
            ));
            
            return;
        }
           

        setCardItems([...cartItems, {
            img: itemImg,
            price: itemPrice,
            text: itemText,
            id: uuidv4(),
            cartCount: 1
        }]);

    }

    const removeItemFromCart= (itemImg, itemPrice)=>{
        setCardItems(cartItems.map((item)=>( item.img === itemImg && item.cartCount >= 1 )? 
        {...cartItems, 
            img: itemImg,
            price: itemPrice,
            text: item.text,
            cartCount: item.cartCount --
        }: item
        ));
        setCardItems(cartItems.filter((item)=> ( item.img !== itemImg || item.cartCount >= 1))) //stay if have more 1 item 

        setItemCount(prevCount=> prevCount -1);
        setTotalPrice(prevPrice=> prevPrice - itemPrice);
    };

    //load page
    useEffect(()=>{
        if(firstRender.current)
            firstRender.current = false;
        else
          localStorage.setItem("Cart" , JSON.stringify([...cartItems]));
    } , [cartItems])
  
    //get list from localStorage
    useEffect(()=>{
     const newList= localStorage.getItem("Cart");
     if(newList!==null)
     {
         const listNew = JSON.parse([...cartItems, newList]);
        setCardItems(listNew);
        let count = 0;
        for (let i=0; i< listNew.length; ++i)
           count  += listNew[i].cartCount;
        setItemCount(count);
        let sum=0
        for (let i=0; i< listNew.length; ++i)
            sum += listNew[i].price * listNew[i].cartCount;
        setTotalPrice(sum);
     }

    },[])


    const filterItems = (value) =>{
        if (value.length === 0)
        {
            setListFilter(ListData)
            return;
        }
          const regex = RegExp('^' + value);
          if(regex)
             setListFilter( listFilter.filter((item) => (regex.test(item.text) || (regex.test(item.text.toLowerCase())))))
      }

      const pay = ()=>{
        setPayPaypel(true)
      }
    
      if (payPaypel) {
        return <PaypalButtons totalPrice= {totalPrice}/>;
      }  
      else
      { 
        return(
        <section className="hero">
            <Nav
             itemCount ={itemCount}
             hiddenMenu={hiddenMenu} 
             setHiddenMenu={setHiddenMenu} 
             filterItems={filterItems}
             />
            <Container>
                <CardContainer
                    listFilter = {listFilter}
                    updateCart = {updateCart}

                />
         
                <ShoppingCart
                    totalPrice ={totalPrice}
                    itemCount = {itemCount}
                    cartItems = {cartItems}
                    hiddenMenu = {hiddenMenu}
                    clickRemove= {removeItemFromCart}
                    pay={pay}
                   
                    />  
             </Container>
            
        </section>
    )
        }
}

export default Hero;