import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Navbar.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Search = styled('div')(({ theme }) => ({  
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(-95),
        marginTop: theme.spacing(-2.5),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit', '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const NavBar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const OnSearchHandler = (e) => {
        navigate('/userhome', {
            state: {
                user: props.User,
                products: props.Products,
                searchText: e.target.value
            }
        });
    }

    const OnLogoClicked = () => {
        if(props.IsUserPage) {
            navigate('/userhome', {
                state: {
                    user: props.User,
                    products: props.Products,
                    searchText: ''
                }
            });
        }
        else {
            navigate('/login');
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        position="absolute"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={OnLogoClicked}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        position="absolute"
                        noWrap
                        component="div"
                        marginLeft={5}
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={OnLogoClicked}
                    >
                        <b>upGrad E-Shop</b>
                    </Typography>
					<ul className='menu-items-list'>
					{
						props.IsUserPage &&
                        <li className='menu-item'>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									position="absolute"
									placeholder="Search…"
									inputProps={{ 'aria-label': 'search' }}
                                    onChange={OnSearchHandler}
								/>
							</Search>
						</li> 
                    }
					{
                        (props.User !== undefined && props.User.role === "User") &&
                        <li className='menu-item'>
                            <Link to='/userhome' state={{user: location.state.user}}>
                                <Typography
                                    variant="a href"
                                    noWrap
                                    color={grey[100]}
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block', marginLeft: -140, marginTop: -27, position: 'absolute'} }}
                                >
                                    <p><u>Home</u></p>
                                </Typography>
                            </Link>
						</li> 
                    }
					{
                        (props.User !== undefined && props.User.role === "Admin") &&
                        <li className='menu-item'>
                            <Link to='/userhome' state={{user: location.state.user}}>
                                <Typography
                                    variant="a href"
                                    noWrap
                                    color={grey[100]}
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block', marginLeft: -260, marginTop: -27, position: 'absolute'} }}
                                >
                                    <p><u>Home</u></p>
                                </Typography>
                            </Link>
						</li> 
                    }
					{
                        (props.User !== undefined && props.User.role === "Admin") &&
                        <li className='menu-item'>
                            <Link to='/addproduct' state={{user: location.state.user, products: props.Products}}>
                                <Typography
                                    variant="a href"
                                    noWrap
                                    color={grey[100]}
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block',  marginLeft: -190, marginTop: -27}, position: 'absolute' }}
                                >
                                    <p><u>Add Product</u></p>
                                </Typography>
                            </Link>
						</li> 
                    }
					{
                        !props.IsUserPage &&
                        <li className='menu-item'>
							<Link to='/login'>
                                <Typography
                                    variant="a href"
                                    noWrap
                                    color={grey[100]}
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block', position: 'absolute', marginLeft: -115, marginTop: -27 } }}
                                >
                                    <p><u>Login</u></p>
                                </Typography>
                            </Link>
						</li> 
                    }
					{
                        !props.IsUserPage &&
                        <li className='menu-item'>
							<Link to='/signup'>
                                <Typography
                                    variant="a href"
                                    noWrap
                                    color={grey[100]}
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block', position: 'absolute', marginLeft: -65, marginTop: -27 } }}
                                >
                                    <p><u>Sign Up</u></p>
                                </Typography>
                            </Link>
						</li> 
                    }
					{
                        props.IsUserPage &&
                        <li className='menu-item'>
                            <Link to='/login'>
                                <Stack direction="row" spacing={2}>
                                    <Button style=  {{
                                                        marginLeft:-102,
                                                        marginTop:-19,
                                                        position: 'absolute'
                                                    }} 
                                            variant="contained" color="error">
                                        <b>LOGOUT</b>
                                    </Button>
                                </Stack>
                            </Link>
						</li> 
                    }
					</ul>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
