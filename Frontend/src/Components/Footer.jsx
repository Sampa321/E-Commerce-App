
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaGithub,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt
} from 'react-icons/fa';

export default function Footer() {

    return (
        <footer className="mt-20 border-t border-gray-200">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-20 py-14">

                {/* BRAND SECTION */}
                <div>

                    <Link to="/">
                        <img
                            src={assets.logo}
                            className="w-32 mb-6"
                            alt="Forever Logo"
                        />
                    </Link>

                    <p className="text-sm text-gray-500 leading-7 max-w-md">
                        Discover your perfect style with Forever. Explore our
                        collections, find your favourites, and enjoy a simple
                        and comfortable online shopping experience.
                    </p>

                    {/* SOCIAL LINKS */}
                    <div className="flex items-center gap-3 mt-7">

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f3ef] text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f3ef] text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f3ef] text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
                        >
                            <FaLinkedinIn />
                        </a>

                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f3ef] text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
                        >
                            <FaGithub />
                        </a>

                    </div>
                </div>

                {/* COMPANY LINKS */}
                <div>

                    <h3 className="text-sm font-semibold tracking-[2px] text-gray-900 mb-6">
                        COMPANY
                    </h3>

                    <ul className="flex flex-col gap-4 text-sm text-gray-500">

                        <li>
                            <Link to="/" className="hover:text-black transition-colors">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/collections" className="hover:text-black transition-colors">
                                Collections
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className="hover:text-black transition-colors">
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="hover:text-black transition-colors">
                                Contact Us
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* CONTACT SECTION */}
                <div>

                    <h3 className="text-sm font-semibold tracking-[2px] text-gray-900 mb-6">
                        GET IN TOUCH
                    </h3>

                    <ul className="flex flex-col gap-5 text-sm text-gray-500">

                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-gray-800 shrink-0" />
                            <span>+1-212-456-7890</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-800 shrink-0" />
                            <a
                                href="mailto:contact@foreveryou.com"
                                className="hover:text-black transition-colors"
                            >
                                contact@foreveryou.com
                            </a>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-gray-800 shrink-0" />
                            <span>Available Online Worldwide</span>
                        </li>

                    </ul>
                </div>

            </div>

            {/* BOTTOM COPYRIGHT */}
            <div className="border-t border-gray-200">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">

                    <p className="text-xs text-gray-500 text-center">
                        © 2026 Forever. All Rights Reserved.
                    </p>

                    <p className="text-xs text-gray-400">
                        Designed with care for your style.
                    </p>

                </div>

            </div>

        </footer>
    );
}
