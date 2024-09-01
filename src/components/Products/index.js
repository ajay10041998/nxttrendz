import AllproductSection from "../AllproductSection"
import PrimeDealsSection from '../PrimeDealsSection'

import Header from "../Header"
const Products = () =>{
    return (
        <div>
            <Header/>
            <div>
                <PrimeDealsSection/>
                <AllproductSection/>
            </div>
        </div>
    )
}
export default Products