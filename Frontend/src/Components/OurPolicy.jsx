
import React from 'react';
import { assets } from '../assets/assets';

const policies = [
    {
        image: assets.exchange_icon,
        title: 'Easy Exchange Policy',
        description: 'Hassle-free exchanges to make your shopping experience worry-free.',
        number: '01'
    },
    {
        image: assets.quality_icon,
        title: '7 Days Return Policy',
        description: 'Shop with confidence with our simple 7-day return policy.',
        number: '02'
    },
    {
        image: assets.support_img,
        title: 'Dedicated Customer Support',
        description: 'Our support team is here to help whenever you need assistance.',
        number: '03'
    }
];

export default function OurPolicy() {
    return (
        <section className="py-16 md:py-20">

            {/* SECTION HEADING */}
            <div className="text-center mb-12">
                <p className="text-xs tracking-[4px] text-[#987b5d] font-semibold mb-3">
                    SHOP WITH CONFIDENCE
                </p>

                <h2 className="text-2xl sm:text-3xl font-serif text-gray-900">
                    Why Shop With Us?
                </h2>

                <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto leading-6 px-4">
                    We believe great shopping is about more than products.
                    It's about trust, convenience, and care.
                </p>
            </div>

            {/* POLICY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {policies.map((policy) => (
                    <div
                        key={policy.number}
                        className="relative group bg-[#f8f7f4] border border-gray-100 rounded-2xl p-8 text-center overflow-hidden hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:border-[#d8c8b5] transition-all duration-500"
                    >

                        {/* NUMBER */}
                        <span className="absolute top-5 right-6 text-4xl font-serif text-gray-200 group-hover:text-[#e8dfd4] transition-colors">
                            {policy.number}
                        </span>

                        {/* ICON */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <img
                                src={policy.image}
                                className="w-10 h-10 object-contain"
                                alt=""
                            />
                        </div>

                        {/* CONTENT */}
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                            {policy.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-7 max-w-xs mx-auto">
                            {policy.description}
                        </p>

                        {/* BOTTOM DECORATION */}
                        <div className="w-10 h-[2px] bg-[#987b5d] mx-auto mt-6 group-hover:w-20 transition-all duration-500"></div>

                    </div>
                ))}

            </div>
        </section>
    );
}
