import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiShield, FiCalendar } from 'react-icons/fi';
import Layout from '../components/Layout';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&size=128`} alt={user?.name} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <span className={`badge ${user?.role === 'ADMIN' ? 'badge-primary' : 'badge-ghost'} badge-lg`}>
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiUser className="text-xl opacity-70" />
                <div>
                  <p className="text-sm opacity-70">Full Name</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-xl opacity-70" />
                <div>
                  <p className="text-sm opacity-70">Email Address</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiShield className="text-xl opacity-70" />
                <div>
                  <p className="text-sm opacity-70">Account Role</p>
                  <p className="font-semibold">{user?.role}</p>
                </div>
              </div>

              {user?.role === 'ADMIN' && (
                <div className="alert alert-primary">
                  <FiShield />
                  <span>You have admin access. Visit <a href="/admin/dashboard" className="link link-hover">Admin Dashboard</a> to manage bookings.</span>
                </div>
              )}
            </div>

            <div className="card-actions justify-end mt-6">
              <button className="btn btn-error gap-2" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;