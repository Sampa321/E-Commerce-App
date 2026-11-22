
import React, { useState } from 'react';

export default function NewsLetterBox() {

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!email.trim()) return;

        setSubscribed(true);
        setEmail('');
    };

    return (
        <section className="my-16 md:my-24">

            <div className="relative overflow-hidden bg-[#f5f3ef] rounded-3xl px-6 py-14 sm:px-12 md:py-20 text-center">

                {/* BACKGROUND DECORATION */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#e8dfd4] rounded-full opacity-50 blur-3xl"></div>

                <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-[#e8dfd4] rounded-full opacity-50 blur-3xl"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-2xl mx-auto">

                    <p className="text-xs tracking-[4px] font-semibold text-[#987b5d] mb-4">
                        STAY IN TOUCH
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                        Subscribe Now &
                        <br />
                        Get <span className="italic text-[#987b5d]">20% Off</span>
                    </h2>

                    <p className="text-sm text-gray-500 mt-5 leading-7 max-w-lg mx-auto">
                        Be the first to discover new collections, exclusive offers,
                        and the latest fashion trends.
                    </p>

                    {/* EMAIL FORM */}
                    <form
                        onSubmit={onSubmitHandler}
                        className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto mt-9"
                    >

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setSubscribed(false);
                            }}
                            placeholder="Enter your email address"
                            required
                            className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-5 py-4 text-sm text-gray-800 outline-none focus:border-[#987b5d] transition-colors"
                        />

                        <button
                            type="submit"
                            className="bg-[#25221f] text-white px-8 py-4 rounded-lg text-xs font-semibold tracking-widest hover:bg-[#987b5d] transition-all duration-300"
                        >
                            SUBSCRIBE →
                        </button>

                    </form>

                    {/* SUCCESS MESSAGE */}
                    {subscribed && (
                        <p className="text-green-700 text-sm mt-5">
                            Thank you for subscribing!
                        </p>
                    )}

                    <p className="text-xs text-gray-400 mt-5">
                        No spam. Just style, updates, and exclusive offers.
                    </p>

                </div>
            </div>

        </section>
    );
}
