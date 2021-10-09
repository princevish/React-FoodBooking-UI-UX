import React from 'react'
import Meals from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCardButton'
export default function Header(props) {
    return (
        <>
         <header className={classes.header}>
           <h1>FOODBOOK</h1>
          <HeaderCartButton onClick={props.onShowCart} /> 
        </header>   
        <div className={classes['main-image']}>
            <img src={Meals}  alt="Meals" />
        </div>
        </>
    )
}
