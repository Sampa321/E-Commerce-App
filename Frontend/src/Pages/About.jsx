
import React from 'react';
import { assets } from '../assets/assets.js';
import Title from '../Components/Title.jsx';
import NewsLetterBox from '../assets/NewsLetterBox.jsx';

import {
    FaShippingFast,
    FaHeadset,
    FaHeart,
    FaBullseye,
    FaGem,
    FaCheckCircle,
    FaArrowRight,
    FaStar,
} from 'react-icons/fa';

const features = [
    {
        icon: FaGem,
        title: 'Premium Quality',
        description:
            'We carefully select products that combine quality, comfort, and style to give you the best shopping experience.',
        number: '01',
    },
    {
        icon: FaShippingFast,
        title: 'Easy Shopping',
        description:
            'Explore your favourite collections, place orders easily, and enjoy a smooth shopping experience.',
        number: '02',
    },
    {
        icon: FaHeadset,
        title: 'Customer First',
        description:
            'Your satisfaction matters to us. Our team is always ready to assist you whenever you need help.',
        number: '03',
    },
];

const stats = [
    { number: '100%', label: 'Customer Focused' },
    { number: '24/7', label: 'Online Shopping' },
    { number: '100%', label: 'Quality Commitment' },
];

export default function About() {
    return (
        <div className="overflow-hidden bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="pt-10 md:pt-16 pb-16 md:pb-24">

                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block text-xs tracking-[4px] uppercase text-gray-500 mb-4">
                        Discover Forever
                    </span>

                    <Title text1="ABOUT" text2="US" />

                    <p className="max-w-xl mx-auto mt-4 px-4 text-sm md:text-base text-gray-500 leading-7">
                        More than just shopping — a place where quality,
                        convenience, and personal style come together.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* HERO IMAGE */}
                    <div className="relative group">
                        <div className="absolute -inset-3 bg-gray-100 rounded-3xl blur-xl opacity-80"></div>

                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={assets.about_img}
                                alt="Discover the Forever shopping experience"
                                className="w-full h-[350px] sm:h-[450px] lg:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            <div className="absolute bottom-7 left-7 text-white">
                                <p className="text-xs uppercase tracking-[3px] mb-2 text-gray-200">
                                    Welcome to
                                </p>
                                <h2 className="text-4xl md:text-5xl font-semibold tracking-wide">
                                    FOREVER.
                                </h2>
                                <p className="text-sm text-gray-200 mt-2">
                                    Your style. Your choice.
                                </p>
                            </div>
                        </div>

                        {/* FLOATING LABEL */}
                        <div className="absolute -right-3 md:-right-6 top-10 bg-white shadow-xl rounded-xl p-4 md:p-5 border border-gray-100">
                            <FaStar className="text-yellow-500 text-xl mb-2" />
                            <p className="text-sm font-semibold">Style with confidence</p>
                            <p className="text-xs text-gray-500 mt-1">Made for everyone</p>
                        </div>
                    </div>

                    {/* HERO CONTENT */}
                    <div className="flex flex-col gap-7">

                        <div>
                            <span className="text-xs font-semibold tracking-[4px] uppercase text-gray-400">
                                Who We Are
                            </span>

                            <h2 className="text-3xl md:text-5xl font-medium leading-tight mt-4">
                                A Better Way
                                <br />
                                To <span className="text-gray-400">Shop Online.</span>
                            </h2>
                        </div>

                        <p className="text-gray-600 text-sm md:text-base leading-8">
                            Forever was created with a simple idea: make online
                            shopping convenient, enjoyable, and accessible.
                            We believe finding the right products should be an
                            experience you look forward to.
                        </p>

                        <p className="text-gray-600 text-sm md:text-base leading-8">
                            From everyday essentials to products that express
                            your personal style, we aim to bring together a
                            collection that suits different needs and preferences.
                        </p>

                        {/* CHECK LIST */}
                        <div className="flex flex-col gap-4 mt-1">
                            {[
                                'Carefully selected products',
                                'Simple and convenient ordering',
                                'Customer-focused shopping experience',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <FaCheckCircle className="text-gray-900 shrink-0" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* MISSION */}
                        <div className="mt-3 border-l-2 border-gray-900 pl-6 py-2">
                            <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-2">
                                Our Mission
                            </p>
                            <p className="text-lg md:text-xl font-medium leading-8">
                                To make every shopping experience simple,
                                reliable, and memorable.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= STATS SECTION ================= */}
            <section className="py-12 md:py-16 border-y border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <h3 className="text-3xl md:text-4xl font-semibold tracking-wide">
                                {item.number}
                            </h3>

                            <p className="text-xs md:text-sm text-gray-500 mt-3 tracking-wide">
                                {item.label}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

            {/* ================= WHY CHOOSE US ================= */}
            <section className="py-20 md:py-24">

                <div className="text-center mb-14">
                    <span className="text-xs uppercase tracking-[4px] text-gray-400">
                        The Forever Difference
                    </span>

                    <Title text1="WHY" text2="CHOOSE US" />

                    <p className="max-w-lg mx-auto text-sm text-gray-500 mt-4 leading-7 px-4">
                        We believe great shopping is about more than products.
                        It is about the complete experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.number}
                                className="group relative bg-[#f8f8f6] rounded-2xl p-8 md:p-9 border border-gray-100 hover:bg-gray-900 hover:text-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="flex justify-between items-center mb-9">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm group-hover:bg-white/10 group-hover:text-white transition duration-300">
                                        <Icon className="text-2xl" />
                                    </div>

                                    <span className="text-sm text-gray-300 group-hover:text-gray-500">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-7 group-hover:text-gray-300 transition-colors duration-300">
                                    {feature.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 group-hover:text-white">
                                    <span>Our commitment</span>
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>

            {/* ================= OUR PROMISE ================= */}
            <section className="mb-20">
                <div className="relative overflow-hidden rounded-3xl bg-[#171717] px-6 py-16 md:px-16 md:py-24 text-center">

                    {/* DECORATIVE CIRCLES */}
                    <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full border border-white/10"></div>
                    <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full border border-white/10"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">

                        <div className="w-16 h-16 mx-auto mb-7 rounded-full bg-white/10 flex items-center justify-center">
                            <FaBullseye className="text-2xl text-white" />
                        </div>

                        <span className="text-xs uppercase tracking-[4px] text-gray-400">
                            Our Commitment
                        </span>

                        <h2 className="text-3xl md:text-5xl font-medium text-white mt-5 mb-7 leading-tight">
                            Shopping That Puts
                            <span className="block text-gray-400 mt-2">
                                You First.
                            </span>
                        </h2>

                        <p className="text-sm md:text-base text-gray-400 leading-8 max-w-2xl mx-auto">
                            At Forever, we want every visit to feel worthwhile.
                            From discovering your favourite products to placing
                            your order, we are committed to creating a shopping
                            experience built around convenience, quality, and trust.
                        </p>

                        <div className="mt-9 flex justify-center items-center gap-3 text-white">
                            <FaHeart className="text-red-400" />
                            <span className="text-sm tracking-wide">
                                Shopping made with care.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= NEWSLETTER ================= */}
            <section className="pb-10">
                <NewsLetterBox />
            </section>

        </div>
    );
}
