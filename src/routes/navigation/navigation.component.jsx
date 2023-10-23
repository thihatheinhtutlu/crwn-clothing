import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

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
        <NavigationContainer>
            <LogoContainer to='/' >
                 <CrwnLogo className="logo" />
            </LogoContainer >
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                 
                {/* ? so dar shi kae yin : so dar m shi kae yin  */}
                {  currentUser ? (
                    <NavLink onClick={signOutHandler}> SIGN OUT </NavLink>
                  ) : ( 
                    <NavLink to='/auth'> SIGN IN </NavLink>
                  )
                }
                <CartIcon/>
               
            </NavLinks>
            {/* && so dar ka ashae ka staement ka true so yin 
                nout ka har ko return mal,
                m ture woo so yin m return woo */}
            {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;
  