import React, { useEffect, useState } from 'react';
import { roomAPI } from '../services/api';
import RoomCard from '../components/RoomCard';
import { FiSearch, FiFilter, FiAlertCircle, FiGrid, FiList, FiX } from 'react-icons/fi';
import Layout from '../components/Layout';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      let response;
      if (checkIn && checkOut) {
        response = await roomAPI.getAvailable(checkIn, checkOut);
      } else {
        response = await roomAPI.getAll();
      }
      console.log('Response data:', response.data);
      console.log('Type:', typeof response.data);
      setRooms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setLoading(true);
    fetchRooms();
  };

  const clearFilters = () => {
    setFilter('ALL');
    setSearchTerm('');
    setCheckIn('');
    setCheckOut('');
    setSortBy('price');
    setSortOrder('asc');
  };

  const filteredAndSortedRooms = Array.isArray(rooms) ? rooms
    .filter(room => {
      const matchesFilter = filter === 'ALL' || room.roomType === filter;
      const matchesSearch =
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'price':
          aValue = parseFloat(a.pricePerNight);
          bValue = parseFloat(b.pricePerNight);
          break;
        case 'capacity':
          aValue = a.capacity;
          bValue = b.capacity;
          break;
        case 'number':
          aValue = parseInt(a.roomNumber);
          bValue = parseInt(b.roomNumber);
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }) : [];
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Available Rooms</h1>
            <div className="flex items-center gap-4">
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    className="input input-bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-square">
                    <FiSearch />
                  </button>
                </div>
              </div>
              <div className="btn-group">
                <button
                  className={`btn ${viewMode === 'grid' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={`btn ${viewMode === 'list' ? 'btn-active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Check-in</span>
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
                  <span className="label-text">Check-out</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Room Type</span>
                </label>
                <select
                  className="select select-bordered"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="ALL">All Types</option>
                  <option value="STANDARD">Standard</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="SUITE">Suite</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sort By</span>
                </label>
                <select
                  className="select select-bordered"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="price">Price</option>
                  <option value="capacity">Capacity</option>
                  <option value="number">Room Number</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Order</span>
                </label>
                <select
                  className="select select-bordered"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="form-control justify-end mt-4">
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={clearFilters}>
                  <FiX className="mr-2" />
                  Clear
                </button>
                <button className="btn btn-primary" onClick={handleFilter}>
                  <FiFilter className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredAndSortedRooms.length === 0 ? (
          <div className="card bg-base-100 p-8 text-center">
            <FiAlertCircle className="text-6xl mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Rooms Found</h2>
            <p className="opacity-70">Try adjusting your filters or dates</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
            {filteredAndSortedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rooms;