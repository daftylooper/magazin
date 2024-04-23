"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://192.168.49.2:31085/getcart/${localStorage.getItem(
          "identifier"
        )}`
      )
      .then((res) => {
        const cartData = res.data;
        setTotal(cartData.total);
      })
      .catch((err) => {
        console.error("Error fetching cart data:", err);
      });
  }, []);

  const handleOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage("");
    if (paymentOption === "card" || paymentOption === "upi") {
      try {
        const paymentData = {
          identifier: localStorage.getItem("identifier"),
          total: total,
          ...formData,
          is_auth: true,
        };

        const url = paymentOption === "card" ? "/creditcard" : "/upi";
        const response = await axios.post(
          "http://192.168.49.2:30457" + url,
          paymentData
        );
        console.log("Payment successful:", response.data);
        setFormData({});
        alert("Payment successful!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Payment error:", error);
        setMessage("Payment failed. Please try again.");
      }
    } else {
      setMessage("Please select a payment option.");
    }
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
          maxWidth: "1500px",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
        }}
      >
        <h1 style={headingStyle}>Payment Page</h1>
        <p style={totalAmountStyle}>Total Amount: ${total}</p>
        <form onSubmit={handlePayment}>
          <label style={labelStyle}>
            <input
              type="radio"
              name="paymentOption"
              value="card"
              onChange={() => handleOptionChange("card")}
            />
            Card
          </label>
          <label style={labelStyle}>
            <input
              type="radio"
              name="paymentOption"
              value="upi"
              onChange={() => handleOptionChange("upi")}
            />
            UPI
          </label>
          {paymentOption && (
            <div style={cardContainerStyle}>
              <label style={inputLabelStyle}>
                {paymentOption === "card" ? "Card No" : "UPI ID"}:
                <input
                  type={paymentOption === "card" ? "text" : "email"}
                  name={paymentOption === "card" ? "card_no" : "upi_id"}
                  value={formData.cardNumber || formData.upiId || ""}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </label>

              <label style={inputLabelStyle}>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </label>
              <button type="submit" style={submitButtonStyle}>
                Pay
              </button>
            </div>
          )}
        </form>
        {message && <p style={errorMessageStyle}>{message}</p>}
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  minHeight: "100vh",
};

const headingStyle = {
  fontSize: "2rem",
  marginBottom: "20px",
};

const totalAmountStyle = {
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const labelStyle = {
  marginRight: "10px",
};

const inputLabelStyle = {
  marginBottom: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "10px",
  width: "100%",
  boxSizing: "border-box",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorMessageStyle = {
  color: "red",
  marginTop: "10px",
};

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  width: "100%",
};
