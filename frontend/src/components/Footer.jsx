import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content">
      <div>
        <p className="font-bold text-2xl">🏨 Hotel Management System</p>
        <p>Your comfort is our priority</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover"><FiMail className="inline mr-2" />info@hotelms.com</a>
          <a className="link link-hover"><FiPhone className="inline mr-2" />+1 234 567 8900</a>
          <a className="link link-hover"><FiMapPin className="inline mr-2" />123 Hotel Street, City</a>
        </div>
      </div>
      <div>
        <p>Copyright © 2026 - All rights reserved by HotelMS</p>
      </div>
    </footer>
  );
};

export default Footer;