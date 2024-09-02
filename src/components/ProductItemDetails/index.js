import { useState,useEffect } from "react"
import Cookies from 'js-cookie'
import Header from "../Header"
import './index.css'
import { ThreeDots } from 'react-loader-spinner';
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import SimilarProductItem from '../SimilarProductItem'

const ProductItemDetails = (props) =>{
    const [apiStatus,setapiStatus] = useState("initial")
    const [productData,setProductData] = useState([])
    const [similarProductsData,setsimilarProductsData] = useState([])
    const [quantity,setQuantity] = useState(1)


    const getFormattedData = data => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews,
      })

    useEffect(()=>{
        const getProductItemDetails = async ()=>{
            setapiStatus("progress")
            
                const {match} = props 
                const {params} = match
                const {id} = params
        
                const jwtToken = Cookies.get('jwt_token')
                const apiUrl = `https://apis.ccbp.in/products/${id}`
                const options = {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                  method: 'GET',
                }
        
                const response = await fetch(apiUrl, options)
                if (response.ok) {
                    
                    const fetchedData = await response.json()
                    const updatedData = getFormattedData(fetchedData)
                    const updatedSimilarProductsData = fetchedData.similar_products.map(
                        (eachSimilarProduct) => getFormattedData(eachSimilarProduct),
                      )
                      setapiStatus("success")
                      setProductData(updatedData)
                      setsimilarProductsData(updatedSimilarProductsData)
                }
                if (response.ok===404){
                    setapiStatus('failure')
                }
            
        }
      

        getProductItemDetails()

    },[])

    const productItemProgressView =()=>{
        return (
            <div className="products-loader-container">
                <ThreeDots color="#0b69ff" height={50} width={50} />
            </div>
        );
    }

    const onDecrementQuantity =()=>{
        
            if (quantity > 1) {
               setQuantity(prevState=>prevState-1)
              }
        
    }

    const onIncrementQuantity = ( )=>{
        setQuantity(prevState=>prevState+1)
    }

    const productItemSuccessView = () =>{
        const {
            availability,
            brand,
            description,
            imageUrl,
            price,
            rating,
            title,
            totalReviews,
          } = productData
        return (
            <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onDecrementQuantity}
                    data-testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onIncrementQuantity}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button type="button" className="button add-to-cart-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
          </div>
        )
    }

    const productItemFailureView = () =>{
        return (
            <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
        )
    }


    const renderProductDetails = () =>{
        switch (apiStatus) {
            case 'progress':
                return productItemProgressView()
            case 'success':
                return productItemSuccessView()
            case "failure" :
                return productItemFailureView()
            default:
                return null
            
        }
    }

    return (
        <>
        <Header />
        <div className="product-item-details-container">
          {renderProductDetails()}
        </div>
      </>
        
    )
}
export default ProductItemDetails