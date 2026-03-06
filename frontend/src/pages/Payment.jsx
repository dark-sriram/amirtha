import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI, paymentAPI } from '../services/api';
import { FiCreditCard, FiDollarSign, FiCheck, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await bookingAPI.getById(id);
      setBooking(response.data);
    } catch (error) {
      toast.error('Booking not found');
      navigate('/my-bookings');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      await paymentAPI.create({
        bookingId: booking.id,
        amount: booking.totalAmount,
        method: paymentMethod
      });
      toast.success('Payment successful! Your booking is confirmed.');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
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

  if (!booking) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Booking Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-70">Booking ID:</span>
                <span className="font-semibold">#{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Room:</span>
                <span className="font-semibold">#{booking.room?.roomNumber} ({booking.room?.roomType})</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Check-in:</span>
                <span className="font-semibold">{booking.checkInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Check-out:</span>
                <span className="font-semibold">{booking.checkOutDate}</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between text-xl">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-primary">${booking.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              <FiCreditCard className="mr-2" />
              Payment Method
            </h2>

            <div className="form-control mb-6">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="payment-method"
                  className="radio radio-primary"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                />
                <span className="label-text">💳 Credit/Debit Card</span>
              </label>
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="payment-method"
                  className="radio radio-primary"
                  checked={paymentMethod === 'CASH'}
                  onChange={() => setPaymentMethod('CASH')}
                />
                <span className="label-text">💵 Cash (Pay at Hotel)</span>
              </label>
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="radio"
                  name="payment-method"
                  className="radio radio-primary"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                />
                <span className="label-text">📱 UPI Payment</span>
              </label>
            </div>

            <div className="alert alert-info mb-6">
              <FiAlertCircle />
              <span>Payment is secure and encrypted. Your booking will be confirmed immediately after payment.</span>
            </div>

            <button
              className="btn btn-primary btn-lg w-full gap-2"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <FiDollarSign />
              )}
              Pay ${booking.totalAmount}
            </button>

            <button
              className="btn btn-ghost w-full mt-2"
              onClick={() => navigate('/my-bookings')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;