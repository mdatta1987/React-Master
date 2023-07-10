import React from  'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../navbar/Navbar';
import { TextField, Select, MenuItem } from '@mui/material';
import './Modify.css'
import { useState } from 'react';

const ModifyProduct = () => {
    const param = useLocation();
    const navigate = useNavigate();

    let products = param.state.allProducts;

    const [name, setName] = useState(param.state.product.Name);
    const [category, setCategory] = useState(param.state.product.Category);
    const [manufacturer, setManufacturer] = useState(param.state.product.Manufacturer);
    const [availableCount, setAvailableCount] = useState(param.state.product.AvailableCount);
    const [price, setPrice] = useState(param.state.product.Price);
    const [imageUrl, setImageUrl] = useState(param.state.product.ImagePath);
    const [description, setDescription] = useState(param.state.product.Description);

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

    const OnModifyClickHandler = (e) => {
        e.preventDefault();
        let isModified = false;
        const modifiedProduct = {
            "Id": param.state.product.Id,
            "Name": name,
            "ImagePath": imageUrl,
            "Category": category,
            "Price": price,
            "Description": description,
            "AvailableCount": availableCount,
            "Manufacturer": manufacturer
        }
        
        
        let index = products.findIndex(prod => prod.Id === param.state.product.Id);
        if(index >= 0) {
            products[index] = modifiedProduct;
            isModified = true;
        }
        navigate('/userhome', {
            state: {
                user: param.state.user, 
                products: products,
                modifiedProduct: modifiedProduct,
                isModified: isModified
            }
        });
    }

    return(
        <div className='modify-product-container'>
            <NavBar IsUserPage={true} User={param.state.user} Products={products} />
            <div className="modify-product-section">
                <div className="text-section">
                    <h1>Modify Product</h1>
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
                    <input type="submit" className="btn-submit" value="MODIFY PRODUCT" onClick={OnModifyClickHandler}/>
                </div>
            </div>
        </div>
    );
}

export default ModifyProduct;
