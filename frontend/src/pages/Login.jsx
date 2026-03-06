import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle, FiLogIn } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful');
      if (result.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-primary mb-2">HotelMS</h1>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-base-content/70">Login to your account</p>
            </div>

            {error && (
              <div className="alert alert-error gap-2 mb-4">
                <FiAlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered pl-10 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered pl-10 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full gap-2"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : <FiLogIn className="w-5 h-5" />}
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="link link-primary font-semibold">
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center text-sm bg-base-200 p-4 rounded-lg">
              <p className="font-semibold mb-2">Test Credentials</p>
              <div className="text-xs text-base-content/70 space-y-1">
                <p>Customer: customer@example.com / customer123</p>
                <p>Admin: admin@hotel.com / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;