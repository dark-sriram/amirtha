import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Booking = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/redirect');
    };

    return (
        <div className="hero-pattern selection:bg-[#865D36] selection:text-white min-h-screen flex items-center justify-center text-[#3E362E] w-full">
            <div className="container mx-auto px-6 max-h-screen flex flex-col items-center justify-center fade-in py-8">

                <div className="text-center mb-6">
                    <h1 className="text-4xl font-light tracking-tight mb-1">Reserve Your Stay</h1>
                    <p className="text-xs opacity-60 font-medium">Confirm your details to finalize your luxury experience at Amirtha.</p>
                </div>

                <div className="glass-card p-8 md:p-10 w-full max-w-[800px]">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Summary Bar */}
                        <div className="bg-[#3E362E]/5 rounded-2xl p-4 border border-[#3E362E]/10 flex justify-between items-center mb-6">
                            <div className="space-y-0.5">
                                <p className="text-[9px] uppercase tracking-[0.2em] opacity-50 font-bold">Experience</p>
                                <p className="text-sm font-semibold">Muda Reserve - Grand Suite</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[9px] uppercase tracking-[0.2em] opacity-50 font-bold">Stay Period</p>
                                <p className="text-sm font-semibold">Oct 12 - Oct 15, 2024</p>
                            </div>
                            <div className="text-right space-y-0.5">
                                <p className="text-[9px] uppercase tracking-[0.2em] opacity-50 font-bold">Total</p>
                                <p className="text-xl font-bold text-[#865D36]">$1,500.00</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <span className="label-text-custom">First Name</span>
                                <input type="text" placeholder="John" className="input custom-input w-full rounded-xl px-5" required />
                            </div>
                            <div className="form-control">
                                <span className="label-text-custom">Last Name</span>
                                <input type="text" placeholder="Doe" className="input custom-input w-full rounded-xl px-5" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <span className="label-text-custom">Email Address</span>
                            <input type="email" placeholder="john.doe@example.com" className="input custom-input w-full rounded-xl px-5" required />
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <input type="checkbox" className="checkbox checkbox-xs border-[#3E362E]/20 rounded-md checked:bg-[#3E362E] appearance-none border-2 w-5 h-5 flex items-center justify-center" required />
                            <span className="text-[10px] font-medium opacity-60">I agree to the Terms, Conditions and Privacy Policy</span>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="btn btn-custom w-full rounded-xl h-14 text-base font-bold">
                                Proceed to Payment
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
