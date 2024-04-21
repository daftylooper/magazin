'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter()
    
    const [items, setItems] = useState([])
    const [productItems, setProductItems] = useState([])


    // var isCartItem = []
    var cartItems = {}

    const handleItemPush = (itemid) => {
        console.log(cartItems)
        if(cartItems[itemid]){
            cartItems[itemid]=parseInt(cartItems[itemid])+1
        } else {
            cartItems[itemid] = 1
        }
    }

    const checkout = () =>{

        // var items = []
 
        // Object.keys(cartItems).forEach((itemid)=>{
        //     axios.get("http://localhost:2000/item/"+itemid)
        //     .then(item=>{
        //         console.log(item)
        //         items.push(item.data.data)
        //         console.log("Item pushed!")
        //     })
        //     .catch(err=>{
        //         console.log("Error Getting Item: ", err)
        //     })

        //     console.log("FROM PRODUCTS! :", items)
        // })

        // console.log("seriously?", items)
        console.log("cart items: ", cartItems)
        axios.post(`http://localhost:7001/addcart/${localStorage.getItem("identifier")}`, {"products": cartItems})
        .then(res=>{
            console.log("Successfully added to cart")
            router.push("/cart")
        }).catch(err=>{
            console.log("Error Adding to Cart: ", err)
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:2000/items")
        .then(res=>{
            setItems(res.data.data)
            console.log(res.data.data)
        })
        .catch(err=>{
            console.log("Couldn't Get Items: ", err)
        })
    }, [])

    return(<div>
        <div class="all-products">
            {
                items.map((item)=>{
                    return(
                        <div class="product-container" key={item._id}>
                            <div class="product-image"><img src="https://picsum.photos/200"></img></div>
                            <div class="product-price"><div class="dollar">$</div>{item.cost}</div>
                            <div class="product-name">{item.productName}</div>
                            <div class="product-description">{item.productDesc}</div>
                            <button class="add-to-cart" onClick={()=>{handleItemPush(item._id)}}>Add To Cart</button>
                        </div>
                    )
                })
            }
        </div>
        <div class="checkout-button">
            <button onClick={checkout}>Check Out</button>
        </div>
    </div>)

}