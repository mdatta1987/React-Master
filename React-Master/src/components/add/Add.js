import React from  'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../navbar/Navbar';
import { TextField, Button, Select, MenuItem, Snackbar, SnackbarContent } from '@mui/material';
import './Add.css'
import { useState } from 'react';

const AddProduct = () => {
    const param = useLocation();
    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('default');
    const [manufacturer, setManufacturer] = useState('');
    const [availableCount, setAvailableCount] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');


    const OnNameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const OnCategoryChangeHandler = (e) => {
        setCategory(e.target.value);
    }

    const OnManufacturerChangeHandler = (e) => {
        setManufacturer(e.target.value);
    }

    const OnAvailableCountChangeHandler = (e) => {
        setAvailableCount(e.target.value);
    }

    const OnImageUrlChangeHandler = (e) => {
        setImageUrl(e.target.value);
    }

    const OnPriceChangeHandler = (e) => {
        setPrice(e.target.value);
    }

    const OnDescriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const CloseAlertHandler = () => {
        setShowNotification(false);
    }

    const OnAddClickHandler = (e) => {
        e.preventDefault();

        let isAdded = false;
        let allProducts = param.state.products;

        const newProduct = {
            "Id": allProducts[allProducts.length-1].Id+1,
            "Name": name,
            "ImagePath": imageUrl,
            "Category": category,
            "Price": price,
            "Description": description,
            "AvailableCount": availableCount,
            "Manufacturer": manufacturer
        }

        if(Object.values(newProduct).map(prd => prd === '').includes(true)) {
            setShowNotification(true);
        }
        else {
            param.state.products.push(newProduct)   ;
            isAdded = true;

            navigate('/userhome', {
                state: {
                    user: param.state.user, 
                    products: allProducts,
                    newProduct: newProduct,
                    isAdded: isAdded
                }
            });
        }

        
    }

    return(
        <div className="add-product-container">
            <NavBar IsUserPage={true} User={param.state.user} />
            <div className="add-product-section">
                <div className="text-section">
                    <h1>Add Product</h1>
                </div>
                <div className="product-input">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={OnNameChangeHandler}
                        required
                    />
                </div>
                <div className="product-select">
                    <Select
                            label="Category"
                            labelId="product-category"
                            id="product-category"
                            value={category}
                            onChange={OnCategoryChangeHandler}
                        >
                            <MenuItem value="default">--Select a Category--</MenuItem>
                            <MenuItem value="apparel">Apparel</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="personalcare">Personal Care</MenuItem>
                    </Select>
                </div>
                <div className="product-input">
                    <TextField
                        label="Manufacturer"
                        value={manufacturer}
                        onChange={OnManufacturerChangeHandler}
                        required
                    />
                </div>
                <div className="product-input">
                    <TextField
                        label="Available Items"
                        value={availableCount}
                        onChange={OnAvailableCountChangeHandler}
                        required
                    />
                </div>
                <div className="product-input">
                    <TextField
                        label="Price"
                        value={price}
                        onChange={OnPriceChangeHandler}
                        required
                    />
                </div>
                <div className="product-input">
                    <TextField
                        label="Image Url"
                        value={imageUrl}
                        onChange={OnImageUrlChangeHandler}
                        required
                    />
                </div>
                <div className="product-input">
                    <TextField
                        label="Product Description"
                        value={description}
                        onChange={OnDescriptionChangeHandler}
                        required
                    />
                </div>
                <div className="btn-modify">
                    <Button size="small" variant="contained" color="primary" onClick={OnAddClickHandler}>
                        SAVE PRODUCT
                    </Button>
                </div>
            </div>
            <div className="product-notification-section">
                    <Snackbar 
                        open={showNotification} 
                        autoHideDuration={5000} 
                        anchorOrigin= {{vertical: "top", horizontal: "right"}}
                        onClose={CloseAlertHandler}>
                        <SnackbarContent message='Please enter the full product information!' />
                    </Snackbar>
            </div>
        </div>
    );
}

export default AddProduct;
