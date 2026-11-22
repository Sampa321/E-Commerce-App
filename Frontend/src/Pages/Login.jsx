
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const [currentState, setCurrentState] = useState("Login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const { token, setToken, navigate, backendUrl } =
        useContext(ShopContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setAuthError("");

        try {
            setLoading(true);

            let response;

            if (currentState === "Sign Up") {
                response = await axios.post(
                    backendUrl + "/api/user/register",
                    { name, email, password }
                );
            } else {
                response = await axios.post(
                    backendUrl + "/api/user/login",
                    { email, password }
                );
            }

            if (response.data.success) {
                const userToken = response.data.token;

                if (!userToken) {
                    setAuthError(
                        "Authentication token was not returned by the server."
                    );
                    return;
                }

                setToken(userToken);
                localStorage.setItem("token", userToken);

                toast.success(
                    currentState === "Login"
                        ? "Login Successful!"
                        : "Account Created Successfully!"
                );

                navigate("/");
            } else {
                setAuthError(
                    response.data.message || "Authentication failed."
                );
            }
        } catch (error) {
            console.error("Authentication Error:", error);

            setAuthError(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">
                    {currentState}
                </p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {currentState === "Sign Up" && (
                <input
                    onChange={(e) => {
                        setName(e.target.value);
                        setAuthError("");
                    }}
                    value={name}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Name"
                    required
                />
            )}

            <input
                onChange={(e) => {
                    setEmail(e.target.value);
                    setAuthError("");
                }}
                value={email}
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                required
            />

            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError("");
                }}
                value={password}
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                required
            />

            {/* Authentication Error */}
            {authError && (
                <p className="w-full text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                    {authError}
                </p>
            )}

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">
                    Forgot your password
                </p>

                {currentState === "Login" ? (
                    <p
                        onClick={() => {
                            setCurrentState("Sign Up");
                            setAuthError("");
                        }}
                        className="cursor-pointer"
                    >
                        Create account
                    </p>
                ) : (
                    <p
                        onClick={() => {
                            setCurrentState("Login");
                            setAuthError("");
                        }}
                        className="cursor-pointer"
                    >
                        Login Here
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white font-light px-8 py-2 mt-4 disabled:opacity-50"
            >
                {loading
                    ? "PLEASE WAIT..."
                    : currentState === "Login"
                    ? "SIGN IN"
                    : "SIGN UP"}
            </button>
        </form>
    );
}
