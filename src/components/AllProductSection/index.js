import { useState,useEffect } from "react"
import Cookies from 'js-cookie'
import ProductsCard from '../ProductsCard'
import './index.css'

const AllProductSection = () =>{
    const [productList,setProductList] = useState([])

    useEffect(() => {                                       //useEffect 
        const getProducts = async () => {
            const apiUrl = `https://apis.ccbp.in/products`;
            const jwtToken = Cookies.get("jwt_token");
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const response = await fetch(apiUrl, options); //fetch method
            console.log(response);
            if (response.ok){
                const data = await response.json();
                console.log(data)
                const updatedData = data.products.map(eachProduct=>({
                    title:eachProduct.title,
                    id:eachProduct.id,
                    price:eachProduct.price,
                    imageUrl:eachProduct.image_url,
                    rating:eachProduct.rating
                    
                }))
                setProductList(updatedData)
            }
        };

        getProducts();
    }, []);


    return (
        <div>
            <div>
                <h1 className="products-list-heading">Products</h1>
            </div>
            <ul className="products-list">
            
                {productList.map(eachProduct=>(
                <ProductsCard key={eachProduct.id} productsData={eachProduct}/>
            ))}
            </ul>
        </div>
    )
}
export default AllProductSection