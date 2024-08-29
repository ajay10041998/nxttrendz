
import './index.css'
import Header from '../Header'
const Home = () =>{
    return (
        <>
        <Header/>
        <div className="home-bg-container">
            
            <div className="title-content-button-section">
                <h1>Clothes That Get You Noticed</h1>
                <p>Fashion is part of The daily air and it 
                does not quite help that it changes all the 
                time.Clothes have always been a maker 
                of the era and we are in a revolution.Your fashion makes
                 you been seen and heard that way you are.So celebrate the
                  seasons new and exciting fashion in your own</p>
                <button className='shopnow-button'>Shop Now</button>
            </div>
            <img className='img-home'  alt='shopnow'
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"/>
        </div>
        </>
        
    
    )
}
export default Home