
import React, { useContext } from 'react';
import Title from './Title';
import ProductsItems from './ProductsItems';
import { ShopContext } from '../Context/ShopContext';

export default function LatestCollection() {
    const { products } = useContext(ShopContext);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />

                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover our latest collection of products.
                    Explore the newest styles and find your favourites.
                </p>
            </div>

            {/* Display all products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {products && products.length > 0 ? (
                    products.map((item) => (
                        <ProductsItems
                            key={item._id}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-500'>
                        No products available.
                    </p>
                )}
            </div>
        </div>
    );
}
