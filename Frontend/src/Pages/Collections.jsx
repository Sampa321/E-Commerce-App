
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import Title from '../Components/Title.jsx';
import ProductsItems from '../Components/ProductsItems.jsx';

import {
    FaFilter,
    FaChevronDown,
    FaChevronRight,
    FaTimes,
    FaSlidersH,
    FaShoppingBag,
} from 'react-icons/fa';

export default function Collections() {
    const { products, search, showSearch } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggleCategory = (e) => {
        const value = e.target.value;

        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;

        setSubCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const clearFilters = () => {
        setCategory([]);
        setSubCategory([]);
        setSortType('relavent');
    };

    // FILTER AND SORT PRODUCTS
    useEffect(() => {
        let productsCopy = [...products];

        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        switch (sortType) {
            case 'low-high':
                productsCopy.sort((a, b) => a.price - b.price);
                break;

            case 'high-low':
                productsCopy.sort((a, b) => b.price - a.price);
                break;

            default:
                break;
        }

        setFilterProducts(productsCopy);
    }, [products, search, showSearch, category, subCategory, sortType]);

    const activeFilterCount = category.length + subCategory.length;

    return (
        <div className="pt-10 pb-20">

            {/* ================= PAGE HEADER ================= */}
            <div className="mb-10 md:mb-14">
                <div className="text-center mb-5">
                    <span className="text-xs uppercase tracking-[4px] text-gray-400">
                        Explore Our Collection
                    </span>

                    <div className="mt-3">
                        <Title text1="ALL" text2="COLLECTIONS" />
                    </div>

                    <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-7 px-4">
                        Discover products that match your style.
                        Explore our latest collection and find your favourites.
                    </p>
                </div>

                <div className="w-16 h-[2px] bg-gray-900 mx-auto mt-7"></div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">

                {/* ================= FILTER SIDEBAR ================= */}
                <aside className="w-full sm:w-56 lg:w-64 shrink-0">

                    {/* FILTER HEADING */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">

                        <div className="flex items-center gap-3">
                            <FaSlidersH className="text-gray-700" />

                            <h3 className="text-sm font-semibold tracking-widest">
                                FILTERS
                            </h3>

                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="sm:hidden flex items-center gap-2 text-xs text-gray-600"
                        >
                            {showFilter ? 'CLOSE' : 'SHOW'}
                            {showFilter ? <FaTimes /> : <FaChevronDown />}
                        </button>

                    </div>

                    {/* FILTER CONTENT */}
                    <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>

                        {/* CATEGORY */}
                        <div className="py-6 border-b border-gray-200">

                            <h4 className="text-xs font-semibold tracking-widest mb-5">
                                CATEGORY
                            </h4>

                            <div className="flex flex-col gap-4">
                                {['Men', 'Women', 'Kids'].map((item) => (
                                    <label
                                        key={item}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={category.includes(item)}
                                            onChange={toggleCategory}
                                            className="w-4 h-4 accent-black cursor-pointer"
                                        />

                                        <span className="text-sm text-gray-600 group-hover:text-black transition">
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* SUBCATEGORY */}
                        <div className="py-6 border-b border-gray-200">

                            <h4 className="text-xs font-semibold tracking-widest mb-5">
                                PRODUCT TYPE
                            </h4>

                            <div className="flex flex-col gap-4">
                                {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                                    <label
                                        key={item}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={subCategory.includes(item)}
                                            onChange={toggleSubCategory}
                                            className="w-4 h-4 accent-black cursor-pointer"
                                        />

                                        <span className="text-sm text-gray-600 group-hover:text-black transition">
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* CLEAR FILTERS */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="mt-6 text-xs font-semibold tracking-widest text-red-500 hover:text-red-700 transition"
                            >
                                CLEAR ALL FILTERS
                            </button>
                        )}
                    </div>
                </aside>

                {/* ================= PRODUCTS SECTION ================= */}
                <main className="flex-1 min-w-0">

                    {/* TOOLBAR */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7 pb-5 border-b border-gray-200">

                        <div>
                            <h2 className="text-lg md:text-xl font-medium">
                                Discover Products
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                Showing {filterProducts.length} of {products.length} products
                            </p>
                        </div>

                        {/* SORT */}
                        <div className="relative">
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="appearance-none w-full sm:w-auto min-w-[190px] border border-gray-300 rounded-lg bg-white text-gray-700 text-xs px-4 py-3 pr-10 outline-none focus:border-black cursor-pointer"
                            >
                                <option value="relavent">Sort: Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>

                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-500" />
                        </div>
                    </div>

                    {/* ACTIVE FILTERS */}
                    {(category.length > 0 || subCategory.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-6">

                            {[...category, ...subCategory].map((item) => (
                                <span
                                    key={item}
                                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full text-xs text-gray-700"
                                >
                                    {item}

                                    <button
                                        onClick={() => {
                                            if (category.includes(item)) {
                                                setCategory((prev) =>
                                                    prev.filter((value) => value !== item)
                                                );
                                            } else {
                                                setSubCategory((prev) =>
                                                    prev.filter((value) => value !== item)
                                                );
                                            }
                                        }}
                                        aria-label={`Remove ${item} filter`}
                                    >
                                        <FaTimes className="text-gray-500 hover:text-black" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* PRODUCT GRID */}
                    {filterProducts.length > 0 ? (

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-9">

                            {filterProducts.map((item) => (
                                <ProductsItems
                                    key={item._id}
                                    name={item.name}
                                    id={item._id}
                                    price={item.price}
                                    image={item.image}
                                />
                            ))}

                        </div>

                    ) : (

                        <div className="min-h-[350px] flex flex-col items-center justify-center text-center px-5">

                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                <FaShoppingBag className="text-3xl text-gray-400" />
                            </div>

                            <h3 className="text-xl font-medium text-gray-800">
                                No Products Found
                            </h3>

                            <p className="text-sm text-gray-500 mt-3 max-w-sm leading-7">
                                We couldn't find products matching your selection.
                                Try changing your filters or search keyword.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="mt-6 bg-gray-900 text-white px-7 py-3 text-xs tracking-widest hover:bg-gray-700 transition rounded-full"
                            >
                                CLEAR FILTERS
                            </button>

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
