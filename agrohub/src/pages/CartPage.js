import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import "./Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const user =
    JSON.parse(sessionStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("Cart Page Loaded", user);
    if (user) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const userCart = cart.filter((item) => item.userEmail === user.email);
      setCartItems(userCart);
      const totalPrice = userCart
        .filter((item) => !item.paid) // Filter unpaid items for total
        .reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    }
  }, [user]);

  if (!user) {
    return <h2>Please log in to view your cart.</h2>;
  }

  const handlePayment = () => {
    const options = {
     key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay Key ID
      amount: total * 100, // Amount is in paisa (₹1 = 100 paisa)
      currency: "INR",
      name: "AgroHub",
      description: "Marketplace Purchase",
      handler: function (response) {
        // Handle successful payment
        alert("Payment ID: " + response.razorpay_payment_id);
  
        // Mark all items as paid
        const allCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = allCartItems.map((item) =>
          item.userEmail === user.email ? { ...item, paid: true } : item
        );
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        const userCart = updatedCart.filter(
          (item) => item.userEmail === user.email
        );
        setCartItems(userCart);
  
        const totalPrice = userCart
          .filter((item) => !item.paid)
          .reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice);
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#0f9d58",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  const handleGoToMarketplace = () => {
    navigate("/marketplace");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Handle delete functionality
  const handleDelete = (indexToDelete) => {
    const allCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove item at given index in user's cart only
    const updatedUserCart = cartItems.filter((_, index) => index !== indexToDelete);
    const userItemsJSON = cartItems.map((item) => JSON.stringify(item));

    let deletedItemJSON = userItemsJSON[indexToDelete];

    const updatedCart = allCartItems.filter((item) => {
      // Keep other users' items or unmatched items
      return (
        item.userEmail !== user.email ||
        JSON.stringify(item) !== deletedItemJSON
      );
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedUserCart);
    const updatedTotal = updatedUserCart
      .filter((item) => !item.paid) // Update total only for unpaid items
      .reduce((acc, item) => acc + item.price, 0);
    setTotal(updatedTotal);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="cart-container">
        <h2>{user.name}'s Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  {item.paid && <p className="paid-status">Paid ✅</p>} {/* Display paid status */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <hr />
            <h3>Total: ₹{total}</h3> {/* Only unpaid items included in total */}
            <button className="payment-btn" onClick={handlePayment}>
              Proceed to Payment
            </button>
            <button
              onClick={handleGoToMarketplace}
              className="payment-btn"
            >
              Go to Marketplace
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
