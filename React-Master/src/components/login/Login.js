import React from 'react';
import NavBar from "../navbar/Navbar";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import { pink } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setPassword] = useState('');

    let navigate = useNavigate();
    
    const userEmailHandler = (e) => {
        setUserEmail(e.target.value);
    }

    const userPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const userValidation = (e) => {
        e.preventDefault();
        var data = require('../../assets/users/user-list.json');
        data.users.forEach( user => {
            if(user.email === userEmail && user.password === userPassword) {
                navigate('/userhome', {
                    state: {user}
                });
            }
        });
    }

    return (
        <div className='login'>
            <NavBar IsUserPage={false}/>
			<IconButton
                size="large"
                position="absolute"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
            >
                <LockOutlinedIcon 
                    fontSize="large"
                    sx={{ color: grey[50], marginLeft: 97, marginTop: 11, backgroundColor:pink[500], borderRadius:150}}
                />
            </IconButton>
			<Typography
				variant="p"
				position="absolute"
				marginTop={0}
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block', marginLeft: 761, fontSize: 20} }}
				>
				<p class = "signin">Sign In</p>
			</Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '30ch' },
                }}
                noValidate
                position={'absolute'}
                autoComplete="off"
                marginLeft={84}
                marginTop={10}
                >
                <TextField required id="outlined-basic" label="Email Address" variant="outlined" value={userEmail} onChange={userEmailHandler}/>
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
                position={'absolute'}
                marginLeft={84}
                marginTop={20}
                >
                <TextField required id="outlined-password-input" label="Password" type="password" value={userPassword} onChange={userPasswordHandler}/>
            </Box>
			<Box>
				<Button style=  {{
                        position:"absolute",
                        marginTop:270,
					    marginLeft:682,
                        width:253
					}} 
					variant="contained" onClick={userValidation}>
					<b>SIGN IN</b>
				</Button>
			</Box>
			<Typography
				variant="a href"
				position="absolute"
				marginTop={40}
                fontSize={15}
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block', marginLeft: 683} }}
				>
				<span className="signup-link"><Link to='/signup'>Don't have an account? Sign Up</Link></span>
			</Typography>
			<Typography
				variant="p"
				position="absolute"
				marginTop={50}
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block', marginLeft: 730, fontSize:13, color:'gray'} }}
				>
				<span className="copyright-message">Copyright <span>&copy;</span><a href='https://www.upgrad.com/' target="_blank">Upgrad</a> 2023</span>
			</Typography>
        </div>
    );
}

export default Login;
