'use client';

import { useEffect, useState } from "react"
import axios from "axios";

export default function Cart(){

    const [cartItems, setCartItems] = useState([])
    // const [item, setItem] = useState([])
    
    var items = []
    
    // function getproduct(itemid) {
    //     axios.get("http://localhost:2000/item/"+itemid)
    //     .then(res=>{
    //         console.log(res)
    //     })
    //     .catch(err=>{
    //         console.log("Error loading products: ", err)
    //     })
    // }

    async function getItems() {
        const response = await axios.get(`http://localhost:7001/getcart/${localStorage.getItem("identifier")}`)
        // console.log(response.data.products)
        const products = response.data.products
        // console.log(products)
        Object.keys(products).forEach(async(itemid)=>{
            const item = await axios.get("http://localhost:2000/item/"+itemid)
            console.log("item pushed!")
            items.push(item)
        })
        console.log(items)
    }
    
    useEffect(()=>{
        // getItems()
        console.log("All Items -----> ", items)
        // await setCartItems(items)
        var items = []
        axios.get(`http://localhost:7001/getcart/${localStorage.getItem("identifier")}`)
        .then((res)=>{
            const products = res.data.products
            // console.log(products)
            console.log("===========>")
            Object.keys(products).forEach((itemid)=>{
                axios.get("http://localhost:2000/item/"+itemid)
                .then(item=>{
                    console.log(item)
                    items.push(item.data.data)
                    console.log("Item pushed!")
                })
                .catch(err=>{
                    console.log("Error Getting Item: ", err)
                })
            })
        })
        .catch(err=>{
            console.log("Error loading cart: ", err)
        })
        console.log("items ---[]> ", items)
        setCartItems(items)
    }, [])

    // console.log(item

    return(<div>
        Cart!

        {
            console.log("items length:"+cartItems.length)
        }
        {
            cartItems.map((item)=>{
                console.log("Inside Map ", item)
                // getproduct(itemi
                // getAllProducts()
                // console.log("->", item)
                return(
                <div class="cart-container">
                    <div class="cart-item-image"><img src="jordans.jpg"></img></div>
                    <div class="cart-item-detail">
                        <div class="cart-item-name">{item.productName}</div>
                        <div class="cart-item-quantity"><div>Qty:</div><div style={{"marginLeft": "5px"}}>{cartItems[itemid]}</div></div>
                    </div>
                    <div class="cart-item-cost">
                        <div class="cart-actual-cost"><div>$</div><div>{item.cost}</div></div>
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