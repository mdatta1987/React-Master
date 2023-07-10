import NavBar from "../navbar/Navbar";
import { Stepper, Step, StepLabel } from '@mui/material';
import { Button, CardMedia } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Orders.css'
import React, { useState } from "react";

const Orders = () => {
    const param = useLocation();
    const product = param.state.product;
    const quantity = param.state.quantity;
    const address = param.state.address;
    const products = param.state.products;

    const [stepCount, setStepCount] = useState(param.state.step !== undefined ? param.state.step : 0);

    const OnNextClickHandler = () => {
        let step = stepCount;
        setStepCount(step+1);
    }

    const OnBackClickHandler = () => {
        let step = stepCount;
        setStepCount(step-1);
    }

    return(
        <div className="orders-container">
            <NavBar IsUserPage={true} User={param.state.user} Products={products} />
            <div className="orders-step-container">
                <Stepper activeStep={stepCount}>
                    <Step>
                    <StepLabel>Items</StepLabel>
                    </Step>
                    <Step>
                    <StepLabel>Select Address</StepLabel>
                    </Step>
                    <Step>
                    <StepLabel>Confirm Order</StepLabel>
                    </Step>
                </Stepper>
            </div>
            {
                stepCount === 0 &&
                <div className="product-items-section">
                    <div className="product-image">
                        <CardMedia
                            component="img"
                            height="auto"
                            image={product.ImagePath}
                            alt={product.Name}
                        />
                    </div>
                    <div className="product-detail">
                        <div className="product-title">
                            <h1 className="product-name">{product.Name}</h1>
                            <span className="product-availability">Available Quantity : {product.AvailableCount}</span>
                        </div>
                        <div className="product-category">
                            <span>Category: <b>{product.Category}</b></span>
                        </div>
                        <div className="product-description">
                            <span>{product.Description}</span>
                        </div>
                        <div className="product-price">
                            <span> &#8377;  {product.Price}</span>
                        </div>
                    </div>
                </div>
            }
            {
                stepCount === 2 &&
                <div className="order-summary-section">
                    <div className="product-summary">
                        <div className="product-title">
                            <h1 className="product-name">{product.Name}</h1>
                        </div>
                        <div className="product-quantity">
                            Quantity : {quantity}
                        </div>
                        <div className="product-category">
                            <span>Category: <b>{product.Category}</b></span>
                        </div>
                        <div className="product-description">
                            <span>{product.Description}</span>
                        </div>
                        <div className="product-price">
                            <span> &#8377;  {quantity*product.Price}</span>
                        </div>
                    </div>
                    <div className="address-summary">
                        <div>
                            <h1>Address Details</h1>
                        </div>
                        <div className="address-name">
                            {address.name}
                        </div>
                        <div className="address-contact">
                            {address.contact}
                        </div>
                        <div className="address-street">
                            {address.street},
                        </div>
                        <div className="address-city">
                            {address.city},
                        </div>
                        <div className="address-state">
                            {address.state} - {address.zipcode}
                        </div>
                    </div>
                </div>
            }
            <div className="btn-order">
                <div className="btn-back">
                    <Link to={stepCount===2 ? "/addresses" : "/orders"} state={{user: param.state.user, product: product, quantity: quantity, address: address, products: products}}>
                        <Button size="small" variant="contained" color="action" disabled={stepCount===0} onClick={OnBackClickHandler}>
                            BACK
                        </Button>
                    </Link>
                </div>
                <div className="btn-next">
                    {
                        stepCount !== 2 &&
                        <Link to={stepCount===0 ? "/addresses" : "/orders"} state={{user: param.state.user, product: product, quantity: quantity, address: address, products: products}}>
                            <Button size="small" variant="contained" color="primary" onClick={OnNextClickHandler}>
                                NEXT
                            </Button>
                        </Link>
                    }
                    {
                        stepCount === 2 &&
                        <Link to="/userhome" state={{user: param.state.user, orderPlaced: true, products: products}}>
                            <Button size="small" variant="contained" color="primary">
                                PLACE ORDER
                            </Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Orders;
