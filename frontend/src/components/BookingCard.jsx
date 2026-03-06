import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiDollarSign, FiCheck } from 'react-icons/fi';

const BookingCard = ({ booking }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      REQUESTED: 'badge-warning',
      CONFIRMED: 'badge-success',
      CHECKED_IN: 'badge-primary',
      CHECKED_OUT: 'badge-ghost',
      CANCELLED: 'badge-error',
    };
    return (
      <span className={`badge ${statusClasses[status]} badge-md`}>
        {status}
      </span>
    );
  };

  const nights = booking.checkInDate && booking.checkOutDate 
    ? Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="card-title text-xl">Booking #{booking.id}</h2>
            <p className="text-sm text-base-content/70">
              Created: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary w-5 h-5" />
            <div>
              <p className="text-sm text-base-content/70">Check-in</p>
              <p className="font-semibold">{booking.checkInDate || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary w-5 h-5" />
            <div>
              <p className="text-sm text-base-content/70">Check-out</p>
              <p className="font-semibold">{booking.checkOutDate || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="mb-4">
          <p className="text-sm text-base-content/70">Room Details</p>
          <p className="font-semibold">
            Room #{booking.room?.roomNumber || 'N/A'} - {booking.room?.roomType || 'N/A'}
          </p>
          <p className="text-sm text-base-content/70">
            {nights} nights x ${booking.room?.pricePerNight || 0}/night
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-success w-6 h-6" />
            <span className="text-2xl font-bold text-success">${booking.totalAmount || 0}</span>
          </div>
          {booking.status === 'CONFIRMED' && !booking.payment && (
            <Link to={`/payment/${booking.id}`} className="btn btn-success btn-sm">
              <FiCheck className="mr-2 w-4 h-4" />
              Pay Now
            </Link>
          )}
        </div>

        {booking.payment && (
          <div className="alert alert-success py-3">
            <FiCheck className="w-5 h-5" />
            <span>Paid via {booking.payment.method}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;