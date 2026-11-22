
import React from 'react';
import Hero from '../Components/Hero.jsx';
import LatestCollection from '../Components/LatestCollection.jsx';
import BestSeller from '../Components/BestSeller.jsx';
import OurPolicy from '../Components/OurPolicy.jsx';
import NewsLetterBox from '../assets/NewsLetterBox.jsx';

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
        </div>
    );
}
