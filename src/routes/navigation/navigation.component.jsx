import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/007 crown.svg'

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  const signOutHandler = async () => {
   await signOutUser();
  };
    
    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/' >
                 <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                { 
                // ? so dar shi kae yin : so dar m shi kae yin 
                  currentUser ? (
                    <span className="nav-link" onClick={signOutHandler}> SIGN OUT </span>
                  ) : ( 
                    <Link className="nav-link" to='/auth'> SIGN IN </Link>
                  )
                }
                <CartIcon/>
               
            </div>
            {/* && so dar ka ashae ka staement ka true so yin 
                nout ka har ko return mal,
                m ture woo so yin m return woo */}
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;
  