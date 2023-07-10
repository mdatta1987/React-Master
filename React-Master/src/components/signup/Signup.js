import { pink } from "@mui/material/colors";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import NavBar from "../navbar/Navbar";
import './Signup.css';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import { grey } from "@mui/material/colors";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SignUp = () => {
    return(
        <div className="signup">
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
				<p class = "signin">Sign Up</p>
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
                <TextField required id="outlined-basic" label="First Name" variant="outlined"/>
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
                <TextField required id="outlined-password-input" label="Last Name" type="password"/>
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
                marginTop={30}
                >
                <TextField required id="outlined-password-input" label="Email Address" type="password"/>
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
                marginTop={40}
                >
                <TextField required id="outlined-password-input" label="Password" type="password"/>
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
                marginTop={50}
                >
                <TextField required id="outlined-password-input" label="Confirm Password" type="password"/>
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
                marginTop={60}
                >
                <TextField required id="outlined-password-input" label="Contact Number" type="password"/>
            </Box>
			<Box>
				<Button style=  {{
                        position:"absolute",
                        marginTop:590,
					    marginLeft:682,
                        width:253
					}} 
					variant="contained" onClick={()=>{alert('User Added!')}}>
					<b>SIGN UP</b>
				</Button>
			</Box>
			<Typography
				variant="a href"
				position="absolute"
				marginTop={80}
                fontSize={15}
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block', marginLeft: 714} }}
				>
				<span className="signup-link"><Link to='/login'>Already have an account? Sign In</Link></span>
			</Typography>
			<Typography
				variant="p"
				position="absolute"
				marginTop={90}
				noWrap
				component="div"
				sx={{ display: { xs: 'none', sm: 'block', marginLeft: 730, fontSize:13, color:'gray'} }}
				>
				<span className="copyright-message">Copyright <span>&copy;</span><a href='https://www.upgrad.com/' target="_blank">Upgrad</a> 2023</span>
			</Typography>
		</div>
    );
}

export default SignUp;
