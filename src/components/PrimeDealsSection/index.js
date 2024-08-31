import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from "../ProductCard";
import './index.css'

const PrimeDealsSection = () => {
    const [primeDealsList, setPrimeDeals] = useState([]);
    const [apiStatus, setApiStatus] = useState("initial");

    useEffect(() => {
        const getPrimeDetailsList = async () => {
            setApiStatus("inProgress");
            const jwtToken = Cookies.get("jwt_token");
            const apiUrl = `https://apis.ccbp.in/prime-deals`;
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "GET",
            };

            const response = await fetch(apiUrl, options);
            const data = await response.json();

            if (response.ok && data.prime_deals) {
                const updatedData = data.prime_deals.map(eachprime => ({
                    title: eachprime.title,
                    availability: eachprime.availability,
                    brand: eachprime.brand,
                    description: eachprime.description,
                    id: eachprime.id,
                    imageUrl: eachprime.image_url,
                    price: eachprime.price,
                    rating: eachprime.rating,
                    style: eachprime.style,
                    totalReviews: eachprime.total_reviews,
                }));
                setApiStatus("success");
                setPrimeDeals(updatedData);
            } else if (response.status === 401) {
                setApiStatus("failure");
            } else {
                setApiStatus("failure");
            }
        };

        getPrimeDetailsList();
    }, []);

    const primeDealsSuccessView = () => {
        return (
            <div className="products-list-container">
                <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
                <ul className="products-list">
                    {primeDealsList.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        );
    };

    const primeDealsInprogressView = () => {
        return (
            <div className="products-loader-container">
                <ThreeDots color="#0b69ff" height={50} width={50} />
            </div>
        );
    };

    const primeDealsFailureView = () =>  (
        <div className="failure-img">
            <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="Register Prime"
            className="register-prime-image"
            />
        </div>
      )

    const renderViews = () => {
        switch (apiStatus) {
            case "success":
                return primeDealsSuccessView();
            case "failure":
                return primeDealsFailureView();
            case "inProgress":
                return primeDealsInprogressView();
            default:
                return null;
        }
    };

    return (
        <div>
            {renderViews()}
        </div>
    );
};

export default PrimeDealsSection;
