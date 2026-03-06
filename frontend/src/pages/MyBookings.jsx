import React, { useEffect, useState } from 'react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import { FiAlertCircle, FiCalendar, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingAPI.getByUser(user.id);
      // Ensure data is an array
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCounts = () => {
    if (!Array.isArray(bookings)) {
      return { REQUESTED: 0, CONFIRMED: 0, CHECKED_IN: 0, CHECKED_OUT: 0, CANCELLED: 0 };
    }
    
    const counts = {
      REQUESTED: 0,
      CONFIRMED: 0,
      CHECKED_IN: 0,
      CHECKED_OUT: 0,
      CANCELLED: 0
    };
    
    bookings.forEach(booking => {
      if (counts[booking.status] !== undefined) {
        counts[booking.status]++;
      }
    });
    
    return counts;
  };

  const counts = getStatusCounts();

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Link to="/rooms" className="btn btn-primary gap-2">
            <FiPlus className="w-4 h-4" />
            New Booking
          </Link>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full mb-6 bg-base-100">
          <div className="stat place-items-center">
            <div className="stat-figure text-warning">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="stat-title">Requested</div>
            <div className="stat-value text-warning text-2xl">{counts.REQUESTED}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-success">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="stat-title">Confirmed</div>
            <div className="stat-value text-success text-2xl">{counts.CONFIRMED}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-primary">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="stat-title">Checked In</div>
            <div className="stat-value text-primary text-2xl">{counts.CHECKED_IN}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-base-content">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-2xl">{counts.CHECKED_OUT}</div>
          </div>
        </div>

        {/* Bookings Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="card bg-base-100 shadow-lg p-8 text-center">
            <FiAlertCircle className="text-6xl mx-auto mb-4 text-base-content/30" />
            <h2 className="text-xl font-semibold mb-2">No Bookings Yet</h2>
            <p className="text-base-content/70 mb-6">Start by browsing and booking a room</p>
            <Link to="/rooms" className="btn btn-primary">
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-base-content/70 mb-4">
              Total {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;