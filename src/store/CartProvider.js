import React ,{useReducer} from 'react';
import CartContext from './cart-context';

const defaultcartstate={
    items:[],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if(action.type==="ADD"){

        const updatedTotalAmount=state.totalAmount + action.item.price* action.item.amount;
        const existingCartItemsIndex=state.items.findIndex(item=>item.id===action.item.id);
        const existingCartItems=state.items[existingCartItemsIndex];
        
        let updatedItems;
        
        if(existingCartItems){
         const updatedItem={
              ...existingCartItems,
              amount:existingCartItems.amount+action.item.amount
          };
          updatedItems=[...state.items];
          updatedItems[existingCartItemsIndex]=updatedItem;
        }else{
            
            updatedItems=state.items.concat(action.item);
        }

        

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

  if(action.type === 'REMOVE'){
      const existingCartItemsIndex = state.items.findIndex(
          (item)=>item.id ===action.id
      );
      const existingItem=state.items[existingCartItemsIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if(existingItem.amount ===1){
          updatedItems=state.items.filter(item=>item.id !== action.id);
      }else{
          const updatedItem={...existingItem,amount:existingItem.amount -1};
          updatedItems=[...state.items];
          updatedItems[existingCartItemsIndex]=updatedItem;
      }
      return{
          items: updatedItems,
          totalAmount: updatedTotalAmount,
      }
  }  
  return defaultcartstate;

};

export default function CartProvider(props) {

   const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultcartstate);
    const addItemToCartHandler= item =>{
        dispatchCartAction({type:"ADD",item:item})
    };
    const removeItemFromCartHandler= id =>{
        dispatchCartAction({type:"REMOVE",id:id})
    };

    const cartConext ={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartConext}>
            {props.children}
        </CartContext.Provider>
    )
}
