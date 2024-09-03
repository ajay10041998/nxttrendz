import { RxHamburgerMenu } from "react-icons/rx";
import { withRouter,Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { useState } from "react";
import CartContext from "../../context/CartContext";


const Header = (props) =>{
    const [hamburg,setHamburg] = useState(true)

    const onClickHamburg = () =>{
        setHamburg(prevState=>!prevState)
    }

    


    const onClickLogout =() =>{
        Cookies.remove('jwt_token')
        const {history} = props 
        history.replace('/')
        

    }
    return (
    <CartContext.Consumer>
        {value=>{
            const {cartList} = value
            const count = cartList.length
            console.log(count)
            return(
                <>
                    <div className="header-bg-container">
                        <div>
                            <img alt="logo-img" className='logo-img-section'
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"/>
                        </div>
                        <div className='list-items-button'> 
                            <ul className='home-about-product-section'>
                            <Link to='/home' className="list-item">
                                <li>Home</li>
                            </Link>
                            <Link to="/products" className="list-item">
                                <li>product</li>
                            </Link>
                            <Link to='/cart' className="list-item">
                                <li className="cart-count-badge">{`Cart ${count}`}</li>
                            </Link>
                        </ul>
                        <div className="hamburg-secction">
                             <button className="hamburg-button" onClick={onClickHamburg}>
                            <RxHamburgerMenu />
                            </button>
                           {hamburg ? null: (<ul className="hamburg-ul">
                            <Link className="list-item" to='/home'>
                                <li >Home</li>
                            </Link>
                            <Link className="list-item" to='/products'>
                                <li >product</li>
                            </Link>
                            <Link className="list-item" to="/cart">
                                <li >{`Cart ${count}`}
                                    
                                    </li>
                            </Link>
                                
                                
                                
                            
                            </ul>) }
                        
                        </div>
                        
                        
                            <button className='logout-button' onClick={onClickLogout}>Logout</button>
                        </div>
                       
        
                    </div>
                </>
            )
        }}
    </CartContext.Consumer>
    )
    
}
export default withRouter(Header)