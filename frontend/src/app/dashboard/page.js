"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);

  const increaseQuantity = (itemid) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemid]: (prevCartItems[itemid] || 0) + 1,
    }));
    const item = items.find((item) => item._id === itemid);
    if (item) {
      setTotal((prevTotal) => prevTotal + item.cost);
    }
  };

  const decreaseQuantity = (itemid) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemid]: Math.max((prevCartItems[itemid] || 0) - 1, 0),
    }));
    const item = items.find((item) => item._id === itemid);
    if (item && cartItems[itemid]) {
      setTotal((prevTotal) => prevTotal - item.cost);
    }
  };

  const checkout = () => {
    axios
      .post(
        `http://192.168.49.2:31085/addcart/${localStorage.getItem("identifier")}`,
        { products: cartItems, total: total }
      )
      .then((res) => {
        console.log("Successfully added to cart");
        router.push("/cart");
      })
      .catch((err) => {
        console.log("Error Adding to Cart: ", err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://192.168.49.2:31704/items`)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log("Couldn't Get Items: ", err);
      });
  }, []);

  return (
    <div>
      <style>{`
        .carousel-container {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          width: 100%;
        }
        .carousel-item {
          flex: 0 0 25%; /* Show 4 items at once */
          padding: 10px;
          scroll-snap-align: start;
        }
        .arrow {
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
          border-radius: 50%;
          z-index: 1;
          font-size: 24px; /* Larger size for arrows */
          color: white; /* Arrow color */
        }
        .arrow.left {
          left: 10px;
        }
        .arrow.right {
          right: 10px;
        }
        .quantity-controls .quantity-btn {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          margin: 0 5px;
          font-size: 16px;
        }
        .quantity-display {
          font-size: 16px;
          margin: 0 10px;
        }
      `}</style>
      <div className="carousel-container">
        {items.map((item) => (
          <div className="carousel-item" key={item._id}>
            <div class="product-container">
              <div class="product-image">
                <img
                  src={`https://picsum.photos/200?rand=${Math.random()}`}
                ></img>
              </div>
              <div class="product-price">
                <div class="dollar">$</div>
                {item.cost}
              </div>
              <div class="product-name">{item.productName}</div>
              <div class="product-description">{item.productDesc}</div>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>
                <span className="quantity-display">
                  {cartItems[item._id] || 0}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        class="arrow left"
        onClick={() =>
          document
            .querySelector(".carousel-container")
            .scrollBy({ left: -100, behavior: "smooth" })
        }
      >
        &lt;
      </div>
      <div
        class="arrow right"
        onClick={() =>
          document
            .querySelector(".carousel-container")
            .scrollBy({ left: 100, behavior: "smooth" })
        }
      >
        &gt;
      </div>
      <div class="checkout-button">
        <button onClick={checkout}>Check Out</button>
      </div>
    </div>
  );
}
