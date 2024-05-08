import React, { useState, useEffect,useContext } from "react"
import axios from 'axios'

import { createPortal } from 'react-dom'; 

import DataContext from "../Store/auth-context"
const Cart=()=>{
    const Ctx = useContext(DataContext)
    const [cartdata,setcartdata]= useState([])
    useEffect(()=>{
        async function Getdata(){
            const response = await axios.get('https://crudcrud.com/api/a0bb8d341b2a413baeb9623a8bae698a/cart')
            setcartdata(response.data)
            console.log(response)
        }
        Getdata()
    },[])
    const portal = document.getElementById('portal')
    return(
        createPortal(   
            <div className="backdrop">
                <div className="modal">
                    {cartdata.map((ele,item)=>(
                        <div>
                            {ele.obj.Name}
                            {ele.obj.des}
                            {ele.obj.price}
                        </div>

                    ))}
                </div>

            </div>,
        portal)

    )
}
export default Cart
