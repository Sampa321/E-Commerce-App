
import React, { useContext } from 'react';
import Title from './Title';
import ProductsItems from './ProductsItems.jsx';
import { ShopContext } from '../Context/ShopContext.jsx';

export default function BestSeller() {

    const { products } = useContext(ShopContext);

    // Get only bestseller products
    const bestseller = products
        .filter((item) => item.bestseller === true)
        .slice(0, 5);

    return (
        <section className="my-20">

            {/* SECTION HEADING */}
            <div className="text-center mb-12">

                <Title text1="BEST" text2="SELLERS" />

                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mt-4 leading-7 px-4">
                    Discover the products our customers love most.
                    Explore popular styles selected just for you.
                </p>

            </div>

            {/* PRODUCT GRID */}
            {bestseller.length > 0 ? (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-10">

                    {bestseller.map((item) => (

                        <div
                            key={item._id}
                            className="group relative"
                        >

                            <div className="overflow-hidden rounded-xl bg-[#f7f7f7]">

                                <ProductsItems
                                    id={item._id}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 font-medium">
                        No bestseller products available yet.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Check back soon for our popular collections.
                    </p>
                </div>

            )}

        </section>
    );
}
