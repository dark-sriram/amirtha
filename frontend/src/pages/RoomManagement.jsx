import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { roomAPI } from '../services/api';
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'STANDARD',
    pricePerNight: '',
    capacity: '',
    status: 'AVAILABLE',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await roomAPI.getAll();
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        capacity: room.capacity,
        status: room.status,
      });
    } else {
      setEditingRoom(null);
      setFormData({
        roomNumber: '',
        roomType: 'STANDARD',
        pricePerNight: '',
        capacity: '',
        status: 'AVAILABLE',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingRoom) {
        await roomAPI.update(editingRoom.id, formData);
        alert('Room updated successfully!');
      } else {
        await roomAPI.create(formData);
        alert('Room created successfully!');
      }
      handleCloseModal();
      fetchRooms();
    } catch (error) {
      alert('Failed to save room: ' + error.response?.data?.message);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      await roomAPI.delete(roomId);
      alert('Room deleted successfully!');
      fetchRooms();
    } catch (error) {
      alert('Failed to delete room: ' + error.response?.data?.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      AVAILABLE: 'badge-success',
      MAINTENANCE: 'badge-warning',
      INACTIVE: 'badge-error',
    };
    return <span className={`badge ${statusClasses[status] || 'badge-ghost'}`}>{status}</span>;
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Room Management</h1>
          <button className="btn btn-primary gap-2" onClick={() => handleOpenModal()}>
            <FiPlus />
            Add New Room
          </button>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Price/Night</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td className="font-semibold">#{room.roomNumber}</td>
                      <td>{room.roomType}</td>
                      <td>${room.pricePerNight}</td>
                      <td>{room.capacity} guests</td>
                      <td>{getStatusBadge(room.status)}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleOpenModal(room)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => handleDelete(room.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </h3>
                <button className="btn btn-sm btn-circle" onClick={handleCloseModal}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Room Number</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Room Type</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={formData.roomType}
                      onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                    >
                      <option value="STANDARD">Standard</option>
                      <option value="DELUXE">Deluxe</option>
                      <option value="SUITE">Suite</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="MAINTENANCE">Maintenance</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price per Night ($)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Capacity (Guests)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="modal-action">
                  <button type="button" className="btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary gap-2">
                    <FiCheck />
                    {editingRoom ? 'Update Room' : 'Create Room'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RoomManagement;