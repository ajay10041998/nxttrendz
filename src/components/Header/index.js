import { RxHamburgerMenu } from "react-icons/rx";
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
const Header = (props) =>{
    const [hamburg,setHamburg] = useState(true)

    const onClickHamburg = () =>{
        setHamburg(prevState=>!prevState)
    }

    const onClickgethamburg = () =>{
        setHamburg(true)
    }


    const onClickLogout =() =>{
        Cookies.remove('jwt_token')
        const {history} = props 
        history.replace('/')
        

    }
    return(
        <>
            <div className="header-bg-container">
                <div>
                    <img alt="logo-img" className='logo-img-section'
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"/>
                </div>
                <div className='list-items-button'> 
                    <ul className='home-about-product-section'>
                        <li>Home</li>
                        <li>Products</li>
                        <li>Cart</li>
                </ul>
                <div className="hamburg-secction">
                    {hamburg ? (<button className="hamburg-button" onClick={onClickHamburg}>
                    <RxHamburgerMenu />
                    </button>):null}
                   {hamburg ? null: (<ul className="hamburg-ul">
                        <li>Home</li>
                        <li>product</li>
                        <li>Cart</li>
                        <button onClick={onClickgethamburg} className="arrow-icon"><FaArrowCircleLeft /></button>
                    </ul>) }
                
                </div>
                
                
                    <button className='cart-button' onClick={onClickLogout}>Logout</button>
                </div>
               

            </div>
        </>
    )
}
export default withRouter(Header)