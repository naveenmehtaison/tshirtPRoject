import DataContext from "./auth-context";
import React, { useState, useContext} from "react";
import axios from "axios";
const StoreContext=(props)=>{
    const [login,setlogin] = useState(false)
    const [cartlen,setcartlen] = useState('')

    const StoreContext2 = {

        cartlength:setcartlen,
        curcartlen:cartlen
    }
    return(
        <DataContext.Provider value={StoreContext2}>
            {props.children}
        </DataContext.Provider>
    )


}
export default StoreContext