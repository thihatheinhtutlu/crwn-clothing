import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";



export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // async function ko useEffect nae tone mal so yin useEffect htl mar async function lote pee mha wrap lote ya mal
    useEffect(()=>{
        const getCategoriesMap = async () => {
           const categoryMap = await getCategoriesAndDocuments();
           setCategoriesMap(categoryMap)
        };

        getCategoriesMap();
    },[])
   
    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
};