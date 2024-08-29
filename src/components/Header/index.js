import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
const Header = (props) =>{
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
                    <button className='cart-button' onClick={onClickLogout}>Logout</button>
                </div>
               

            </div>
        </>
    )
}
export default withRouter(Header)