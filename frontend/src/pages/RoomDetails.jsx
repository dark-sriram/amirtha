import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { roomAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiCalendar, FiUsers, FiDollarSign, FiAlertCircle, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        setNights(diff);
        setTotalAmount(diff * room.pricePerNight);
      } else {
        setNights(0);
        setTotalAmount(0);
      }
    }
  }, [checkIn, checkOut, room]);

  const fetchRoomDetails = async () => {
    try {
      const response = await roomAPI.getById(id);
      setRoom(response.data);
    } catch (error) {
      toast.error('Room not found');
      navigate('/rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a room');
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    setBookingLoading(true);

    try {
      await bookingAPI.create({
        userId: user.id,
        roomId: room.id,
        checkIn,
        checkOut
      });
      toast.success('Booking request submitted! Waiting for admin approval.');
      navigate('/my-bookings');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Room is not available for the selected dates. Please choose different dates.');
      } else {
        toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
      }
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Layout>
    );
  }

  if (!room) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/rooms" className="btn btn-ghost mb-4">← Back to Rooms</Link>
        
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <div className="w-full h-64 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-8xl">🛏️</span>
            </div>
          </figure>
          
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-3xl">Room #{room.roomNumber}</h2>
                <p className="badge badge-lg badge-outline mt-2">{room.roomType}</p>
              </div>
              <span className={`badge badge-lg ${
                room.status === 'AVAILABLE' ? 'badge-success' :
                room.status === 'MAINTENANCE' ? 'badge-warning' : 'badge-error'
              }`}>
                {room.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="flex items-center gap-3">
                <FiUsers className="text-2xl text-primary" />
                <div>
                  <p className="text-sm opacity-70">Capacity</p>
                  <p className="font-semibold">{room.capacity} Guests</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-2xl text-success" />
                <div>
                  <p className="text-sm opacity-70">Price per Night</p>
                  <p className="font-semibold">${room.pricePerNight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar className="text-2xl text-accent" />
                <div>
                  <p className="text-sm opacity-70">Room ID</p>
                  <p className="font-semibold">#{room.id}</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {room.status !== 'AVAILABLE' ? (
              <div className="alert alert-warning">
                <FiAlertCircle />
                <span>This room is currently {room.status.toLowerCase()} and cannot be booked.</span>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Book This Room</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Check-in Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Check-out Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {nights > 0 && (
                  <div className="bg-base-200 p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Room Rate:</span>
                      <span>${room.pricePerNight} × {nights} nights</span>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-primary">${totalAmount}</span>
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-primary btn-lg w-full gap-2"
                  onClick={handleBooking}
                  disabled={bookingLoading || nights <= 0}
                >
                  {bookingLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FiCheck />
                  )}
                  {isAuthenticated ? 'Book Now' : 'Login to Book'}
                </button>

                <p className="text-sm opacity-70 text-center mt-4">
                  ⚠️ Your booking will be sent for admin approval. You will be notified once confirmed.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetails;