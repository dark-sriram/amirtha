import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { bookingAPI, roomAPI } from '../services/api';
import { FiCalendar, FiCheck, FiX, FiDollarSign, FiUsers, FiTrendingUp, FiHome, FiClock, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingRequests: 0,
    confirmedBookings: 0,
    totalRooms: 0,
    availableRooms: 0,
    occupancyRate: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        bookingAPI.getAll(),
        roomAPI.getAll(),
      ]);

      const bookings = bookingsRes.data;
      const rooms = roomsRes.data;

      const occupancyRate = rooms.length > 0 ? Math.round(((rooms.length - rooms.filter(r => r.status === 'AVAILABLE').length) / rooms.length) * 100) : 0;

      setStats({
        totalBookings: bookings.length,
        pendingRequests: bookings.filter(b => b.status === 'REQUESTED').length,
        confirmedBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
        totalRooms: rooms.length,
        availableRooms: rooms.filter(r => r.status === 'AVAILABLE').length,
        occupancyRate,
      });

      setRecentBookings(bookings.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      REQUESTED: { class: 'badge-warning', icon: FiClock },
      CONFIRMED: { class: 'badge-success', icon: FiCheck },
      CHECKED_IN: { class: 'badge-primary', icon: FiHome },
      CHECKED_OUT: { class: 'badge-ghost', icon: FiX },
      CANCELLED: { class: 'badge-error', icon: FiX },
    };

    const config = statusConfig[status] || { class: 'badge-ghost', icon: FiClock };
    const IconComponent = config.icon;

    return (
      <span className={`badge ${config.class} gap-1`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, desc, icon: Icon, color, trend }) => (
    <div className={`stat bg-gradient-to-br ${color} text-white rounded-box p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="stat-figure">
        <Icon className="text-4xl opacity-80" />
      </div>
      <div className="stat-title text-white/80">{title}</div>
      <div className="stat-value text-3xl font-bold">{value}</div>
      <div className="stat-desc text-white/70">{desc}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-sm">
          <FiTrendingUp className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content rounded-box p-8 shadow-lg">
          <div className="hero-content text-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-lg opacity-90">Here's what's happening with your hotel today</p>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <span className="badge badge-outline badge-lg">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            desc="All time"
            icon={FiCalendar}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            desc="Needs attention"
            icon={FiClock}
            color="from-yellow-500 to-orange-500"
          />
          <StatCard
            title="Confirmed"
            value={stats.confirmedBookings}
            desc="Active bookings"
            icon={FiCheck}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Available Rooms"
            value={`${stats.availableRooms}/${stats.totalRooms}`}
            desc="Ready for guests"
            icon={FiHome}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            desc="Current utilization"
            icon={FiTrendingUp}
            color="from-indigo-500 to-indigo-600"
          />
          <StatCard
            title="Revenue"
            value="$12,450"
            desc="This month"
            icon={FiDollarSign}
            color="from-emerald-500 to-teal-600"
            trend="+12% from last month"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/booking-requests" className="group">
            <div className="card bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center py-8">
                <FiCalendar className="mx-auto text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                <h3 className="card-title justify-center text-xl font-bold">Booking Requests</h3>
                <p className="text-sm opacity-90">Review and manage pending bookings</p>
                {stats.pendingRequests > 0 && (
                  <div className="badge badge-warning mt-2">{stats.pendingRequests} pending</div>
                )}
              </div>
            </div>
          </Link>

          <Link to="/room-management" className="group">
            <div className="card bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center py-8">
                <FiHome className="mx-auto text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                <h3 className="card-title justify-center text-xl font-bold">Room Management</h3>
                <p className="text-sm opacity-90">Manage rooms and availability</p>
              </div>
            </div>
          </Link>

          <Link to="/all-bookings" className="group">
            <div className="card bg-gradient-to-r from-accent to-accent-focus text-accent-content shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body text-center py-8">
                <FiEye className="mx-auto text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                <h3 className="card-title justify-center text-xl font-bold">All Bookings</h3>
                <p className="text-sm opacity-90">View complete booking history</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="card-title text-2xl">
                <FiCalendar className="mr-2" />
                Recent Bookings
              </h2>
              <Link to="/all-bookings" className="btn btn-ghost btn-sm">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary"></div>
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="text-center py-12">
                <FiCalendar className="mx-auto text-6xl text-base-content/20 mb-4" />
                <h3 className="text-lg font-semibold text-base-content/70">No bookings yet</h3>
                <p className="text-base-content/50">Recent bookings will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="font-semibold">Booking ID</th>
                      <th className="font-semibold">Customer</th>
                      <th className="font-semibold">Room</th>
                      <th className="font-semibold">Check-in / Check-out</th>
                      <th className="font-semibold">Amount</th>
                      <th className="font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-base-200/50 transition-colors">
                        <td className="font-mono">#{booking.id}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="avatar avatar-sm">
                              <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold">
                                {booking.customer?.name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                            </div>
                            <span className="font-medium">{booking.customer?.name || 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-outline">Room #{booking.room?.roomNumber || 'N/A'}</span>
                        </td>
                        <td>
                          <div className="text-sm">
                            <div className="font-medium">{booking.checkInDate}</div>
                            <div className="text-base-content/60">to {booking.checkOutDate}</div>
                          </div>
                        </td>
                        <td className="font-semibold text-success">${booking.totalAmount}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;