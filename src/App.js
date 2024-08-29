import {BrowserRouter,Switch,Route} from  'react-router-dom'
import Home from "./components/Home"
import LoginPage from "./components/LoginPage"
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/home" component={Home}/>
      </Switch>
      
    </BrowserRouter>
  )
}
export default App