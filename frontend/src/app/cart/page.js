'use client';

import { useEffect, useState } from "react"
import axios from "axios";

export default function Cart(){

    const [cartItems, setCartItems] = useState({})
    const [item, setItem] = useState([])

    // var products = []

    // var items = []

    function getproduct(itemid) {
        axios.get("http://localhost:2000/item/"+itemid)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log("Error loading products: ", err)
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:7001/getcart/${localStorage.getItem("identifier")}`)
        .then((res)=>{
            const products = res.data.products
            setCartItems(products)
            // Object.keys(cartItems).forEach((itemid)=>{
            //     axios.get("http://localhost:2000/item/"+itemid)
            //     .then(item=>{
            //         console.log(item)
            //     })
            //     .catch(err=>{
            //         console.log("Error Getting Item: ", err)
            //     })
            //     console.log(itemid)
            // })
        })
        .catch(err=>{
            console.log("Error loading cart: ", err)
        })
    }, [])


    // console.log(item)

    return(<div>
        Cart!

        {
            Object.keys(cartItems).map((itemid)=>{
                console.log("Inside Map: ", itemid)
                getproduct(itemid)
                // getAllProducts()
                // console.log("->", item)
                return(
                <div class="cart-container">
                    <div class="cart-item-image"><img src="jordans.jpg"></img></div>
                    <div class="cart-item-detail">
                        <div class="cart-item-name">Jordan's</div>
                        <div class="cart-item-quantity"><div>Qty:</div><div style={{"marginLeft": "5px"}}>{cartItems[itemid]}</div></div>
                    </div>
                    <div class="cart-item-cost">
                        <div class="cart-actual-cost"><div>$</div><div>10</div></div>
                    </div>
                </div>
                )
            })
        }

        <div class="cart-total">
            <div class="cart-total-text">Order Total:</div>
            <div class="cart-total-number"><div>$</div>1300</div>
        </div>
    </div>)
}