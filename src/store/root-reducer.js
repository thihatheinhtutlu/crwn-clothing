import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer";
import { categoriesRecuer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesRecuer,
    cart: cartReducer,
});