
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create token
export function createToken(id) {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );
}

// ================= REGISTER USER =================

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required."
            });
        }

        // Check existing user
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists."
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email."
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password (minimum 8 characters)."
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id);

        return res.json({
            success: true,
            message: "Account created successfully.",
            token
        });

    } catch (error) {
        console.log("Register Error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
}

// ================= LOGIN USER =================

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        console.log("Login email:", email);
        console.log("Database name:", userModel.db.name);

        const user = await userModel.findOne({ email });

        console.log("User found:", user ? "YES" : "NO");

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist. Please create an account."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password matched:", isMatch);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
}




// ================= ADMIN LOGIN =================

export async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { email, role: "admin" },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            );

            return res.json({
                success: true,
                token
            });
        }

        return res.json({
            success: false,
            message: "Invalid credentials."
        });

    } catch (error) {
        console.log("Admin Login Error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
}
