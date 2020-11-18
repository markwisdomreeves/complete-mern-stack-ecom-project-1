
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)


    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    }


    const adminRouter = () => {
        return(
            <>
                <li><Link style={{color: "rgb(3, 165, 206)"}} to="/create_product">Create Product</Link></li>
                <li><Link style={{color: "rgb(3, 165, 206)"}} to="/category">Categories</Link></li>
            </>
        )
    }


    const loggedRouter = () => {
        return(
            <>
                <li><Link style={{color: "rgb(3, 165, 206)"}} to="/history">History</Link></li>
                <li><Link style={{color: "rgb(3, 165, 206)"}} to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }


    return (
        <header>
                <div className="menu" onClick={() => setMenu(!menu)}>
                    <img src={Menu} alt="" width="30" />
                </div>

                <div className="logo">
                    <h1>
                        <Link to="/">{isAdmin ? 'Admin' : 'Small Shop'}</Link>
                    </h1>
                </div>

                <ul style={styleMenu}>
                    <li><Link style={{color: "rgb(3, 165, 206)"}} to="/">{isAdmin ? 'Products' : 'Small Shop'}</Link></li>

                    {isAdmin && adminRouter()}

                    {
                        isLogged ? loggedRouter() : <li><Link style={{color: "rgb(3, 165, 206)"}} to="/login">Login</Link></li>
                    }

                    <li onClick={() => setMenu(!menu)}>
                        <img src={Close} alt="" width="30" className="menu" />
                    </li>

                </ul>

                {
                    isAdmin ? '' 
                    : <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                     </div>
                }
                
        </header>
    )
}



export default Header
