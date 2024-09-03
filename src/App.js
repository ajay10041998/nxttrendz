import { useState } from 'react'
import {BrowserRouter,Switch} from  'react-router-dom'
import Home from "./components/Home"
import LoginPage from "./components/LoginPage"
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import CartContext from './context/CartContext'



const App = () => {
  const [cartList,setCartList] = useState([])

  const addCartItem =(productData)=>{
    console.log(productData)
    setCartList(prevState=>{
      const isExist = prevState.some((eachProduct)=>(eachProduct.id===productData.id))
      console.log(isExist)
      if (isExist){
        return prevState 
      }
      else{
        return [...prevState,productData]
      }
    })
  }

  const removeAllcartItems = () =>{
    setCartList([])
  }

  const removeCartItem = (id) =>{
    
    const newList = cartList.filter(eachCart => eachCart.id !== id)
    setCartList(newList)
  }

  const incrementCartItemQuantity = (id) =>{
    setCartList(prevState=>
      prevState.map(eachItem=>
        eachItem.id===id ? {...eachItem,quantity:eachItem.quantity+1} : eachItem)
    )
  }
  const decrementCartItemQuantity = (id) =>{
    setCartList(prevState=>
      prevState.map(eachItem=>
        eachItem.id===id ? {...eachItem,quantity:eachItem.quantity-1} :eachItem
      )
    )
  }
  
  
  return (
    <BrowserRouter>   
        <CartContext.Provider value={
          {
            cartList,
            addCartItem:addCartItem,
            removeAllcartItems:removeAllcartItems,
            removeCartItem:removeCartItem,
            incrementCartItemQuantity:incrementCartItemQuantity,
            decrementCartItemQuantity:decrementCartItemQuantity,
          }
          }>
            <Switch>
                <PublicRoute exact path="/" component={LoginPage}/>
                <ProtectedRoute exact path="/home" component={Home}/>
                <ProtectedRoute exact path='/products' component={Products}/>
                <ProtectedRoute exact path='/products/:id' component={ProductItemDetails}/>
                <ProtectedRoute exact path='/cart' component={Cart}/>
                
            </Switch>  
  </CartContext.Provider>
    </BrowserRouter>
  )
}
export default App