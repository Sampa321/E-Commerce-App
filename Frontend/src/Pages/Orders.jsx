
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBoxOpen, FaCalendarAlt, FaTruck, FaCreditCard } from "react-icons/fa";

export default function Orders() {

    const { currency, backendUrl, token } = useContext(ShopContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= FETCH USER ORDERS =================

    const loadOrders = async () => {
        try {
            if (!token) {
                setOrders([]);
                return;
            }

            setLoading(true);

            const response = await axios.post(
                backendUrl + "/api/order/userOrders",
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setOrders(response.data.orders || []);
            } else {
                toast.error(response.data.message || "Failed to load orders");
            }

        } catch (error) {
            console.log("Fetch Orders Error:", error);
            toast.error(error.response?.data?.message || "Unable to fetch orders");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [token]);

    // ================= FORMAT DATE =================

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // ================= STATUS COLOR =================

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700";

            case "Cancelled":
                return "bg-red-100 text-red-700";

            case "Shipped":
                return "bg-blue-100 text-blue-700";

            case "Out for Delivery":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-orange-100 text-orange-700";
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-3">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="text-gray-500">Loading your orders...</p>
            </div>
        );
    }

    // ================= ORDERS PAGE =================

    return (
        <div className="border-t pt-12 pb-20 px-4 sm:px-6 md:px-10 lg:px-16">

            {/* PAGE TITLE */}

            <div className="flex justify-between items-center mb-10">
                <div>
                    <Title text1={"MY"} text2={"ORDERS"} />
                    <p className="text-sm text-gray-500 mt-2">
                        Track and manage your recent purchases.
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <FaBoxOpen />
                    {orders.length} Orders
                </div>
            </div>

            {/* EMPTY ORDERS */}

            {orders.length === 0 ? (

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-20 px-5 text-center">

                    <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-5">
                        <FaBoxOpen className="text-4xl text-gray-400" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        No orders yet
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        You haven't placed any orders yet. Your purchases will appear here.
                    </p>

                </div>

            ) : (

                <div className="space-y-7">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                        >

                            {/* ORDER HEADER */}

                            <div className="bg-gray-50 px-5 sm:px-7 py-5 border-b border-gray-200">

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                Order ID
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800 break-all">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                Order Date
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                <FaCalendarAlt className="text-gray-400" />
                                                {formatDate(order.date)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                Total Amount
                                            </p>

                                            <p className="text-sm font-bold text-gray-900">
                                                {currency} {Number(order.amount).toFixed(2)}
                                            </p>
                                        </div>

                                    </div>

                                    <div>
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            <span className="w-2 h-2 rounded-full bg-current"></span>
                                            {order.status}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* ORDER PRODUCTS */}

                            <div className="px-5 sm:px-7 py-3">

                                {order.items?.map((item, index) => (

                                    <div
                                        key={`${order._id}-${index}`}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-5 border-b border-gray-100 last:border-b-0"
                                    >

                                        {/* PRODUCT DETAILS */}

                                        <div className="flex items-center gap-5">

                                            <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        Array.isArray(item.image)
                                                            ? item.image[0]
                                                            : item.image
                                                    }
                                                    alt={item.name}
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                                                    {item.name}
                                                </h3>

                                                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">

                                                    <p>
                                                        Size: <span className="font-medium text-gray-800">{item.size}</span>
                                                    </p>

                                                    <p>
                                                        Qty: <span className="font-medium text-gray-800">{item.quantity}</span>
                                                    </p>

                                                </div>

                                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                                    {currency} {Number(item.price).toFixed(2)}
                                                </p>
                                            </div>

                                        </div>

                                        {/* DELIVERY STATUS */}

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaTruck className="text-gray-400" />
                                            <span>{order.status}</span>
                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* PAYMENT FOOTER */}

                            <div className="bg-gray-50 border-t border-gray-200 px-5 sm:px-7 py-5">

                                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                            <FaCreditCard className="text-gray-600" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Payment Method
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800">
                                                {order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Payment Status
                                        </p>

                                        <span className={`text-sm font-semibold ${
                                            order.payment
                                                ? "text-green-600"
                                                : "text-orange-600"
                                        }`}>
                                            {order.payment ? "Paid" : "Pending - Pay on Delivery"}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}
