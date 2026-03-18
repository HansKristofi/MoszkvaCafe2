import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = ['/assets/photo1home.jpg', '/assets/photo2home.jpg', '/assets/photo3home.jpg'];

  const [tickerWidth, setTickerWidth] = useState(0);
  const tickerRef = useRef();

  useEffect(() => {
    if (tickerRef.current) {
      setTickerWidth(tickerRef.current.scrollWidth - tickerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (tickerRef.current) {
        setTickerWidth(tickerRef.current.scrollWidth - tickerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Auto-slide functionally removed as requested.

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-page"
    >
      {/* 1. Hero Section (Smaller image, text under it, all white text) */}
      <section className="hero-section text-center">
        <motion.div 
          className="hero-image-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src="/assets/heroimage.png" alt="Moszkva Café Hero" className="hero-image" />
        </motion.div>
        
        <div className="container hero-content">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="hero-title"
          >
            <span>MOSZKVA CAFÉ</span> IS AN INDEPENDENT MULTICULTURAL AND ENTERTAINMENT CENTER IN ORADEA CITY
          </motion.h1>
        </div>
      </section>

      {/* 2. Ticker Section (Swipable with Framer Motion) */}
      <section className="ticker-section section">
        <div className="container">
          <h2 className="section-title text-center">Latest Promotions</h2>
        </div>
        <motion.div ref={tickerRef} className="ticker-wrapper" whileTap={{ cursor: "grabbing" }}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -tickerWidth }}
            dragElastic={0.1}
            className="swipable-track"
          >
            {[1, 2, 3, 4, 5, 6].map((num, idx) => (
              <motion.div key={idx} className="ticker-item snap-item" whileHover={{ scale: 1.02 }}>
                <img src={`/assets/${num}.webp`} alt={`Promotion ${num}`} loading="lazy" draggable="false" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Photo Slider Section */}
      <section className="slider-section section">
        <div className="container">
          <h2 className="section-title text-center">Atmosphere</h2>
          <div className="slider-container glass">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide]}
                alt={`Atmosphere ${currentSlide + 1}`}
                className="slider-image"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            
            <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous image">
              <ChevronLeft size={32} />
            </button>
            <button className="slider-btn next" onClick={nextSlide} aria-label="Next image">
              <ChevronRight size={32} />
            </button>
            
            <div className="slider-dots">
              {sliderImages.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Location Maps Section */}
      <section className="location-section section">
        <div className="container">
          <h2 className="section-title text-center">Find Us</h2>
          <div className="map-container glass">
            <iframe 
              src="https://maps.google.com/maps?q=Strada%20Moscovei%2012,%20410001%20Oradea&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Moszkva Cafe Location"
            ></iframe>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
