import {BrowserRouter,Switch} from  'react-router-dom'
import Home from "./components/Home"
import LoginPage from "./components/LoginPage"
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
          <PublicRoute exact path="/" component={LoginPage}/>
          <ProtectedRoute exact path="/home" component={Home}/>
          <ProtectedRoute exact path='/products' component={Products}/>
          <ProtectedRoute exact path='/products/:id' component={ProductItemDetails}/>
      </Switch>
      
    </BrowserRouter>
  )
}
export default App