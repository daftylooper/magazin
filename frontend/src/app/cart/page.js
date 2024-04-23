"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.49.2:31085/getcart/${localStorage.getItem("identifier")}`
        );
        console.log(response.data);
        const total = response.data.total;
        const items = Object.entries(response.data.products).map(
          ([itemId, quantity]) => ({
            itemId,
            quantity,
            details: null,
          })
        );

        const itemDetailsPromises = items.map(async (item) => {
          try {
            const itemResponse = await axios.get(
              `http://192.168.49.2:31704/item/${item.itemId}`
            );
            return { ...item, details: itemResponse.data };
          } catch (error) {
            console.error("Error fetching item details:", error);
            return item;
          }
        });

        const updatedItems = await Promise.all(itemDetailsPromises);
        setCartItems(updatedItems);
        setFinalPrice(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    router.push("/payment");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
        }}
      >
        <h1>Cart Page</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeader}>Item Name</th>
              <th style={tableHeader}>Quantity</th>
              <th style={tableHeader}>Price per Item</th>
              <th style={tableHeader}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.itemId}>
                <td style={tableData}>{item.details?.data.productName}</td>
                <td style={tableData}>{item.quantity}</td>
                <td style={tableData}>${item.details?.data.cost}</td>
                <td style={tableData}>
                  ${item.quantity * item.details?.data.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Total Price: ${finalPrice}</h3>
          <button style={checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const tableHeader = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tableData = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const checkoutButton = {
  padding: "10px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Cart;
