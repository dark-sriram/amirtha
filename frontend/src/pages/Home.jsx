import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans w-full">
            {/* Top Navbar */}
            <div className="bg-white flex justify-between items-center px-4 md:px-8 py-3 border-b border-[#3E362E]/10">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-widest text-[#3E362E]">AMIRTHA</h1>
                </div>

                <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-[#3E362E]">
                    <Link to="/redirect" className="cursor-pointer hover:text-[#865D36]">LOGIN</Link>
                    <Link to="/redirect"
                        className="bg-[#93785B] hover:bg-[#3E362E] text-white px-6 py-3 rounded-sm transition-colors text-center inline-block">
                        CREATE AN ACCOUNT
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero-bg relative w-full h-[600px] flex flex-col items-center justify-center">
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Main Title */}
                <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl text-[#f7ede2] font-bold tracking-widest mb-28 text-center drop-shadow-xl uppercase px-4">
                    MODERNIZING LUXURY TRAVEL
                </h2>

                {/* Search Widget Overlapping Bottom */}
                <div className="absolute -bottom-10 w-full max-w-5xl px-4 z-20">
                    <div className="bg-white rounded flex flex-col md:flex-row search-widget divide-y md:divide-y-0 md:divide-[#3E362E]/10 border border-[#3E362E]/10">
                        {/* Where To */}
                        <div className="p-5 flex-1 cursor-text hover:bg-[#AC8968]/20 transition-colors">
                            <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">WHERE TO</div>
                            <input type="text" placeholder="Search Cities or Hotels"
                                className="w-full font-semibold text-gray-800 text-sm bg-transparent placeholder-[#3E362E]/50 focus:outline-none" />
                        </div>

                        {/* When */}
                        <div className="p-5 flex-1 cursor-pointer hover:bg-[#AC8968]/20 transition-colors">
                            <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">WHEN</div>
                            <div className="w-full font-semibold text-gray-800 text-sm">Check In - Check Out</div>
                        </div>

                        {/* Guests */}
                        <div className="p-5 flex-1 cursor-pointer hover:bg-[#AC8968]/20 transition-colors">
                            <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">GUESTS</div>
                            <div className="font-semibold text-gray-800 text-sm">2 People</div>
                        </div>

                        {/* Rooms */}
                        <div className="p-5 flex-1 cursor-pointer hover:bg-[#AC8968]/20 transition-colors">
                            <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">ROOMS</div>
                            <div className="font-semibold text-gray-800 text-sm">1 Room</div>
                        </div>

                        {/* Search Button */}
                        <div className="p-3 flex items-center md:w-56 bg-white">
                            <Link to="/redirect"
                                className="btn-olive w-full h-full rounded-sm text-sm font-bold tracking-wider flex items-center justify-center gap-3 py-4">
                                SEARCH
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
