import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        if (result.user.role === 'ADMIN') {
          // Save email if remember me is checked
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          navigate('/dashboard');
        } else {
          setError('Access denied. Admin privileges required.');
        }
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`card w-full max-w-md bg-base-100/95 backdrop-blur-sm shadow-2xl border border-base-300 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 shadow-lg">
                {/* <FiHotel className="text-2xl text-white" /> */}
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-base-content/70 mt-2 flex items-center justify-center gap-2">
                <FiShield className="text-primary" />
                Admin Portal
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error gap-2 mb-6 animate-in slide-in-from-top-2 duration-300">
                <FiAlertCircle className="flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@hotel.com"
                    className="input input-bordered pl-10 w-full focus:input-primary transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative group">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered pl-10 pr-10 w-full focus:input-primary transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiShield className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-base-300">
              <div className="text-center">
                <p className="text-sm text-base-content/60 mb-2">Demo Credentials</p>
                <div className="bg-base-200 rounded-lg p-3 text-xs font-mono">
                  <div className="text-primary font-semibold">admin@hotel.com</div>
                  <div className="text-base-content/70">admin123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;