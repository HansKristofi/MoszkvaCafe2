import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import './Events.css';

const eventsData = [
  {
    id: 1,
    title: 'Weekend Party & Live Music',
    date: 'Every Friday & Saturday',
    image: '/assets/event1.jpg',
    description: 'Join us for an unforgettable weekend at Moszkva Café. Experience the best live music, vibrant atmosphere, and premium drinks. Our multicultural hub brings together the finest entertainment in Oradea City.'
  },
  {
    id: 2,
    title: 'Special Cultural Night',
    date: 'TBA',
    image: '/assets/event2.jpg',
    description: 'Immerse yourself in our special cultural nights where we celebrate independent arts, music, and community spirit. A perfect evening to relax and socialize.'
  }
];

const Events = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleEvent = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="events-page section pt-20"
    >
      <div className="container">
        <div className="events-header text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="section-title text-gradient"
          >
            Upcoming Events
          </motion.h1>
          <p className="events-subtitle">Be part of Oradea's vibrant cultural and entertainment scene.</p>
        </div>

        <div className="events-list">
          {eventsData.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`event-card glass ${expandedId === event.id ? 'expanded' : ''}`}
            >
              <div className="event-card-header" onClick={() => toggleEvent(event.id)}>
                <div className="event-info">
                  <h2 className="event-title">{event.title}</h2>
                  <div className="event-date">
                    <Calendar size={18} />
                    <span>{event.date}</span>
                  </div>
                </div>
                <motion.div 
                  animate={{ rotate: expandedId === event.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={32} className="event-chevron" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedId === event.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="event-content-wrapper"
                  >
                    <div className="event-content">
                      <div className="event-image-container">
                        <img src={event.image} alt={event.title} className="event-image" />
                      </div>
                      <div className="event-details">
                        <p>{event.description}</p>
                        <button className="btn-primary" style={{ marginTop: '1.5rem' }}>
                          RSVP & / OR Info
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Events;
