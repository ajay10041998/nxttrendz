import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import ProductsCard from '../ProductsCard';
import { ThreeDots } from 'react-loader-spinner';
import './index.css';
import SortingProductsHeader from "../SortingProductsHeader";

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

const AllproductSection = () => {
    const [productList, setProductList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sortOptions, setSortOptions] = useState(sortByOptions[0].optionId);

    useEffect(() => {
        const getProducts = async () => {
            setLoader(true);
            const apiUrl = `https://apis.ccbp.in/products?sort_by=${sortOptions}`;
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
            }
        };

        getProducts();
    }, [sortOptions]);

    const renderLoader = () => {
        return (
            <div className="products-loader-container">
                <ThreeDots color="#0b69ff" height={50} width={50} />
            </div>
        );
    };

    const updateActiveOptionId = sortOptions => {
        setSortOptions(sortOptions);
    };

    const renderProductsList = () => {
        return (
            <div>
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
        );
    };

    return (
        <div>
            {loader ? renderLoader() : renderProductsList()}
        </div>
    );
}

export default AllproductSection;
