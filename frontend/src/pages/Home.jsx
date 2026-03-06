import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiGrid, FiShield, FiCreditCard } from 'react-icons/fi';
import Layout from '../components/Layout';

const Home = () => {
  const features = [
    {
      icon: FiGrid,
      title: 'Browse Rooms',
      description: 'View all available rooms with detailed information',
      color: 'text-primary'
    },
    {
      icon: FiCalendar,
      title: 'Easy Booking',
      description: 'Book rooms with simple date selection',
      color: 'text-secondary'
    },
    {
      icon: FiShield,
      title: 'Secure System',
      description: 'Your data is protected with JWT authentication',
      color: 'text-success'
    },
    {
      icon: FiCreditCard,
      title: 'Multiple Payment',
      description: 'Pay via CARD, CASH, or UPI',
      color: 'text-accent'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-300 mb-12 rounded-box">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-primary">HotelMS</span>
            </h1>
            <p className="text-xl mb-8 text-base-content/80">
              Experience seamless hotel booking with our modern management system. 
              Browse rooms, make reservations, and manage your bookings all in one place.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/rooms" className="btn btn-primary btn-lg">
                Browse Rooms
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <feature.icon className={`text-5xl ${feature.color} mb-4`} />
                <h3 className="card-title text-xl">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="steps steps-vertical lg:steps-horizontal">
          <div className="step step-primary">
            <div className="text-center">
              <p className="font-bold">1. Register/Login</p>
              <p className="text-sm text-base-content/70">Create your account</p>
            </div>
          </div>
          <div className="step step-primary">
            <div className="text-center">
              <p className="font-bold">2. Browse Rooms</p>
              <p className="text-sm text-base-content/70">Select your dates</p>
            </div>
          </div>
          <div className="step step-primary">
            <div className="text-center">
              <p className="font-bold">3. Book Room</p>
              <p className="text-sm text-base-content/70">Submit booking request</p>
            </div>
          </div>
          <div className="step step-primary">
            <div className="text-center">
              <p className="font-bold">4. Admin Approval</p>
              <p className="text-sm text-base-content/70">Wait for confirmation</p>
            </div>
          </div>
          <div className="step step-primary">
            <div className="text-center">
              <p className="font-bold">5. Make Payment</p>
              <p className="text-sm text-base-content/70">Complete your booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FiGrid className="w-8 h-8" />
          </div>
          <div className="stat-title">Available Rooms</div>
          <div className="stat-value text-primary">13+</div>
          <div className="stat-desc">Standard, Deluxe & Suite</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FiCalendar className="w-8 h-8" />
          </div>
          <div className="stat-title">Booking Status</div>
          <div className="stat-value text-secondary">5 Stages</div>
          <div className="stat-desc">Full lifecycle tracking</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <FiCreditCard className="w-8 h-8" />
          </div>
          <div className="stat-title">Payment Methods</div>
          <div className="stat-value text-accent">3</div>
          <div className="stat-desc">CARD, CASH, UPI</div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;