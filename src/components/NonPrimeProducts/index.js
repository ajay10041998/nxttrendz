import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import ProductsCard from '../NonPrimeProductsCard';

import { ThreeDots } from 'react-loader-spinner';
import './index.css';
import SortingProductsHeader from "../SortingProductsHeader";
import FiltersGroup from "../FiltersGroup";

const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
  ]


const categoryOptions = [
    {
      name: 'Clothing',
      categoryId: '1',
    },
    {
      name: 'Electronics',
      categoryId: '2',
    },
    {
      name: 'Appliances',
      categoryId: '3',
    },
    {
      name: 'Grocery',
      categoryId: '4',
    },
    {
      name: 'Toys',
      categoryId: '5',
    },
  ]
  

const sortByOptions = [
    {
        optionId: 'PRICE_HIGH',
        displayText: 'Price (High-Low)'
    },
    {
        optionId: 'PRICE_LOW',
        displayText: 'Price (Low-High)'
    }
];

const NonPrimeProducts = () => {
    const [productList, setProductList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sortOptions, setSortOptions] = useState(sortByOptions[0].optionId);
    const [activeCategoryId,setactiveCategoryId] = useState('')
    const [searchInput,setsearchInput] = useState('')
    const [activeRatingId,setactiveRatingId] = useState('')

    useEffect(() => {
        const getProducts = async () => {  // Moved inside useEffect
            setLoader(true);
            const apiUrl = `https://apis.ccbp.in/products?sort_by=${sortOptions}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
            const jwtToken = Cookies.get("jwt_token");
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const response = await fetch(apiUrl, options);
            if (response.ok) {
                const data = await response.json();
                const updatedData = data.products.map(eachProduct => ({
                    title: eachProduct.title,
                    id: eachProduct.id,
                    price: eachProduct.price,
                    imageUrl: eachProduct.image_url,
                    rating: eachProduct.rating
                }));
                setLoader(false);
                setProductList(updatedData);
            } else {
                setLoader(false);
            }
        };

        getProducts();
    }, [sortOptions,activeCategoryId,searchInput,activeRatingId]);  // sortOptions is the only dependency

    const renderLoader = () => {
        return (
            <div className="products-loader-container">
                <ThreeDots color="#0b69ff" height={50} width={50} />
            </div>
        );
    };

    const updateActiveOptionId = optionId => {
        setSortOptions(optionId);
    };

    const changeCategory = activeCategoryId =>{
        setactiveCategoryId(activeCategoryId)
    }

    const clearFilters = () =>{
        setactiveCategoryId('')
        setactiveRatingId('')
        setsearchInput('')
    }
    const changeSearchInput = searchInput =>{
        setsearchInput(searchInput)
    }

    const changeRating =  activeRatingId =>{
        setactiveRatingId(activeRatingId)
    }

    
    const renderProductsList = () => {
        const shouldShowProductsList = productList.length > 0
        return shouldShowProductsList ? 
            (  <div className="all-products-container">
                <SortingProductsHeader
                    sortOptions={sortOptions}
                    sortByOptions={sortByOptions}
                    updateActiveOptionId={updateActiveOptionId}
                />
                <ul className="products-list">
                    {productList.map(eachProduct => (
                        <ProductsCard key={eachProduct.id} productsData={eachProduct} />
                    ))}
                </ul>
            </div>
        ): (
            <div className="no-products-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                className="no-products-img"
                alt="no products"
              />
              <h1 className="no-products-heading">No Products Found</h1>
              <p className="no-products-description">
                We could not find any products. Try other filters.
              </p>
            </div>
          )
    };

    return (
        <div className="filtergroup-allproducts">  
            <div className="filterComponent">
                <FiltersGroup 
                categoryOptions={categoryOptions}
                activeCategoryId={activeCategoryId}
                changeCategory={changeCategory}
                clearFilters={clearFilters}
                searchInput={searchInput}
                activeRatingId={activeRatingId}
                changeRating={changeRating}
                ratingsList={ratingsList}
                changeSearchInput={changeSearchInput}/>
            </div>
            <div className="allproductsComponent">
                {loader ? renderLoader() : renderProductsList()}
            </div>
            
        </div>
    );
}

export default NonPrimeProducts;
