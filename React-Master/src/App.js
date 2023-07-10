import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import SignUp from './components/signup/Signup';
import UserHome from './components/home/Home';
import ModifyProduct from './components/modify/Modify';
import AddProduct from './components/add/Add';
import ProductDetail from './components/details/Details';
import Orders from './components/orders/Orders';
import Address from './components/addresses/Addresses';

function App() {
  return (
    <Router>
    <div className="App">
    </div>
        <Routes>
        <Route path='/' element={<Login />}>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/signup' element={<SignUp />}>
        </Route>
        <Route path='/userhome' element={<UserHome />}>
        </Route>
        <Route path='/modify/:id' element={<ModifyProduct />}>
        </Route>
        <Route path='/addproduct' element={<AddProduct />}>
        </Route>
        <Route path='/products/:id' element={<ProductDetail />}>
        </Route>
        <Route path='/orders' element={<Orders />}>
        </Route>
        <Route path='/addresses' element={<Address />}>
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
