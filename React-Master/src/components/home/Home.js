import NavBar from "../navbar/Navbar";
import { Link, useLocation } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    CardActionArea, 
    CardActions, 
    CardMedia, 
    Typography, 
    Button, 
    ToggleButton, 
    ToggleButtonGroup, 
    Select, 
    MenuItem, 
    InputLabel, 
    Snackbar, 
    SnackbarContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

} 
from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React, { useState } from "react";
import './Home.css';
import { useEffect } from "react";

const UserHome = () => {
    const param = useLocation();
    const data = require('../../assets/products/product-list.json');
    const modifiedProduct = param.state.modifiedProduct === undefined ? '' : param.state.modifiedProduct;
    const newProduct = param.state.newProduct === undefined ? '' : param.state.newProduct;
    const searchText = param.state.searchText === undefined ? '' : param.state.searchText;
    const [toggleMenu, setToggleMenu] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState(param.state.products === undefined ? data.products : param.state.products);
    const [allProducts, setAllProducts] = useState(param.state.products === undefined ? data.products : param.state.products);
    const [showOrderNotification, setShowOrderNotification] = useState(param.state.orderPlaced === undefined ? false : param.state.orderPlaced);
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);
    const [showEditNotification, setShowEditNotification] = useState(param.state.isModified === undefined ? false : param.state.isModified);
    const [showAddNotification, setShowAddNotification] = useState(param.state.isAdded === undefined ? false : param.state.isAdded);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState('');

    useEffect(()=> {
        setProducts(allProducts.filter((prod) => JSON.stringify(prod.Name.toLowerCase()).includes(searchText.toLowerCase())));
        // eslint-disable-next-line
    }, [searchText]);

    const SortByHandler = (e) => {
        setSortBy(e.target.value);
        SortProduct(e.target.value);
    }

    const SortProduct = (sort) => {
        if(sort === 'lowtohigh') {
            setProducts(products.sort((a, b) => (a.Price > b.Price) ? 1 : -1));
        }
        else if(sort === 'hightolow') {
            setProducts(products.sort((a, b) => (a.Price < b.Price) ? 1 : -1));
        }
        else {
            setProducts(products);
        }
    }

    const ToggleBarHandler = (e) => {
        let menu = e.target.value;
        setToggleMenu(menu);
        FilterProductByCategory(menu);
    }

    const FilterProductByCategory = category => {
        if(category !== 'all') {
            setProducts(allProducts.filter((product) => product.Category === category));
        }
        else {
            setProducts(allProducts);
        }
    }

    const OnDeleteIconClick = (product) => {
        setOpenDeleteConfirmation(true);
        setDeleteProduct(product);
    }

    const CloseAlertHandler = () => {
        setShowOrderNotification(false);
        param.state.orderPlaced = false;
    }

    const CloseDeleteAlertHandler = () => {
        setShowDeleteNotification(false);
    }

    const CloseEditAlertHandler = () => {
        setShowEditNotification(false);
        param.state.isModified = false;
    }

    const CloseAddAlertHandler = () => {
        setShowAddNotification(false);
        param.state.isAdded = false;
    }

    const HandleDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
    }

    const HandleOkDeleteConfirmation = () => {
        setProducts(products.filter((prd) => prd.Id !== deleteProduct.Id));
        setAllProducts(allProducts.filter((prd) => prd.Id !== deleteProduct.Id));
        setShowDeleteNotification(true);
        setOpenDeleteConfirmation(false);
    }

    const HandleCancelDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);

    }

    return(
        <div className="user-home-container">
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
            <div className="sortby-section">
                <InputLabel id="sort-by">Sort By</InputLabel>
                <Select
                    labelId="sort-by"
                    id="sort-by"
                    value={sortBy}
                    label="sort-by"
                    onChange={SortByHandler}
                >
                    <MenuItem value="default">--Select an option--</MenuItem>
                    <MenuItem value="lowtohigh">Price low to high</MenuItem>
                    <MenuItem value="hightolow">Price high to low</MenuItem>
                </Select>
            </div>
            <div className="product-container">
                {
                    products.map((product) => {
                    return (
                        <div className="product-card" key={product.Id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.ImagePath}
                                    alt={product.Name}
                                    />
                                    <CardContent>
                                    <div className="product-details">
                                        <div className="product-name">
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.Name}
                                            </Typography>
                                        </div>
                                        <div className="product-price">
                                            <Typography gutterBottom variant="h5" component="div">
                                                &#8377; {product.Price}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.Description}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <div className="card-section">
                                    <div className="btn-buy">
                                        <CardActions>
                                            <Link to={'/products/'+product.Id} state={{user: param.state.user, product: product, allProducts: products}}>
                                                <Button size="small" variant="contained" color="primary">
                                                    Buy
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </div>
                                    {param.state.user.role === "Admin" &&
                                        <div className="icon-section">
                                            <div className="edit-icon-section">
                                                <Link to={'/modify/'+product.Id} state={{user: param.state.user, product: product, allProducts: products}}>
                                                    <div className="edit-icon">
                                                        <EditIcon color="action" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="delete-icon" onClick={() => {OnDeleteIconClick(product)}}>
                                                <DeleteRoundedIcon color="action" />
                                            </div>
                                        </div>
                                    }
                                    <div className="delete-confirmation-dialog">
                                        <Dialog
                                            open={openDeleteConfirmation}
                                            onClose={HandleDeleteConfirmation}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Confirm deletion of product!"}
                                            </DialogTitle>
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete the product?
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button variant="contained" color="primary" onClick={() => {HandleOkDeleteConfirmation(product)}}>Ok</Button>
                                            <Button onClick={HandleCancelDeleteConfirmation}>Cancel</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )
                })}
                
            </div>
            <div className="delete-notification-section">
                <Snackbar 
                    open={showDeleteNotification} 
                    autoHideDuration={5000} 
                    anchorOrigin= {{vertical: "top", horizontal: "right"}}
                    onClose={CloseDeleteAlertHandler}>
                    <SnackbarContent message={`Product ${deleteProduct.Name} deleted Successfully!`} />
                </Snackbar>
            </div>
            <div className="edit-notification-section">
                <Snackbar 
                    open={showEditNotification} 
                    autoHideDuration={5000} 
                    anchorOrigin= {{vertical: "top", horizontal: "right"}}
                    onClose={CloseEditAlertHandler}>
                    <SnackbarContent message={`Product ${modifiedProduct.Name} modified Successfully!`} />
                </Snackbar>
            </div>
            <div className="new-notification-section">
                <Snackbar 
                    open={showAddNotification} 
                    autoHideDuration={5000} 
                    anchorOrigin= {{vertical: "top", horizontal: "right"}}
                    onClose={CloseAddAlertHandler}>
                    <SnackbarContent message={`Product ${newProduct.Name} added Successfully!`} />
                </Snackbar>
            </div>
            <div className="order-notification-section">
                <Snackbar 
                    open={showOrderNotification} 
                    autoHideDuration={5000} 
                    anchorOrigin= {{vertical: "top", horizontal: "right"}}
                    onClose={CloseAlertHandler}>
                    <SnackbarContent message='Order placed successfully!' />
                </Snackbar>
            </div>
        </div>
    );
}

export default UserHome;
