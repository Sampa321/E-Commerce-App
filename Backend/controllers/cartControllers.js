import userModel from "../models/userModel.js";

// Add product to user cart
export async function addToCart(req, res) {
    try {
        const userId = req.userId;
        const {itemId, size } = req.body;

        if(!userId)
        {
            return res.status(401).json({
                success: false,
                message: "User ID missing. Please login again."
            });
        }

        if (!itemId || !size) {
            return res.json({
                success: false,
                message: "Product ID and size are required"
            });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = { ...userData.cartData };

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        userData.cartData = cartData;
        await userData.save();

        res.json({
            success: true,
            message: "Added To Cart",
            cartData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// Update user cart
export async function updateCart(req, res) {
    try {
        const userId = req.userId;
        const {itemId, size, quantity } = req.body;

        if(!userId)
        {
            return res.status(401).json({success : false, message : "Please login agail"})
        }

        if (!itemId || !size || quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart update details"
            });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = { ...userData.cartData };

        if (!cartData[itemId] || cartData[itemId][size] === undefined) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        // Delete product size when quantity is zero
        if (Number(quantity) === 0) {
            delete cartData[itemId][size];

            // Delete product if no sizes remain
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = Number(quantity);
        }

         // Save updated cart in MongoDB
        userData.cartData = cartData;
        userData.markModified("cartData");
        await userData.save();

        res.json({
            success: true,
            message: "Cart Updated Successfully!!",
            cartData : userData.cartData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// Get user cart data
export async function getUserCart(req, res) {
    try {
        const userId  = req.userId;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            cartData: userData.cartData || {}
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}