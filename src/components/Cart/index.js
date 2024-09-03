import Header from '../Header'
import CartContext from '../../context/CartContext'
import {Link} from 'react-router-dom'
import './index.css'
import CartItem from '../CartItem'
import CartSummary from '../CartSummery'
const Cart = () =>(
    <CartContext.Consumer>
        {
            value =>{
                const {cartList,removeAllcartItems} = value
                const showEmptyView = cartList.length===0
                const onClickRemoveAllBtn = () =>{
                    removeAllcartItems()
                }

                return (
        <>
        <Header/>
        {showEmptyView ? (
            <div className="cart-empty-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              className="cart-empty-img"
              alt="cart empty"
            />
            <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
        
            <Link to="/products">
              <button type="button" className="shop-now-btn">
                Shop Now
              </button>
            </Link>
          </div>
        ):(<div className="cart-content-container">
            <div className='btn-mycart'>
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAllBtn}
            >
              Remove All
            </button>
            </div>
            
           
        <div>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </div>
          </div>)}
          <CartSummary/>
        </>
    )
            }
        }
    </CartContext.Consumer>


    
)
export default Cart