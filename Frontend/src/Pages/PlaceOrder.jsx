
import React, { useContext, useState } from 'react';
import Title from '../Components/Title.jsx';
import CartTotal from '../Components/CartTotal.jsx';
import { assets } from '../assets/assets.js';
import { ShopContext } from '../Context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';


import {
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaCity,
  FaGlobe,
  FaPhone,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
} from 'react-icons/fa';

export default function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    getCartCount,
    deliver_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };


  const initPay = (order) =>{
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : 'Order Payment',
      description : 'Order Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler : async (PaymentResponse) =>{
        try {
          setLoading(true);
          const verifyResponse = await axios.post(backendUrl + "/api/order/verifyRazorpay",{
            razorpay_order_id : PaymentResponse.razorpay_order_id,
            razorpay_payment_id : PaymentResponse.razorpay_payment_id,
            razorpay_signature : PaymentResponse.razorpay_signature
          },
        {
          headers : {token}
        });
        if(verifyResponse.data.success)
        {
          setCartItems({});
          toast.success("Payment Successfully! Order placed successfully!!");
          navigate("/orders");
        }else{
          toast.error(verifyResponse.data.message || "Payment verification failed!!")
        }
        } catch (error) {
          console.log("Razorpay verification error : ", error);
          toast.error(error.response?.data?.message || "Payment successfully, but order verification failed.")
        }finally{
          setLoading(false);
        } 
      },
      model : {
        ondismiss : () =>{
          setLoading(false);
        }
      },
      theme : {
        color : "#000000"
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.on("Payment failed", (response) =>{
      console.log("Razorpay Payment failed : ", response.error);
      toast.error(response.error.description || "Payment Failed");
      setLoading(false);
    })
    rzp.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
    }

    if (getCartCount() === 0) {
        toast.error("Your cart is empty");
        navigate("/collection");
        return;
    }

    try {
        setLoading(true);

        const orderItems = [];
        for(const productId in cartItems)
        {
          for(const size in cartItems[productId])
          {
              const quantity = cartItems[productId][size];
              if(quantity > 0)
              {
                const productData = products.find((product) => product._id === productId);
                if(productData)
                {
                  orderItems.push({...productData, size, quantity,})
                }
              }
          }
        }

        let response;

        if (method === "cod") {
            // Cash on Delivery
            response = await axios.post(
                backendUrl + "/api/order/place", 
                { address: formData },
                { headers: { token } }
            );

        } else if (method === "stripe") {
            // Stripe payment
            response = await axios.post(
                backendUrl + "/api/order/stripe",
                { orderItems, address: formData },
                { headers: { token } }
            );

        } else if (method === "razorpay") {
            // Razorpay payment
            response = await axios.post(
                backendUrl + "/api/order/razorpay",
                {orderItems, address: formData },
                { headers: { token } }
            );
        }

        if (response?.data?.success) {
            toast.success(response.data.message || "Order placed successfully");

            if (method === "cod") {
                setCartItems({});
                navigate("/orders");
            }
            else if(method === "stripe")
            {
              window.location.href = response.data.session_url;
              return;
            }else if(method === "razorpay"){
              initPay(response.data.order); 
            }

        }else {
            toast.error(response?.data?.message || "Payment failed");
        }

    } catch (error) {
        console.log("Order Error:", error);
        toast.error(
            error.response?.data?.message || "Something went wrong"
        );
    } finally {
        setLoading(false);
    }
};  



  const inputClass =
    'w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white placeholder:text-gray-400';

  const paymentOptions = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      image: null,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      image: assets.stripe_logo,
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      image: assets.razorpay_logo,
    },
    
  ];

  return (
    <div className="bg-white min-h-screen border-t border-gray-100">

      <form
        onSubmit={onSubmitHandler}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      >

        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-2">
            Almost There
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Complete Your <span className="text-gray-400">Order</span>
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Provide your delivery information and choose your preferred payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* ================= LEFT SIDE ================= */}

          <div className="lg:col-span-7 space-y-8">

            {/* Delivery Information */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">

              <div className="flex items-center gap-4 mb-7">

                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-gray-700" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Delivery Information
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      First Name *
                    </label>

                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                      <input
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        className={`${inputClass} pl-10`}
                        type="text"
                        placeholder="First name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Last Name *
                    </label>

                    <input
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={onChangeHandler}
                      className={inputClass}
                      type="text"
                      placeholder="Last name"
                    />
                  </div>

                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Email Address *
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={onChangeHandler}
                      className={`${inputClass} pl-10`}
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Street */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Street Address *
                  </label>

                  <input
                    required
                    name="street"
                    value={formData.street}
                    onChange={onChangeHandler}
                    className={inputClass}
                    type="text"
                    placeholder="House number and street name"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      City *
                    </label>

                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={onChangeHandler}
                      className={inputClass}
                      type="text"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      State *
                    </label>

                    <input
                      required
                      name="state"
                      value={formData.state}
                      onChange={onChangeHandler}
                      className={inputClass}
                      type="text"
                      placeholder="State"
                    />
                  </div>

                </div>

                {/* Zipcode and Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      PIN Code *
                    </label>

                    <input
                      required
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={onChangeHandler}
                      className={inputClass}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      placeholder="6-digit PIN code"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Country *
                    </label>

                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                      <input
                        required
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        className={`${inputClass} pl-10`}
                        type="text"
                        placeholder="Country"
                      />
                    </div>
                  </div>

                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Phone Number *
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={onChangeHandler}
                      className={`${inputClass} pl-10`}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="10-digit phone number"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">

              <div className="flex items-center gap-4 mb-7">

                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaCreditCard className="text-gray-700" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payment Method
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Choose how you want to pay.
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMethod(option.id)}
                    className={`relative flex flex-col items-center justify-center gap-4 min-h-28 p-4 rounded-xl border-2 transition ${
                      method === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >

                    {method === option.id && (
                      <FaCheckCircle className="absolute top-3 right-3 text-black text-sm" />
                    )}

                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.name}
                        className="h-7 max-w-24 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-gray-800">
                        COD
                      </span>
                    )}

                    <span className="text-xs font-medium text-gray-600">
                      {option.name}
                    </span>

                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="lg:col-span-5">

            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Order Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-7">

                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <CartTotal />

                <div className="border-t border-gray-200 mt-6 pt-5 space-y-4">

                  <div className="flex items-center gap-3 text-gray-600">
                    <FaTruck />
                    <p className="text-xs">
                      Delivery details will be confirmed at checkout.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <FaShieldAlt />
                    <p className="text-xs">
                      Secure checkout experience.
                    </p>
                  </div>

                </div>

              </div>

              {/* Place Order */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Ready to order?
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Review your details before continuing.
                    </p>
                  </div>

                  <FaCheckCircle className="text-2xl text-green-600" />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-lg text-sm font-semibold tracking-widest hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-4 leading-5">
                  By placing your order, you agree to our terms and conditions.
                </p>

              </div>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
