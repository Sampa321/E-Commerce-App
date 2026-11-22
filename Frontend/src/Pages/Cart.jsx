import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';

export default function Cart() {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Get only products that the user added to cart
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size]
            });
          }
        }
      }

      setCartData(tempData);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (productId, size, value) => {
    if (value === '') return;

    const quantity = Number(value);

    if (quantity >= 1) {
      updateQuantity(productId, size, quantity);
    }
  };

  return (
    <div className="border-t pt-14">

      {/* Heading */}
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Empty Cart */}
      {cartData.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-5">🛒</div>

          <h2 className="text-xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => navigate('/collection')}
            className="mt-7 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          {/* Cart Products */}
          <div>
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >

                  {/* Product Information */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image?.[0]}
                      alt={productData.name}
                    />

                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {productData.name}
                      </p>

                      <div className="flex items-center gap-4 mt-2">
                        <p>
                          {currency}{productData.price}
                        </p>

                        <p className="px-2 sm:px-3 py-1 border bg-slate-50 text-sm">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item._id,
                        item.size,
                        e.target.value
                      )
                    }
                    className="border max-w-14 sm:max-w-20 px-2 py-1 outline-none"
                  />

                  {/* Remove Product */}
                  <img
                    onClick={() =>
                      updateQuantity(item._id, item.size, 0)
                    }
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Remove item"
                  />

                </div>
              );
            })}
          </div>

          {/* Cart Total and Checkout */}
          <div className="flex justify-end my-16">
            <div className="w-full sm:w-[450px]">

              <CartTotal />

              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}