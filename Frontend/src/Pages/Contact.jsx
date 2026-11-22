
import React from 'react';
import Title from '../Components/Title.jsx';
import { assets } from '../assets/assets.js';
import NewsLetterBox from '../assets/NewsLetterBox.jsx';

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaBriefcase,
    FaClock,
    FaArrowRight,
    FaHeadset,
} from 'react-icons/fa';

export default function Contact() {
    return (
        <div className="overflow-hidden bg-white text-gray-900">

            {/* ================= HERO ================= */}
            <section className="pt-10 md:pt-16 pb-12">

                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[4px] text-gray-400">
                        We'd Love To Hear From You
                    </span>

                    <div className="mt-3">
                        <Title text1="CONTACT" text2="US" />
                    </div>

                    <p className="max-w-xl mx-auto mt-4 px-4 text-sm md:text-base text-gray-500 leading-7">
                        Have a question, need assistance, or simply want to
                        connect? We're here to help make your shopping experience better.
                    </p>
                </div>

                {/* ================= IMAGE + DETAILS ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* IMAGE */}
                    <div className="relative group">
                        <div className="absolute -inset-3 bg-gray-100 rounded-3xl blur-xl opacity-70"></div>

                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={assets.contact_img}
                                alt="Forever customer support"
                                className="w-full h-[350px] sm:h-[450px] lg:h-[510px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            <div className="absolute bottom-7 left-7 text-white">
                                <p className="text-xs uppercase tracking-[3px] text-gray-300 mb-2">
                                    Forever Support
                                </p>

                                <h2 className="text-3xl md:text-4xl font-semibold">
                                    We're Here
                                    <br />
                                    For You.
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* CONTACT DETAILS */}
                    <div className="flex flex-col gap-8">

                        <div>
                            <span className="text-xs uppercase tracking-[3px] text-gray-400">
                                Get In Touch
                            </span>

                            <h2 className="text-3xl md:text-4xl font-medium mt-3 leading-tight">
                                Let's Start a
                                <span className="text-gray-400"> Conversation.</span>
                            </h2>

                            <p className="text-sm text-gray-500 leading-7 mt-4">
                                Whether you have questions about an order,
                                products, or our services, feel free to reach out.
                            </p>
                        </div>

                        {/* STORE ADDRESS */}
                        <div className="flex gap-5 p-5 md:p-6 rounded-2xl bg-[#f8f8f6] border border-gray-100 hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <FaMapMarkerAlt className="text-xl text-gray-800" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-base mb-2">
                                    Our Store
                                </h3>

                                <p className="text-sm text-gray-500 leading-7">
                                    54709 Willms Station
                                    <br />
                                    Suite 350, Washington, USA
                                </p>
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="flex gap-5 p-5 md:p-6 rounded-2xl bg-[#f8f8f6] border border-gray-100 hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <FaPhoneAlt className="text-lg text-gray-800" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-base mb-2">
                                    Phone & Email
                                </h3>

                                <p className="text-sm text-gray-500 leading-7">
                                    Tel: (415) 555-0132
                                    <br />
                                    Email: admin@forever.com
                                </p>
                            </div>
                        </div>

                        {/* BUSINESS HOURS */}
                        <div className="flex gap-5 p-5 md:p-6 rounded-2xl bg-[#f8f8f6] border border-gray-100 hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <FaClock className="text-xl text-gray-800" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-base mb-2">
                                    Customer Support
                                </h3>

                                <p className="text-sm text-gray-500 leading-7">
                                    We're happy to help with your shopping queries.
                                    <br />
                                    Contact us by email or phone.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= CAREERS ================= */}
            <section className="py-16 md:py-20 mb-16">
                <div className="relative overflow-hidden bg-[#171717] rounded-3xl px-7 py-12 md:px-16 md:py-16">

                    <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full border border-white/10"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full border border-white/10"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

                        <div className="max-w-xl text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
                                <FaBriefcase className="text-gray-300 text-xl" />

                                <span className="text-xs uppercase tracking-[3px] text-gray-400">
                                    Join Our Team
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                                Build Your Future
                                <span className="block text-gray-400 mt-2">
                                    With Forever.
                                </span>
                            </h2>

                            <p className="text-sm text-gray-400 leading-7 mt-5">
                                Interested in being part of our journey?
                                Explore opportunities and discover how you can
                                grow with our team.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <FaHeadset className="text-2xl text-white" />
                            </div>

                            <button
                                type="button"
                                onClick={() => window.location.href = 'mailto:admin@forever.com'}
                                className="flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition duration-300"
                            >
                                Contact Us
                                <FaArrowRight />
                            </button>
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
