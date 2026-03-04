import React, { useEffect, useRef, useState } from "react";

// GSAP loaded via CDN in index.html:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
// Google Fonts: Cormorant Garamond + Jost

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Rooms", href: "/rooms" },
  { label: "Booking", href: "/booking" },
  { label: "Feedback", href: "/feedback" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const userRef = useRef(null);
  const lineRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/home");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    // Initial entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out" }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        userRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "expo.inOut" },
        "-=0.6"
      );

    // Scroll behavior
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll state transition via GSAP
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !navRef.current) return;

    gsap.to(navRef.current, {
      paddingTop: scrolled ? "8px" : "0px",
      paddingBottom: scrolled ? "8px" : "0px",
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [scrolled]);

  const handleLinkHover = (el, entering) => {
    const gsap = window.gsap;
    if (!gsap || !el) return;
    const dot = el.querySelector(".nav-dot");
    gsap.to(dot, {
      scaleX: entering ? 1 : 0,
      duration: 0.35,
      ease: entering ? "expo.out" : "power2.in",
    });
    gsap.to(el, {
      color: entering ? "#D4AF37" : "#e8dcc8",
      duration: 0.25,
    });
  };

  const handleLogoHover = (entering) => {
    const gsap = window.gsap;
    if (!gsap) return;
    gsap.to(logoRef.current, {
      letterSpacing: entering ? "0.2em" : "0.05em",
      duration: 0.5,
      ease: "expo.out",
    });
  };

  const toggleMenu = () => {
    const gsap = window.gsap;
    if (!gsap || !mobileMenuRef.current) return;
    if (!menuOpen) {
      setMenuOpen(true);
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5, ease: "expo.out" }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-link"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setMenuOpen(false),
      });
    }
  };

  return (
    <>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@200;300;400;500&display=swap');

        .luxe-nav {
          font-family: 'Jost', sans-serif;
        }
        .luxe-logo {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.05em;
        }
        .nav-dot {
          display: block;
          height: 1px;
          background: #D4AF37;
          transform: scaleX(0);
          transform-origin: left center;
          margin-top: 2px;
        }
        .nav-link-wrap {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          color: #e8dcc8;
        }
        .nav-link-wrap.active {
          color: #D4AF37 !important;
        }
        .nav-link-wrap.active .nav-dot {
          transform: scaleX(1) !important;
        }
        .scrolled-nav {
          background: rgba(10, 8, 5, 0.92) !important;
          box-shadow: 0 4px 40px rgba(0,0,0,0.5) !important;
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 1px;
          background: #e8dcc8;
          transition: all 0.3s ease;
        }
      `}</style>

      <nav
        ref={navRef}
        className={`luxe-nav fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "scrolled-nav" : ""
        }`}
        style={{
          background: scrolled
            ? "rgba(10,8,5,0.92)"
            : "linear-gradient(180deg, rgba(5,4,2,0.85) 0%, rgba(5,4,2,0.0) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="/home"
            ref={logoRef}
            className="luxe-logo text-2xl font-light tracking-widest text-white select-none"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            style={{ color: "#f0e6cc", letterSpacing: "0.05em" }}
          >
            LUXE<span style={{ color: "#D4AF37" }}>STAY</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => (linksRef.current[i] = el)}
                className={`nav-link-wrap text-xs font-light uppercase tracking-widest ${
                  activeLink === link.href ? "active" : ""
                }`}
                onClick={() => setActiveLink(link.href)}
                onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
                style={{ textDecoration: "none" }}
              >
                <span>{link.label}</span>
                <span className="nav-dot" />
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div ref={userRef} className="hidden md:flex items-center gap-6">
            <a
              href="/user"
              className="flex items-center gap-2 text-xs font-light uppercase tracking-widest transition-colors duration-300"
              style={{ color: "#e8dcc8", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#e8dcc8")}
            >
              <span style={{ fontSize: "14px" }}>◈</span>
              <span>Profile</span>
            </a>

            <a
              href="/logout"
              className="text-xs font-light uppercase tracking-widest px-5 py-2 transition-all duration-300"
              style={{
                color: "#1a1208",
                background: "#D4AF37",
                textDecoration: "none",
                letterSpacing: "0.15em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0c842";
                const gsap = window.gsap;
                if (gsap) gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#D4AF37";
                const gsap = window.gsap;
                if (gsap) gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
              }}
            >
              Sign Out
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={toggleMenu}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="hamburger-line" style={{ width: menuOpen ? "14px" : "22px" }} />
            <span className="hamburger-line" />
            <span className="hamburger-line" style={{ width: menuOpen ? "18px" : "22px" }} />
          </button>
        </div>

        {/* Decorative bottom line */}
        <div
          ref={lineRef}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)",
            opacity: scrolled ? 0 : 0.4,
            transition: "opacity 0.4s",
          }}
        />

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden"
            style={{
              background: "rgba(8,6,3,0.97)",
              borderTop: "1px solid rgba(212,175,55,0.2)",
              padding: "24px 32px 32px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-link block text-sm font-light uppercase tracking-widest py-3"
                style={{
                  color: activeLink === link.href ? "#D4AF37" : "#e8dcc8",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
                onClick={() => { setActiveLink(link.href); toggleMenu(); }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-6">
              <a href="/user" style={{ color: "#e8dcc8", textDecoration: "none", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Profile</a>
              <a href="/logout" style={{ color: "#1a1208", background: "#D4AF37", padding: "8px 20px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Sign Out</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
