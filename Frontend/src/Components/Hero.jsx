
import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#f5f3ef] rounded-sm">

            <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[480px] lg:min-h-[560px]">

                {/* LEFT CONTENT */}
                <div className="flex items-center justify-center px-7 py-14 sm:px-10 lg:px-16 xl:px-20 order-2 sm:order-1">

                    <div className="max-w-lg">

                        {/* LABEL */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-[2px] bg-[#9b8065]"></span>
                            <p className="text-xs sm:text-sm tracking-[4px] font-semibold text-[#8b735b]">
                                OUR BESTSELLERS
                            </p>
                        </div>

                        {/* HEADING */}
                        <h1 className="text-4xl sm:text-4xl lg:text-6xl xl:text-7xl font-serif leading-[1.15] text-[#25221f]">
                            Discover Your
                            <br />
                            <span className="italic text-[#987b5d]">
                                Perfect Style
                            </span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-sm sm:text-base leading-7 mt-6 max-w-md">
                            Explore our latest collection of fashion essentials.
                            Find your style, express yourself, and make every
                            moment special.
                        </p>

                        {/* BUTTON */}
                        <div className="mt-8">
                            <Link
                                to="/collections"
                                className="inline-flex items-center gap-4 bg-[#25221f] text-white px-8 py-4 text-sm tracking-widest hover:bg-[#987b5d] transition-all duration-300 group"
                            >
                                SHOP NOW

                                <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* SMALL TEXT */}
                        <p className="text-xs text-gray-500 mt-7 tracking-wide">
                            STYLE • COMFORT • CONFIDENCE
                        </p>

                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative min-h-[300px] sm:min-h-full order-1 sm:order-2 overflow-hidden">

                    <img
                        src={assets.hero_img}
                        alt="Discover our latest fashion collection"
                        className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    />

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

                </div>

            </div>
        </section>
    );
}
