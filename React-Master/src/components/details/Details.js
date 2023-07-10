import NavBar from "../navbar/Navbar";
import { Link, useLocation } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup, CardMedia } from '@mui/material';
import { TextField, Button } from '@mui/material';
import React, { useState } from "react";
import './Details.css';


const ProductDetail = () => {
    const param = useLocation();
    const product = param.state.product;
    const products = param.state.allProducts;

    const [toggleMenu, setToggleMenu] = useState('all');
    const [productQuantity, setProductQuantity] = useState(1);

    const ToggleBarHandler = (e) => {
        let menu = e.target.value;
        setToggleMenu(menu);
    }

    const ProductQuantityHandler = (e) => {
        setProductQuantity(e.target.value);
    }

    return (
        <div className="product-detail-container">
            <NavBar IsUserPage={true} User={param.state.user} Products={products} />
            <div className="toggle-menu">
                <ToggleButtonGroup
                    color="primary"
                    value={toggleMenu}
                    exclusive
                    aria-label="Platform"
                    onChange={ToggleBarHandler}
                >
                    <ToggleButton value="all">ALL</ToggleButton>
                    <ToggleButton value="apparel">APPAREL</ToggleButton>
                    <ToggleButton value="electronics">ELECTRONICS</ToggleButton>
                    <ToggleButton value="personalcare">PERSONAL CARE</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="product-detail-section">
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
                    <form>
                        <div className="product-quantity">
                            <TextField
                                label="Enter the Quantity"
                                value={productQuantity}
                                required
                                fullWidth
                                onChange={ProductQuantityHandler}
                            />
                        </div>
                        <div className="btn-order">
                            <Link to="/orders" state={{user: param.state.user, product: product, quantity: productQuantity, products: products}}>
                                <Button size="small" variant="contained" color="primary">
                                    PLACE ORDER
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
