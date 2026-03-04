import React, { useState, useEffect } from 'react';

// Theme Colors (Classic Sanctuary Palette - No 'Black')
const theme = {
  primary: '#865D36', // Golden Bronze
  secondary: '#93785B', // Tan
  accent: '#AC8968', // Sand
  soft: '#A69080', // Earth
  bg: '#FAF9F6', // Off White
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @description Fetching the 'Signed In' state data.
     * In a real application, this would fetch from your Database based on the auth session.
     */
    const fetchData = async () => {
      setLoading(true);

      // Simulate API latency for a premium feel
      await new Promise(resolve => setTimeout(resolve, 1200));

      // MOCK DATA: Populated to demonstrate the 'Full Design'
      setUser({
        name: 'Alexander Silva',
        email: 'a.silva@kozowood.pt',
        tier: 'Gold Member',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        joined: '2024'
      });

      setBookings([
        {
          id: 1,
          hotelName: 'Muda Reserve Resort',
          roomType: 'Deluxe Ocean Suite',
          checkIn: 'Oct 12, 2026',
          checkOut: 'Oct 15, 2026',
          status: 'Current',
          category: 'Coastal Sanctuary',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 2,
          hotelName: 'Közöwood Heritage Stay',
          roomType: 'Masstimber Cabin',
          checkIn: 'Sep 05, 2026',
          checkOut: 'Sep 08, 2026',
          status: 'Completed',
          category: 'Forest Retreat',
          image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800',
        }
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this journey?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-10 h-10 border border-[#865D36]/20 border-t-[#865D36] rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#865D36] opacity-40 font-serif">Közöwood Sanctuary</p>
      </div>
    );
  }

  const filteredBookings = bookings.filter(b =>
    activeTab === 'upcoming' ? b.status === 'Current' : b.status === 'Completed'
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 py-16 md:py-24 flex flex-col items-center font-serif text-[#865D36] selection:bg-[#AC8968]/20">
      <div className="w-full max-w-4xl space-y-20">

        {/* Brand Header - Centered & Light */}
        <header className="text-center space-y-6">
          <div className="inline-block p-4 border border-[#865D36]/10 rounded-full mb-2">
            <span className="text-sm">🍃</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-[0.3em] uppercase text-[#865D36] animate-in fade-in slide-in-from-top-4 duration-1000">Közöwood</h1>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-12 bg-[#865D36]/20"></div>
            <p className="text-[9px] tracking-[0.4em] uppercase opacity-40 font-medium tracking-widest">Guest Experience</p>
            <div className="h-[1px] w-12 bg-[#865D36]/20"></div>
          </div>
        </header>

        {/* Profile Section - Centered Elevated Card */}
        <section className="bg-white rounded-[45px] shadow-[0_40px_100px_rgba(134,93,54,0.05)] border border-[#A69080]/10 p-12 md:p-16 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-40 h-40 rounded-full border border-[#AC8968]/20 object-cover p-2 bg-white shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full border border-[#865D36]/10 animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-light text-[#865D36] tracking-tight">{user.name}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="px-5 py-1.5 bg-[#FAF9F6] border border-[#A69080]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#93785B]">
                {user.tier}
              </span>
              <span className="text-xs text-[#93785B] italic opacity-50">Member since {user.joined}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 w-full max-w-xs mx-auto pt-6">
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-[#865D36] text-white rounded-[5px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#3E362E] transition-all duration-500 shadow-[0_20px_40px_rgba(134,93,54,0.15)]"
            >
              Sign Out
            </button>
            <button className="text-[9px] uppercase tracking-[0.3em] font-black text-[#93785B] border-b border-[#AC8968]/20 pb-1 hover:text-[#865D36] transition-colors">
              Manage Account Settings
            </button>
          </div>
        </section>

        {/* Journeys Hub - Centered Feed */}
        <section className="space-y-16 animate-in fade-in duration-1000 delay-500">
          <div className="flex flex-col items-center space-y-8">
            <h3 className="text-3xl font-light tracking-[0.2em] uppercase opacity-80">Your Gatherings</h3>
            <div className="flex bg-white rounded-2xl p-1.5 border border-[#A69080]/10 shadow-sm w-full max-w-sm">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${activeTab === 'upcoming' ? 'bg-[#865D36] text-white shadow-xl' : 'text-[#93785B] opacity-40 hover:opacity-100'}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${activeTab === 'history' ? 'bg-[#865D36] text-white shadow-xl' : 'text-[#93785B] opacity-40 hover:opacity-100'}`}
              >
                Archive
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-2xl mx-auto">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="group bg-white rounded-[40px] overflow-hidden border border-[#A69080]/10 shadow-sm hover:shadow-[0_40px_100px_rgba(134,93,54,0.1)] transition-all duration-1000">
                  <div className="h-72 overflow-hidden relative">
                    <img
                      src={booking.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                      alt={booking.hotelName}
                    />
                    <div className="absolute top-8 right-8 bg-white/95 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-xl">
                      {booking.status}
                    </div>
                  </div>
                  <div className="p-12 text-center space-y-8">
                    <div className="space-y-3">
                      <p className="text-[9px] uppercase tracking-[0.5em] text-[#AC8968] font-black">{booking.category}</p>
                      <h4 className="text-3xl font-light tracking-tight">{booking.hotelName}</h4>
                      <p className="text-[10px] text-[#93785B] uppercase tracking-[0.3em] font-medium opacity-60 leading-relaxed max-w-xs mx-auto">
                        Experience valid for our {booking.roomType} room.
                      </p>
                    </div>

                    <div className="flex justify-center items-center gap-12 py-10 border-y border-[#FAF9F6]">
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-widest opacity-40 font-black">Arriving</p>
                        <p className="text-sm font-medium">{booking.checkIn}</p>
                      </div>
                      <div className="w-[1px] h-10 bg-[#865D36]/10"></div>
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-widest opacity-40 font-black">Departing</p>
                        <p className="text-sm font-medium">{booking.checkOut}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 pt-4">
                      <button className="w-full py-5 bg-[#FAF9F6] border border-[#865D36]/5 rounded-2xl text-[#865D36] text-[10px] font-black uppercase tracking-widest hover:bg-[#865D36] hover:text-white transition-all duration-700 shadow-sm">
                        View Dossier
                      </button>
                      {activeTab === 'upcoming' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="text-[10px] font-black uppercase tracking-[0.1em] text-red-300 hover:text-red-500 transition-colors"
                        >
                          Request Journey Cancellation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[50px] border border-dashed border-[#A69080]/20 text-center space-y-8">
                <div className="text-4xl opacity-10">🏛️</div>
                <div className="space-y-3">
                  <h4 className="text-xl font-light tracking-[0.2em] uppercase">No Recorded Journeys</h4>
                  <p className="text-[11px] text-[#93785B] font-medium opacity-40 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                    This gallery of memories is waiting for its first collection.
                  </p>
                </div>
                <button className="px-12 py-3.5 border border-[#865D36]/20 rounded-full text-[10px] font-black uppercase tracking-widest text-[#865D36] hover:bg-[#865D36] hover:text-white transition-all">
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Brand Footer - Centered */}
        <footer className="pt-32 pb-20 text-center space-y-12 border-t border-[#A69080]/10 opacity-60">
          <h5 className="text-3xl font-light tracking-[0.4em] uppercase opacity-40">Közöwood</h5>
          <div className="flex justify-center gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-[#93785B]">
            <a href="#" className="hover:text-[#865D36] transition-all">Concierge</a>
            <a href="#" className="hover:text-[#865D36] transition-all">Heritage</a>
            <a href="#" className="hover:text-[#865D36] transition-all">Support</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.8em] opacity-30 font-medium">
            Architecture of Hospitality • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
