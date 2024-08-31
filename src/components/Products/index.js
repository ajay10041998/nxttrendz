import AllProductSection from "../AllProductSection"
import PrimeDealsSection from '../PrimeDealsSection'

import Header from "../Header"
const Products = () =>{
    return (
        <div>
            <Header/>
            <div>
                <PrimeDealsSection/>
                <AllProductSection/>
            </div>
        </div>
    )
}
export default Products