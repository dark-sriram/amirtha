import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { bookingAPI } from '../services/api';
import { FiSearch, FiFilter } from 'react-icons/fi';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      REQUESTED: 'badge-warning',
      CONFIRMED: 'badge-success',
      CHECKED_IN: 'badge-primary',
      CHECKED_OUT: 'badge-ghost',
      CANCELLED: 'badge-error',
    };
    return <span className={`badge ${statusClasses[status] || 'badge-ghost'}`}>{status}</span>;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'ALL' || booking.status === filter;
    const matchesSearch = 
      booking.id.toString().includes(searchTerm) ||
      booking.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room?.roomNumber?.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

        {/* Filters */}
        <div className="card bg-base-200 mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="form-control flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search by ID, customer name, or room number..."
                    className="input input-bordered pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-control w-full md:w-48">
                <select
                  className="select select-bordered"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="REQUESTED">Requested</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CHECKED_IN">Checked In</option>
                  <option value="CHECKED_OUT">Checked Out</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-8 opacity-50">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="font-semibold">#{booking.id}</td>
                          <td>{booking.customer?.name || 'N/A'}</td>
                          <td>{booking.customer?.email || 'N/A'}</td>
                          <td>#{booking.room?.roomNumber}</td>
                          <td>{booking.checkInDate}</td>
                          <td>{booking.checkOutDate}</td>
                          <td>${booking.totalAmount}</td>
                          <td>{getStatusBadge(booking.status)}</td>
                          <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
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

export default AllBookings;