import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { bookingAPI } from '../services/api';
import { FiCheck, FiX, FiAlertCircle, FiCalendar, FiUser } from 'react-icons/fi';

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await bookingAPI.getAll();
      const pendingRequests = response.data.filter(b => b.status === 'REQUESTED');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    setActionLoading(bookingId);
    try {
      await bookingAPI.updateStatus(bookingId, 'CONFIRMED');
      setRequests(requests.filter(r => r.id !== bookingId));
      alert('Booking approved successfully!');
    } catch (error) {
      alert('Failed to approve booking: ' + error.response?.data?.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (bookingId) => {
    if (!window.confirm('Are you sure you want to reject this booking?')) {
      return;
    }
    
    setActionLoading(bookingId);
    try {
      await bookingAPI.updateStatus(bookingId, 'CANCELLED');
      setRequests(requests.filter(r => r.id !== bookingId));
      alert('Booking rejected.');
    } catch (error) {
      alert('Failed to reject booking: ' + error.response?.data?.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Booking Requests</h1>

        {requests.length === 0 ? (
          <div className="card bg-base-200 p-8 text-center">
            <FiAlertCircle className="text-6xl mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Pending Requests</h2>
            <p className="opacity-70">All booking requests have been processed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div key={request.id} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="card-title text-2xl">Booking #{request.id}</h2>
                    <span className="badge badge-warning">PENDING</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <FiUser className="opacity-70" />
                      <span className="font-semibold">Customer:</span>
                      <span>{request.customer?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUser className="opacity-70" />
                      <span className="font-semibold">Email:</span>
                      <span>{request.customer?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="opacity-70" />
                      <span className="font-semibold">Room:</span>
                      <span>#{request.room?.roomNumber} ({request.room?.roomType})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="opacity-70" />
                      <span className="font-semibold">Check-in:</span>
                      <span>{request.checkInDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="opacity-70" />
                      <span className="font-semibold">Check-out:</span>
                      <span>{request.checkOutDate}</span>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-primary">
                        ${request.totalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions justify-end gap-2">
                    <button
                      className="btn btn-error gap-2"
                      onClick={() => handleReject(request.id)}
                      disabled={actionLoading === request.id}
                    >
                      <FiX />
                      {actionLoading === request.id ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      className="btn btn-success gap-2 text-white"
                      onClick={() => handleApprove(request.id)}
                      disabled={actionLoading === request.id}
                    >
                      <FiCheck />
                      {actionLoading === request.id ? 'Processing...' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingRequests;