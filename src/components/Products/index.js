
import PrimeDealsSection from '../PrimeDealsSection'
import NonPrimeProducts from '../NonPrimeProducts'

import Header from "../Header"
const Products = () =>{
    return (
        <div>
            <Header/>
            <div>
                <PrimeDealsSection/>
                <NonPrimeProducts/>
            </div>
        </div>
    )
}
export default Products