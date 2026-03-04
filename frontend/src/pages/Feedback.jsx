import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

function Feedback() {
  const cardRef = useRef(null);
  const formItemsRef = useRef([]);
  const successRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  useEffect(() => {
    // Background zoom animation
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 5, ease: "power2.out" }
    );

    // Card animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Form items animation
    gsap.fromTo(
      formItemsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.4 }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    const templateParams = { ...formData, rating };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 }
        );

        setFormData({
          user_name: "",
          user_email: "",
          message: ""
        });
        setRating(0);
      })
      .catch(() => alert("Failed to send feedback"));
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
        alt="Hotel Room"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-10 text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-2">
          Share Your Experience
        </h2>
        <p className="text-center text-sm text-gray-200 mb-8">
          Your comfort is our priority
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            ref={(el) => (formItemsRef.current[0] = el)}
            type="text"
            name="user_name"
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/30 placeholder-white text-white outline-none focus:ring-2 focus:ring-[#C6A969]"
            required
          />

          <input
            ref={(el) => (formItemsRef.current[1] = el)}
            type="email"
            name="user_email"
            placeholder="Your Email"
            value={formData.user_email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/30 placeholder-white text-white outline-none focus:ring-2 focus:ring-[#C6A969]"
            required
          />

          {/* Rating Stars */}
          <div
            ref={(el) => (formItemsRef.current[2] = el)}
            className="flex justify-center gap-3 text-4xl py-2 cursor-pointer"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`transition-all duration-200 ${
                  star <= (hover || rating)
                    ? "text-[#FFD700] scale-125"
                    : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            ref={(el) => (formItemsRef.current[3] = el)}
            name="message"
            placeholder="Tell us about your stay..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/30 placeholder-white text-white outline-none focus:ring-2 focus:ring-[#C6A969] resize-none"
            required
          />

          <button
            ref={(el) => {
              formItemsRef.current[4] = el;
              buttonRef.current = el;
            }}
            type="submit"
            className="w-full py-4 rounded-xl bg-[#C6A969] text-white font-semibold tracking-wide transition hover:scale-105 hover:shadow-xl"
          >
            Submit Feedback
          </button>
        </form>

        <div
          ref={successRef}
          className="text-center mt-6 font-medium opacity-0"
        >
          ⭐ Thank you for staying with us!
        </div>

      </div>
    </div>
  );
}

export default Feedback;