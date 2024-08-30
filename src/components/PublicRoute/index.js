import Cookies from 'js-cookie'
import { Redirect,Route } from 'react-router-dom'
const PublicRoute =(props)=>{
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken!==undefined){
        return <Redirect to='/home'/>
    }
    return <Route {...props}/>
}
export default PublicRoute