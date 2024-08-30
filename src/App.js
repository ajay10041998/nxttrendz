import {BrowserRouter,Switch} from  'react-router-dom'
import Home from "./components/Home"
import LoginPage from "./components/LoginPage"
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
          <PublicRoute exact path="/" component={LoginPage}/>
          <ProtectedRoute exact path="/home" component={Home}/>
      </Switch>
      
    </BrowserRouter>
  )
}
export default App