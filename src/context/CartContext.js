import React from 'react'
const CartContext = React.createContext({
    cartList:[],
    addCartItem:()=>{},
    removeAllcartItems:()=>{},
    removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})
export default CartContext