import React, { useState, useEffect } from 'react';

import '../UserDashboard.css' 

const UserDashboard = ({ userId }) => {
  const [currentStay, setCurrentStay] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const stayRes = await fetch(`/api/user/${userId}/current-stay`);
        const historyRes = await fetch(`/api/user/${userId}/history`);
        
        const stayData = await stayRes.json();
        const historyData = await historyRes.json();

        setCurrentStay(stayData);
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching user   data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [userId]);

  if (loading) return <div className="flex h-screen items-center justify-center font-serif text-[#865D36]">Loading Experience...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#3E362E] font-sans">
      <header className="p-6 border-b border-[#AC8968]/20 flex justify-between items-center">
        <div>
          <h1 className="text-sm font-black uppercase tracking-[0.2em] text-[#865D36]">Kōzōwood Resident</h1>
          <p className="text-2xl font-serif font-bold">Welcome, {currentStay?.guestName || 'Guest'}</p>
        </div>
        <img src={currentStay?.avatar} className="w-12 h-12 rounded-full border-2 border-[#AC8968]" alt="Profile" />
      </header>

      <main className="p-6 max-w-5xl mx-auto space-y-10">
        
        {currentStay ? (
          <section>
            <h3 className="text-xs font-bold uppercase mb-4 opacity-60 tracking-widest">Active Booking</h3>
            <div className="bg-[#3E362E] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-4">
                  <span className="bg-[#865D36] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {currentStay.status}
                  </span>
                  <h2 className="text-4xl font-serif leading-tight">{currentStay.roomType}</h2>
                  <div className="flex gap-10 text-sm">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-40">Room</p>
                      <p className="text-[#AC8968] font-bold">{currentStay.roomNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-40">Check-out</p>
                      <p>{currentStay.checkOutDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                   <p className="text-[10px] uppercase font-bold text-[#865D36] mb-2">Digital Key & Access</p>
                   <p className="text-sm mb-4">WiFi: <span className="font-mono">{currentStay.wifi}</span></p>
                   <button className="w-full bg-white text-[#3E362E] py-2 rounded-lg font-bold text-xs hover:bg-[#865D36] hover:text-white transition-all">
                     View Invoice
                   </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="p-10 border-2 border-dashed border-[#AC8968]/30 rounded-3xl text-center text-[#A69080]">
            No active reservations found.
          </div>
        )}

        <section>
          <h3 className="text-xs font-bold uppercase mb-6 opacity-60 tracking-widest">Previous Stays</h3>
          <div className="grid gap-3">
            {history.length > 0 ? history.map((stay) => (
              <div key={stay.id} className="flex items-center justify-between p-5 bg-white border border-[#AC8968]/10 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="w-2 h-2 rounded-full bg-[#AC8968]"></div>
                  <div>
                    <p className="font-bold text-sm">{stay.roomType}</p>
                    <p className="text-xs text-[#A69080]">{stay.dateRange}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#865D36]">{stay.totalAmount}</p>
                  <p className="text-[9px] uppercase font-bold opacity-40">{stay.bookingId}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-[#A69080] italic">Your journey with us begins here.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;