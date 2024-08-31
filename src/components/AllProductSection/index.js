import { useState,useEffect } from "react"
import Cookies from 'js-cookie'
import ProductsCard from '../ProductsCard'
import { ThreeDots } from 'react-loader-spinner';
import './index.css'

const AllProductSection = () =>{
    const [productList,setProductList] = useState([])
    const [loader,setLoader] = useState(false)

    useEffect(() => {                                       //useEffect 
        const getProducts = async () => {
            setLoader(true)
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
                setLoader(false)
                setProductList(updatedData)
                
            }
        };

        getProducts();
    }, []);


    const renderLoader=()=>{
        return (
            <div className="products-loader-container">
                <ThreeDots color="#0b69ff" height={50} width={50} />  {/* Use the named loader */}
            </div>
        );
    }

    const renderProductsList =()=>{
        return (
            <div>
                <div>
                    <h1 className="products-list-heading">Products</h1>
                </div>
                <ul className="products-list">
                    {productList.map(eachProduct => (
                        <ProductsCard key={eachProduct.id} productsData={eachProduct} />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            {loader ? renderLoader() : renderProductsList()}
        </div>
        /*<div>
            <div>
                <h1 className="products-list-heading">Products</h1>
            </div>
            <ul className="products-list">
            
                {productList.map(eachProduct=>(
                <ProductsCard key={eachProduct.id} productsData={eachProduct}/>
            ))}
            </ul>
        </div>*/
    )
}
export default AllProductSection