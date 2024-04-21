import axios from "axios"

export default function Product() {
    axios.get("https://picsum.photos/200")
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log("Couldn't Get Image: ", err)
    })
    return(<div>
        <div class="product-container">
            <div class="product-image"><img href="https://picsum.photos/300"></img></div>
            <div class="product-price"><div class="dollar">$</div>700</div>
            <div class="product-name">Jordan's Air</div>
            <div class="product-description">jump heights you've never reached before!</div>
            <button class="add-to-cart">Add To Cart</button>
        </div>
    </div>)
}