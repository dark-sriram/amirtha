import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Payment = () => {
    const [method, setMethod] = useState('upi');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Payment Successful! Thank you for booking with Amirtha. This is a demo.');
        navigate('/redirect');
    };

    return (
        <div className="hero-pattern selection:bg-[#865D36] selection:text-white pb-20 flex flex-col justify-center items-center min-h-screen p-4 w-full">
            {/* Payment Container */}
            <div className="glass-card w-full max-w-4xl rounded-[2.5rem] p-8 md:p-12 fade-in relative overflow-hidden flex flex-col md:flex-row gap-10">
                {/* Left: Payment Form */}
                <div className="flex-1 w-full z-10">
                    <h1 className="text-4xl font-light mb-2">Secure Checkout</h1>
                    <p className="opacity-80 mb-8">Complete your booking with a secure payment.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* UPI */}
                            <div className="border border-[#3E362E]/20 rounded-xl overflow-hidden hover:border-[#865D36] transition-colors">
                                <label className="cursor-pointer label p-4 flex justify-start gap-4 bg-[#A69080]/10">
                                    <input type="radio" name="payment_method"
                                        className="radio radio-sm border-[#3E362E] checked:bg-[#865D36] checked:border-[#865D36]"
                                        checked={method === 'upi'}
                                        onChange={() => setMethod('upi')} />
                                    <span className="label-text font-medium text-[#3E362E] flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        UPI (GPay, PhonePe, Paytm, etc.)
                                    </span>
                                </label>
                                {method === 'upi' && (
                                    <div className="p-4 pt-0 bg-[#A69080]/5">
                                        <div className="form-control w-full mt-2">
                                            <label className="label">
                                                <span className="label-text text-[#3E362E] text-xs font-semibold uppercase tracking-wider">Enter your UPI ID</span>
                                            </label>
                                            <input type="text" placeholder="example@ybl" className="input custom-input w-full rounded-xl" required />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cards */}
                            <div className="border border-[#3E362E]/20 rounded-xl overflow-hidden hover:border-[#865D36] transition-colors">
                                <label className="cursor-pointer label p-4 flex justify-start gap-4 bg-[#A69080]/10">
                                    <input type="radio" name="payment_method"
                                        className="radio radio-sm border-[#3E362E] checked:bg-[#865D36] checked:border-[#865D36]"
                                        checked={method === 'card'}
                                        onChange={() => setMethod('card')} />
                                    <span className="label-text font-medium text-[#3E362E] flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Credit / Debit Card
                                    </span>
                                </label>
                                {method === 'card' && (
                                    <div className="p-4 pt-0 bg-[#A69080]/5">
                                        <div className="form-control w-full mt-2">
                                            <input type="text" placeholder="Cardholder Name" className="input custom-input w-full rounded-xl mb-3" required />
                                            <div className="relative mb-3">
                                                <input type="text" placeholder="Card Number (0000 0000 0000 0000)" maxLength="19"
                                                    className="input custom-input w-full rounded-xl pl-12" required />
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 opacity-50" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input type="text" placeholder="MM/YY" maxLength="5" className="input custom-input w-full rounded-xl" required />
                                                <input type="password" placeholder="CVV" maxLength="3" className="input custom-input w-full rounded-xl" required />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Net Banking */}
                            <div className="border border-[#3E362E]/20 rounded-xl overflow-hidden hover:border-[#865D36] transition-colors">
                                <label className="cursor-pointer label p-4 flex justify-start gap-4 bg-[#A69080]/10">
                                    <input type="radio" name="payment_method"
                                        className="radio radio-sm border-[#3E362E] checked:bg-[#865D36] checked:border-[#865D36]"
                                        checked={method === 'netbanking'}
                                        onChange={() => setMethod('netbanking')} />
                                    <span className="label-text font-medium text-[#3E362E] flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Net Banking
                                    </span>
                                </label>
                                {method === 'netbanking' && (
                                    <div className="p-4 pt-0 bg-[#A69080]/5">
                                        <div className="form-control w-full mt-2">
                                            <select className="select custom-input w-full rounded-xl cursor-pointer" defaultValue="" required>
                                                <option disabled value="">Select your Bank</option>
                                                <option value="sbi">State Bank of India (SBI)</option>
                                                <option value="hdfc">HDFC Bank</option>
                                                <option value="icici">ICICI Bank</option>
                                                <option value="axis">Axis Bank</option>
                                                <option value="kotak">Kotak Mahindra Bank</option>
                                                <option value="pnb">Punjab National Bank (PNB)</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="divider border-[#3E362E]/20 mt-8 mb-6"></div>

                        <button type="submit" className="btn btn-custom w-full rounded-xl h-14 text-lg flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                            </svg>
                            Pay $1,500.00
                        </button>
                    </form>

                    <p className="text-xs text-center opacity-60 mt-6 flex justify-center items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                        AES-256 Bit Encryption
                    </p>
                </div>

                {/* Right: Summary & Trust Badges */}
                <div className="flex-1 w-full bg-[#f7ede2]/40 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-[#3E362E]/5">
                    <div>
                        <h3 className="text-xl font-medium mb-4 flex justify-between items-center">
                            Purchase Summary
                            <span className="text-sm cursor-pointer opacity-70 hover:opacity-100 underline">Edit</span>
                        </h3>

                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Muda Reserve - Grand Suite</p>
                                    <p className="text-sm opacity-70">3 Nights, 2 Adults</p>
                                </div>
                                <p className="font-semibold">$1,350.00</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xl border-t border-[#3E362E]/20 pt-4 font-semibold">
                            <p>Total Due</p>
                            <p>$1,500.00</p>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 bg-[#3E362E]/5 p-6 rounded-2xl border border-[#3E362E]/10 flex flex-col items-center justify-center text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#865D36] mb-3 opacity-80" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h4 className="font-medium text-[#3E362E] mb-2">100% Secure Payments</h4>
                        <p className="text-xs opacity-70 mb-4">
                            We support all major Indian payment methods. Your details are encrypted using AES-256 bit banking-grade security.
                        </p>
                        <div className="flex gap-2 items-center justify-center opacity-70 flex-wrap">
                            <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-[#3E362E]/10 rounded border border-[#3E362E]/20">UPI</span>
                            <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-[#3E362E]/10 rounded border border-[#3E362E]/20">RuPay</span>
                            <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-[#3E362E]/10 rounded border border-[#3E362E]/20">VISA</span>
                            <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-[#3E362E]/10 rounded border border-[#3E362E]/20">Mastercard</span>
                            <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-[#3E362E]/10 rounded border border-[#3E362E]/20">NetBanking</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back button */}
            <Link to="/redirect" className="mt-8 flex items-center gap-2 text-[#3E362E] hover:text-[#865D36] transition-colors font-medium relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go back to booking
            </Link>
        </div>
    );
};

export default Payment;
