import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';
import { useSelector } from "react-redux";

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/007 crown.svg'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
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
                    <NavLink to='/auth'> SIGNIN </NavLink>
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
  