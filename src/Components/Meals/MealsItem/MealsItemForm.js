import React,{useRef,useState} from "react";
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"
export default function MealsItemForm(props) {

  const [amountIsValid,setAmountIsValid]=useState(false);
  const amountInputRef=useRef();

  const submitHandler = event=>{
    event.preventDefault();
    const enteredAmount =amountInputRef.current.value;
    const enteredAmountNumber=+enteredAmount;
    if(enteredAmount.trim().length === 0 ||
    enteredAmountNumber > 1 ||
    enteredAmountNumber > 5){
      setAmountIsValid(prv=>!prv);
        return ;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
     <Input 
     ref={amountInputRef}
      label="Amount" 
      input={{
         id:'amount_'+props.id,
         type:'number',
         min:'1',
         max:'5',
         step:'1',
         defaultValue:'1'
     }}/>
      <button>+ Add</button>
      {amountIsValid && <p>Enter Valid Amount</p>}
    </form>
  );
}
