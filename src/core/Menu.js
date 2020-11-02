import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth/index'
import {itemTotal} from './cartHelpers'

const isActive = (history, path ) => {
    if(history.location.pathname === path){
      return {color: '#ff9900'}
    }
    else {
        return {color: '#ffffff'}
    }
}

const Menu = (props)=> (
    <div> 
        <ul className ="nav nav-tabs bg-primary">
        <li className="nav-item">
        <Link className="nav-link"
         style={isActive(props.history,'/')} to="/">Home</Link>
        </li>

        <li className="nav-item">
        <Link className="nav-link"
         style={isActive(props.history,'/shop')} to="/shop">Shop</Link>
        </li>

        <li className="nav-item">
        <Link className="nav-link"
         style={isActive(props.history,'/cart')} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
        </li>


        {isAuthenticated() && isAuthenticated().user.role === 0 &&(
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,'/user/dashboard')} to="/user/dashboard">DashBoard</Link>
                    </li>
                    
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 &&(
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,'admin/dashboard')} to="/admin/dashboard">DashBoard</Link>
                    </li>
                    
        )}


        {!isAuthenticated() && (
            <Fragment>        <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history,'/signin')} to="/signin">SignIn</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history,'/signup')} to="/signup">Signup</Link>
        </li></Fragment>
        )}

        {isAuthenticated() &&  (<li className="nav-item">
            <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}}
             onClick={() => signout(()=> {
                    props.history.push('/')
            })}>
                Signout</span>
        </li>    )   }

        </ul>
    </div>
)

export default withRouter(Menu);