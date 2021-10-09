import React,{useContext,useEffect,useState} from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";


export default function HeaderCardButton(props) {
  const [btnIsHighlighted ,setBtnHighlighted]=useState(false);
  const cartCtx = useContext(CartContext);
  const {items}=cartCtx;
  const numberOfCartItems = items.reduce((curNumber,item)=>{
    return curNumber + item.amount;
  },0);

  const btnClasses=`${classes.button} ${btnIsHighlighted ? classes.bump: ""}`;

  useEffect(()=>{
    if(items.length ===0){
      return;
    }
    setBtnHighlighted(true);
   const timer= setTimeout(()=>{
      setBtnHighlighted(false);
    },300);
    return ()=>{
      clearTimeout(timer);
    }
  },[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>
        <CartIcon />
      </span>
      <span className={classes.carttext}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
