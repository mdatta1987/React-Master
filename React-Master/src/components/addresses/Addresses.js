import NavBar from "../navbar/Navbar";
import React, { useState,useEffect } from "react";
import { Button, Select, MenuItem, InputLabel, TextField, Snackbar, SnackbarContent } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Addresses.css'

const Address = () => {
    const param = useLocation();
    const navigation = useNavigate();

    const product = param.state.product;
    const quantity = param.state.quantity;
    const products = param.state.products;
    const data = require('../../assets/addresses/address-list.json');

    const [stepCount, setStepCount] = useState(1);
    const [deliveryAddress, setDeliveryAddress] = useState(param.state.address === undefined ? 'default' : param.state.address);
    const [addresses, setAddresses] = useState(data.address);
    const [showNotification, setShowNotification] = useState(false);
    const [showAddAddressNotification, setShowAddAddressNotification] = useState(false);


    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [addressState, setAddressState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [isAddressUpdate, setIsAddressUpdate] = useState(true);

    useEffect(()=>{
        setIsAddressUpdate(false);
        setName('');
        setContact('');
        setStreet('');
        setCity('');
        setAddressState('');
        setLandmark('');
        setZipcode('');
    },[isAddressUpdate]);

    const OnNextClickHandler = () => {
        if(deliveryAddress === "default") {
            setShowNotification(true);
        }
        else {
            let step = stepCount;
            setStepCount(step+1);
            navigation('/orders', {
                state: {
                    user: param.state.user, 
                    product: product, 
                    step: stepCount+1, 
                    quantity: quantity, 
                    address: deliveryAddress,
                    products: products
                }
            });
        }
    }

    const CloseAlertHandler = () => {
        setShowNotification(false);
        setShowAddAddressNotification(false);
    }

    const OnBackClickHandler = () => {
        let step = stepCount;
        setStepCount(step-1);
    }

    const AddressHandler = (e) => {
        addresses.forEach( adr => {
            if(adr.type === e.target.value) {
                setDeliveryAddress(adr);
            }
            if(e.target.value === 'default') {
                setDeliveryAddress('default');
            }
        });
    }
    
    const OnSaveClickHandler = () => {
        let initialAddress = addresses;

        const newAddress = {
            "name": name,
            "type": "Other " + ((Math.random(0, 1) * 1000)),
            "contact": contact,
            "street": street,
            "city": city,
            "state": addressState,
            "landmark": landmark,
            "zipcode": zipcode
        }

        if(Object.values(newAddress).map(addr => addr === '').includes(true)) {
            setShowAddAddressNotification(true);
        }
        else {
            initialAddress.push(newAddress);
            setAddresses(initialAddress);
            setIsAddressUpdate(true);
        }
    }

    const OnNameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const OnContactChangeHandler = (e) => {
        setContact(e.target.value);
    }

    const OnStreetChangeHandler = (e) => {
        setStreet(e.target.value);
    }

    const OnCityChangeHandler = (e) => {
        setCity(e.target.value);
    }

    const OnStateChangeHandler = (e) => {
        setAddressState(e.target.value);
    }

    const OnLandmarkChangeHandler = (e) => {
        setLandmark(e.target.value);
    }

    const OnZipCodeChangeHandler = (e) => {
        setZipcode(e.target.value);
    }


    return (
        <div className="address-container">
            <NavBar IsUserPage={true} User={param.state.user} Products={products} />
            <div className="address-select">
                <InputLabel id="sort-by">Select Address</InputLabel>
                <Select
                    labelId="sort-by"
                    id="sort-by"
                    value={deliveryAddress === 'default' ? 'default' : deliveryAddress.type}
                    label="sort-by"
                    onChange={AddressHandler}
                >
                    <MenuItem value="default">--Select an address--</MenuItem>
                    {addresses.map((adr) => {
                            return(
                                <MenuItem value={adr.type} key={adr.type}>
                                    <b>{adr.type.split(' ')[0]}</b> - {adr.name}, {adr.street},{adr.city}
                                </MenuItem>
                            )
                        })  
                    }
                </Select>
            </div>
            <div className="new-address-section">
                <div className="text-section">
                    <h3>-OR-</h3>
                    <h1>Add Address</h1>
                </div>
                <div className="address-input">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={OnNameChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="Contact Number"
                        value={contact}
                        onChange={OnContactChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="Street"
                        value={street}
                        onChange={OnStreetChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="City"
                        value={city}
                        onChange={OnCityChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="State"
                        value={addressState}
                        onChange={OnStateChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="Landmark"
                        value={landmark}
                        onChange={OnLandmarkChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="address-input">
                    <TextField
                        label="Zip Code"
                        value={zipcode}
                        onChange={OnZipCodeChangeHandler}
                        required
                        fullWidth
                    />
                </div>
                <div className="btn-save">
                    <Button size="small" variant="contained" color="primary" onClick={OnSaveClickHandler}>
                        SAVE ADDRESS
                    </Button>
                </div>
            </div>
            <div className="btn-order">
                <div className="btn-back">
                    <Link to="/orders" state={{user: param.state.user, product: product, step: stepCount-1, quantity: quantity, address: deliveryAddress, products: products}}>
                        <Button size="small" variant="contained" color="action" onClick={OnBackClickHandler}>
                            BACK
                        </Button>
                    </Link>
                </div>
                <div className="btn-next">
                    <Button size="small" variant="contained" color="primary" onClick={OnNextClickHandler}>
                        NEXT
                    </Button>
                </div>
                { 
                    deliveryAddress === "default" &&
                    <div className="notification-section">
                        <Snackbar 
                            open={showNotification} 
                            autoHideDuration={5000} 
                            anchorOrigin= {{vertical: "top", horizontal: "right"}}
                            onClose={CloseAlertHandler}>
                            <SnackbarContent message='Please select address!' />
                        </Snackbar>
                    </div>
                }
                <div className="notification-section">
                        <Snackbar 
                            open={showAddAddressNotification} 
                            autoHideDuration={5000} 
                            anchorOrigin= {{vertical: "top", horizontal: "right"}}
                            onClose={CloseAlertHandler}>
                            <SnackbarContent message='Please enter the full address!' />
                        </Snackbar>
                </div>
            </div>
        </div>
    );
}

export default Address;
