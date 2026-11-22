import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay"
import jwt from "jsonwebtoken"
import crypto from "crypto"

// global variable for currency and delivery charges
const currency = 'inr';

// Delivery fee should match ShopContext.jsx
const DELIVERY_FEE = 10;


export function createToken(id) {
    console.log("Creating token with secret:", Boolean(process.env.JWT_SECRET_KEY));

    return jwt.sign(
        { id: id.toString() },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );
}


// gateway initialize
console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= PLACE ORDER USING COD =================

const placeOrder = async (req, res) => {
    try {
        // userId is added by authUser middleware
        const userId = req.userId;
        const { address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });
        }

        // Find logged-in user
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Get user's cart
        const cartData = userData.cartData || {};

        if (Object.keys(cartData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });
        }

        const orderItems = [];
        let subtotal = 0;

        // Get product details from MongoDB
        for (const productId of Object.keys(cartData)) {

            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "A product in your cart was not found"
                });
            }

            const sizes = cartData[productId];

            for (const size of Object.keys(sizes)) {

                const quantity = Number(sizes[size]);

                if (!Number.isInteger(quantity) || quantity <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid product quantity"
                    });
                }

                if (!product.sizes.includes(size)) {
                    return res.status(400).json({
                        success: false,
                        message: `Size ${size} is not available for ${product.name}`
                    });
                }

                const itemTotal = product.price * quantity;

                subtotal += itemTotal;

                orderItems.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                    quantity
                });
            }
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid products found in cart"
            });
        }

        // Calculate final amount on backend
        const amount = subtotal + DELIVERY_FEE;

        // Prepare order
        const orderData = {
            userId,
            items: orderItems,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            status: "Order Placed",
            date: Date.now()
        };

        // Save order in MongoDB
        const newOrder = new orderModel(orderData);

        await newOrder.save();

        // Clear user's cart after successful order creation
        userData.cartData = {};
        await userData.save();

        return res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order: newOrder
        });

    } catch (error) {
        console.log("Place Order Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= PLACE ORDER USING STRIPE =================

const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({ success: false, message: "User ID and address are required" })
        }

        // Find logged-in user or not
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User Not Found!!" })
        }

        // get card from database
        const cartData = userData.cartData || {};
        if (Object.keys(cartData).length === 0) {
            return res.status(400).json({ success: false, message: "Your cart is empty!!" })
        }

        const orderItems = [];
        let subtotal = 0;

        // Get trusted product prices from MongoDB
        for (const productId of Object.keys(cartData)) {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" })
            }


            const sizes = cartData[productId];
            for (const size of Object.keys(sizes)) {
                const quantity = Number(sizes[size]);

                if (!Number.isInteger(quantity) || quantity <= 0) {
                    return res.status(400).json({ success: false, message: "Invalid product quantity!!" })
                }

                if (!product.sizes.includes(size)) {
                    return res.status(400).json({ success: false, message: `Size ${size} is not available` })
                }

                subtotal += product.price * quantity;
                orderItems.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                    quantity
                });
            }
        }


        if (orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid products in cart"
            });
        }


        // Calculate amount on backend
        const amount = Number((subtotal + DELIVERY_FEE).toFixed(2));


        // Save pending order
        const newOrderList = new orderModel({
            userId,
            items: orderItems,
            amount,
            address,
            paymentMethod: "STRIPE",
            payment: false,
            status: "Payment Pending",
            date: Date.now()
        });

        await newOrderList.save();

        // Create Stripe line items
        const line_items = orderItems.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: `${item.name} (Size: ${item.size})`
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(DELIVERY_FEE * 100)
            },
            quantity: 1
        });

        const frontendUrl =
            req.headers.origin ||
            process.env.FRONTEND_URL ||
            "http://localhost:5173";


        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrderList._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrderList._id}`,
            metadata: {
                orderId: newOrderList._id.toString(),
                userId: userId.toString()
            }
        });


        return res.status(200).json({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.log("Stripe Order Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= PLACE ORDER USING RAZORPAY =================
const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { address } = req.body;

        console.log("Razorpay Controller User ID:", userId);

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: true, message: "User not found" })
        }

        const cartData = userData.cartData;

        let orderItems = [];
        let subtotal = 0;

        for (const productId of Object.keys(cartData)) {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.json({ success: false, message: "Product not found" })
            }

            const sizes = cartData[productId];
            for (const size of Object.keys(sizes)) {
                const quantity = Number(sizes[size]);

                if (!Number.isInteger(quantity) || quantity <= 0) {
                    return res.status(400).json({ success: false, message: "Invalid product quantity!!" })
                }

                subtotal += product.price * quantity;
                orderItems.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                    quantity
                });
            }
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid products in cart"
            });
        }

        const deliveryFee = 10;
        const amount = subtotal + deliveryFee;

        const orderData = {
            userId,
            items: orderItems,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            status: "Payment Pending",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: Math.round(amount * 100),
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        const razorpayOrder = await razorpayInstance.orders.create(options);
        
        // save Razorpay order ID in our MongoDB order
        newOrder.razorpayOrderId = razorpayOrder.id;
        await newOrder.save();
        return res.json({success : true, order : razorpayOrder})
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error })
    }
};


// verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true }); //check orderId and payment wil be true
            await userModel.findByIdAndUpdate(userId, { cartData: {} }); // clear cardData
            res.json({ success: true });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= VERIFY RAZORPAY PAYMENT =================

const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !userId ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification details are missing"
            });
        }

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Razorpay secret key is not configured"
            });
        }

        // Find the user's pending order
        const order = await orderModel.findOne({
            userId,
            razorpayOrderId: razorpay_order_id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${order.razorpayOrderId}|${razorpay_payment_id}`)
            .digest("hex");

        const generatedBuffer = Buffer.from(generatedSignature, "hex");
        const receivedBuffer = Buffer.from(razorpay_signature, "hex");

        if (
            generatedBuffer.length !== receivedBuffer.length ||
            !crypto.timingSafeEqual(generatedBuffer, receivedBuffer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        // Fetch actual payment details from Razorpay
        const paymentDetails = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        // Check payment amount, currency and status
        if (
            paymentDetails.order_id !== order.razorpayOrderId ||
            paymentDetails.status !== "captured" ||
            paymentDetails.amount !== Math.round(order.amount * 100) ||
            paymentDetails.currency !== "INR"
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment is not captured or payment details do not match"
            });
        }

        // Prevent duplicate payment processing
        if (order.payment) {
            if (order.razorpayPaymentId !== razorpay_payment_id) {
                return res.status(400).json({
                    success: false,
                    message: "This order has already been paid"
                });
            }
        }else{
            // Update order after successful verification
            order.payment = true;
            order.status = "Order Placed";
            order.razorpayPaymentId = razorpay_payment_id;

            await order.save();
        }

        
        // Clear cart after successful payment
        const userData = await userModel.findById(userId);

        if (userData) {
            const cartData = userData.cartData || {};
            for (const item of order.items) {
                const productId = item._id.toString();
                const size = item.size;
                const quantity = Number(item.quantity);

                if (cartData[productId]?.[size] !== undefined) {
                    cartData[productId][size] -= quantity;

                    if (cartData[productId][size] <= 0) {
                        delete cartData[productId][size];
                    }

                    if (Object.keys(cartData[productId]).length === 0) {
                        delete cartData[productId];
                    }
                }
            }

            userData.cartData = cartData;
            userData.markModified("cartData");
            await userData.save();

            return res.status(200).json({
            success: true,
            message: "Payment verified and order placed successfully"
        });

    }}catch(error)
    {
        return res.json(500).json({success : false, message : error.message})
    }
};



// ================= GET ALL ORDERS FOR ADMIN =================

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .sort({ date: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.log("All Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET USER ORDERS =================

const userOrders = async (req, res) => {
    try {
        // userId is added by authUser middleware
        const userId = req.userId;

        console.log("Fetching orders for user:", userId);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User ID missing"
            });
        }


        const orders = await orderModel
            .find({ userId })
            .sort({ date: -1 });

        console.log("Orders found:", orders.length);

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.log("User Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE ORDER STATUS =================

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        res.json({ success: false, message: error.message.error })
    }
};


export {
    placeOrderRazorpay,
    placeOrderStripe,
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
    verifyRazorpay
};
