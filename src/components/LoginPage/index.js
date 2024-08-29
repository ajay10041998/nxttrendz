import { useState } from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = (props) =>{
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const onChangeUserName = event =>{
        setUserName(event.target.value)
    }

    const onChangePassword = event =>{
        setPassword(event.target.value)
    }

    const authenticationSuccessfull =(jwtToken)=>{
        Cookies.set("jwt_token",jwtToken,{expires:30})
        const {history} = props
        history.replace('/home')
    }


    const submitForm =async (event) =>{
        event.preventDefault()
        const apiUrl=`https://apis.ccbp.in/login`
        const userDetails = {
            username,
            password,
        }
        const options = {
            method:"POST",
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(apiUrl,options)
        const data= await response.json()
        console.log(data)
        
        
        if (response.ok===true){
            const {jwt_token} = data
            authenticationSuccessfull(jwt_token)
        }
        setUserName('')
        setPassword('')
    }

    return (
       
        <div className="login-bg-container">
            <div>
                <img alt='login' className='login-img' 
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"/>
            </div>
            <form className='form-section'
            onSubmit={submitForm}>
            <img alt="logo-img" className='login-logo-img-section'
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"/>

            <label htmlFor="username" className='name-label'>USERNAME</label>
           <input
                onChange={onChangeUserName}
                value={username}
                id="username"   
                className='name-input' 
                type="text" 
                placeholder='user Name'/>
           <br/>
           <label htmlFor='password' className='name-label'>PASSWORD</label>
           <input 
                id="password" 
                className='password-input' 
                type="password" 
                placeholder='Password'
                value={password}
                onChange={onChangePassword}/><br/>

           <button type="submit" className='login-btn'>Login</button>
            </form>

        </div>
       
    )
}
export default LoginPage