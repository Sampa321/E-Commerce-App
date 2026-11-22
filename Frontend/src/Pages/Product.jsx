
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

import {
  FaStar,
  FaRegStar,
  FaShoppingBag,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheckCircle,
  FaHeart,
  FaMinus,
  FaPlus,
  FaArrowLeft,
} from 'react-icons/fa';

export default function Product() {
  const { productId } = useParams();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const product = products.find(
      (item) => item._id === productId
    );

    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || '');
      setSize('');
      setQuantity(1);
    } else {
      setProductData(null);
      setImage('');
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      alert('Please select a size before adding to cart.');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(productData._id, size);
    }
  };

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <FaShoppingBag className="text-5xl text-gray-300 mb-5" />

        <h2 className="text-2xl font-semibold text-gray-800">
          Product Not Found
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Sorry, this product is unavailable or does not exist.
        </p>

        <Link
          to="/collections"
          className="mt-6 bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition"
        >
          EXPLORE COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-6 sm:pt-10 pb-16">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          <FaArrowLeft className="text-xs" />
          Back to Collections
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* ================= PRODUCT IMAGES ================= */}

          <div className="flex flex-col-reverse sm:flex-row gap-4">

            {/* Thumbnail Images */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 sm:max-h-[600px]">

              {productData.image?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item)}
                  className={`flex-shrink-0 w-20 h-24 sm:w-20 sm:h-24 border-2 overflow-hidden transition ${
                    image === item
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={item}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 overflow-hidden group relative">

              <img
                src={image || productData.image?.[0]}
                alt={productData.name}
                className="w-full h-[420px] sm:h-[550px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {productData.bestseller && (
                <span className="absolute top-5 left-5 bg-black text-white text-[10px] tracking-widest px-4 py-2">
                  BESTSELLER
                </span>
              )}

            </div>

          </div>

          {/* ================= PRODUCT INFORMATION ================= */}

          <div className="flex flex-col pt-2">

            {/* Category */}
            <p className="text-xs text-gray-400 uppercase tracking-[0.25em]">
              {productData.category} / {productData.subCategory}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-4 leading-tight">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">

              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4].map((star) => (
                  <FaStar key={star} className="text-sm" />
                ))}
                <FaRegStar className="text-sm" />
              </div>

              <span className="text-sm text-gray-500">
                4.0 | 122 Reviews
              </span>

            </div>

            {/* Price */}
            <div className="mt-7 pb-6 border-b border-gray-200">

              <p className="text-3xl font-semibold text-gray-900">
                {currency}{productData.price}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Inclusive of all taxes
              </p>

            </div>

            {/* Description */}
            <div className="mt-6">

              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                Product Description
              </h3>

              <p className="text-sm text-gray-500 leading-7">
                {productData.description}
              </p>

            </div>

            {/* Size Selection */}
            <div className="mt-8">

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Select Size
                </h3>

                <button className="text-xs text-gray-500 underline hover:text-black">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3">

                {productData.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`min-w-12 h-12 px-4 border text-sm font-medium transition ${
                      size === item
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                    }`}
                  >
                    {item}
                  </button>
                ))}

              </div>

              {!size && (
                <p className="text-xs text-gray-400 mt-3">
                  Please select your preferred size.
                </p>
              )}

            </div>

            {/* Quantity */}
            <div className="mt-8">

              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Quantity
              </h3>

              <div className="inline-flex items-center border border-gray-300">

                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="text-xs" />
                </button>

                <span className="w-12 text-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="text-xs" />
                </button>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-9">

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-black text-white py-4 text-sm font-medium tracking-widest hover:bg-gray-800 transition active:scale-[0.98]"
              >
                <FaShoppingBag />
                ADD TO CART
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 border flex items-center justify-center transition ${
                  isWishlisted
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                }`}
                aria-label="Add to wishlist"
              >
                <FaHeart className={isWishlisted ? 'fill-current' : ''} />
              </button>

            </div>

            {/* Product Benefits */}
            <div className="mt-9 border-t border-gray-200 pt-6 space-y-5">

              <div className="flex items-center gap-4">
                <FaTruck className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Delivery options available at checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaUndo className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Check our return policy before ordering.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Secure Shopping</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your shopping experience matters to us.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaCheckCircle className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Quality Products</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Carefully selected products.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ================= DESCRIPTION SECTION ================= */}

        <div className="mt-24">

          <div className="flex border-b border-gray-200">

            <button className="px-6 py-4 text-sm font-semibold border-b-2 border-black">
              Description
            </button>

            <button className="px-6 py-4 text-sm text-gray-500">
              Reviews (122)
            </button>

          </div>

          <div className="border border-t-0 border-gray-200 p-6 sm:p-8">

            <h3 className="font-semibold text-gray-800 mb-3">
              About This Product
            </h3>

            <p className="text-sm text-gray-500 leading-7">
              {productData.description}
            </p>

            <p className="text-sm text-gray-500 leading-7 mt-4">
              Explore our collection and discover products designed to
              combine comfort, quality, and style. Select your preferred
              size and add this product to your cart for a convenient
              shopping experience.
            </p>

          </div>

        </div>

        {/* ================= RELATED PRODUCTS ================= */}

        <div className="mt-24">

          <RelatedProducts
            category={productData.category}
            subcategory={productData.subCategory}
          />

        </div>

      </div>

    </div>
  );
}
