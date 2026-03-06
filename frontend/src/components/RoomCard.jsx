import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiDollarSign, FiWifi, FiCoffee, FiTv, FiWind, FiShield } from 'react-icons/fi';

const RoomCard = ({ room }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: { class: 'badge-success', text: 'Available' },
      MAINTENANCE: { class: 'badge-warning', text: 'Maintenance' },
      INACTIVE: { class: 'badge-error', text: 'Unavailable' },
    };
    const config = statusConfig[status] || { class: 'badge-ghost', text: status };
    return (
      <span className={`badge ${config.class} badge-sm font-medium`}>
        {config.text}
      </span>
    );
  };

  const getRoomTypeColor = (roomType) => {
    const colors = {
      STANDARD: 'badge-primary',
      DELUXE: 'badge-secondary',
      SUITE: 'badge-accent',
    };
    return colors[roomType] || 'badge-neutral';
  };

  const getRoomImage = (roomType) => {
    const images = {
      STANDARD: '🏨',
      DELUXE: '🏰',
      SUITE: '🏛️',
    };
    return images[roomType] || '🏠';
  };

  const getAmenities = (roomType) => {
    const baseAmenities = [
      { icon: FiWifi, label: 'WiFi' },
      { icon: FiCoffee, label: 'Coffee' },
    ];

    if (roomType === 'DELUXE') {
      return [
        ...baseAmenities,
        { icon: FiTv, label: 'TV' },
        { icon: FiWind, label: 'AC' },
      ];
    }

    if (roomType === 'SUITE') {
      return [
        ...baseAmenities,
        { icon: FiTv, label: 'TV' },
        { icon: FiWind, label: 'AC' },
        { icon: FiShield, label: 'Security' },
      ];
    }

    return baseAmenities;
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-base-200">
      <figure className="px-6 pt-6">
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-xl flex items-center justify-center border border-base-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
          <div className="text-center z-10">
            <div className="text-6xl mb-2 drop-shadow-lg">{getRoomImage(room.roomType)}</div>
            <p className="text-sm font-bold text-base-content drop-shadow">Room {room.roomNumber}</p>
            <p className="text-xs text-base-content/60 mt-1">{room.roomType}</p>
          </div>
        </div>
      </figure>
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="card-title text-xl font-bold">Room {room.roomNumber}</h2>
          {getStatusBadge(room.status)}
        </div>

        <div className={`badge ${getRoomTypeColor(room.roomType)} badge-outline badge-lg font-semibold mb-4`}>
          {room.roomType}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm bg-base-200/50 p-2 rounded-lg">
            <FiUsers className="text-primary w-4 h-4" />
            <span className="font-medium">{room.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm bg-success/10 p-2 rounded-lg">
            <FiDollarSign className="text-success w-4 h-4" />
            <span className="font-bold text-success">${room.pricePerNight}/night</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-base-content/70 mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {getAmenities(room.roomType).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded-full">
                <amenity.icon className="w-3 h-3" />
                <span>{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-actions justify-end mt-auto">
          <Link to={`/rooms/${room.id}`} className="btn btn-primary btn-sm btn-block font-semibold">
            View Details & Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;