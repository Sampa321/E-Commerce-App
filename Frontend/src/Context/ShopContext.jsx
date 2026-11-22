
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export default function ShopContextProvider({ children }) {

    const currency = "$";
    const deliver_free = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    // Fetch all products
    const getProductsData = async () => {
        try {
            const response = await axios.get(
                backendUrl + "/api/product/list"
            );

            if (response.data.success) {
                setProducts(response.data.products);
                console.log("Products loaded:", response.data.products);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log("Product fetching error:", error);
            toast.error(error.message);
        }
    };

    // Fetch user's cart
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                { headers: { token: userToken } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }else {
            console.log("Cart fetching failed:", response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Initialize products and user data
    useEffect(() => {
        const initializeApp = async () =>{
           await getProductsData();
            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                setToken(savedToken);
                await getUserCart(savedToken);
            }
        }
        
        initializeApp();
    }, []);

    // Add to cart
    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select Product Size!");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
          console.log("Token:", token);
    console.log("Cart being updated:", cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, size },
                    { headers: { token } }
                );

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Get cart count
    const getCartCount = () => {

        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {

                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }

            }
        }

        return totalCount;
    };

    // Update cart quantity
    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) return;

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, size, quantity },
                    { headers: { token } }
                );

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Get total cart amount
    const getCartAmount = () => {

        let totalAmount = 0;

        for (const items in cartItems) {

            const itemInfo = products.find(
                (product) => product._id === items
            );

            if (!itemInfo) continue;

            for (const item in cartItems[items]) {

                const quantity = cartItems[items][item];

                if (quantity > 0) {
                    totalAmount += itemInfo.price * quantity;
                }

            }
        }

        return totalAmount;
    };


    // Save token after login
const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
};

// Logout user
const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
};

    // Context values
    const value = {
        products,
        currency,
        deliver_free,

        search,
        setSearch,
        showSearch,
        setShowSearch,

        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,

        navigate,
        backendUrl,
        setToken,
        token,
        saveToken,
        logout
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}
