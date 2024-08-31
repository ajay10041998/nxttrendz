import { RxHamburgerMenu } from "react-icons/rx";
import { withRouter,Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { useState } from "react";

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
    return(
        <>
            <div className="header-bg-container">
                <div>
                    <img alt="logo-img" className='logo-img-section'
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"/>
                </div>
                <div className='list-items-button'> 
                    <ul className='home-about-product-section'>
                    <Link to='/home'>
                        <li>Home</li>
                    </Link>
                    <Link to="/products">
                        <li>product</li>
                    </Link>
                    <Link>
                        <li>Cart</li>
                    </Link>
                </ul>
                <div className="hamburg-secction">
                     <button className="hamburg-button" onClick={onClickHamburg}>
                    <RxHamburgerMenu />
                    </button>
                   {hamburg ? null: (<ul className="hamburg-ul">
                    <Link to='/home'>
                        <li>Home</li>
                    </Link>
                    <Link to='/products'>
                        <li>product</li>
                    </Link>
                    <Link>
                        <li>Cart</li>
                    </Link>
                        
                        
                        
                    
                    </ul>) }
                
                </div>
                
                
                    <button className='logout-button' onClick={onClickLogout}>Logout</button>
                </div>
               

            </div>
        </>
    )
}
export default withRouter(Header)