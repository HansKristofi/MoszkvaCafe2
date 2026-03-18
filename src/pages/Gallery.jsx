import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, FolderOpen } from 'lucide-react';
import './Gallery.css';

const albums = [
  {
    id: 1,
    title: 'Album 1',
    images: [
      '/assets/img1.jpg',
      '/assets/img2.jpg',
      '/assets/img3.jpg'
    ]
  },
  {
    id: 2,
    title: 'Album 2',
    images: [
      '/assets/img4.jpg',
      '/assets/img5.jpg',
      '/assets/img6.jpg'
    ]
  }
];

const Gallery = () => {
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Track strictly the currently opened album and index
  const [lightboxState, setLightboxState] = useState({ albumId: null, index: 0 });

  const toggleAlbum = (id) => {
    setExpandedAlbum(expandedAlbum === id ? null : id);
  };

  const openLightbox = (albumId, index) => {
    setLightboxState({ albumId, index });
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const currentAlbumData = albums.find(a => a.id === lightboxState.albumId);

  const nextImage = (e) => {
    e.stopPropagation();
    if (!currentAlbumData) return;
    setLightboxState(prev => ({
      ...prev,
      index: prev.index === currentAlbumData.images.length - 1 ? 0 : prev.index + 1
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!currentAlbumData) return;
    setLightboxState(prev => ({
      ...prev,
      index: prev.index === 0 ? currentAlbumData.images.length - 1 : prev.index - 1
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="gallery-page section pt-20"
    >
      <div className="container">
        <div className="gallery-header text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="section-title text-gradient"
          >
            Gallery Albums
          </motion.h1>
          <p className="gallery-subtitle">Click to expand our latest photo albums.</p>
        </div>

        <div className="albums-container">
          {albums.map((album, idx) => (
            <div key={album.id} className="album-wrapper glass">
              
              <div className="album-header" onClick={() => toggleAlbum(album.id)}>
                <div className="album-title-block">
                  <FolderOpen size={30} className="album-icon" />
                  <h2>{album.title}</h2>
                </div>
                <button className="btn-primary">
                  {expandedAlbum === album.id ? 'Close Album' : 'View Photos'}
                </button>
              </div>

              <AnimatePresence>
                {expandedAlbum === album.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="album-content-drawer"
                  >
                    <div className="album-grid">
                      {album.images.map((src, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="gallery-item-wrapper"
                          onClick={() => openLightbox(album.id, index)}
                        >
                          <img src={src} alt={`Gallery Item ${index + 1}`} className="gallery-item" loading="lazy" />
                          <div className="gallery-item-overlay">
                            <ZoomIn size={32} className="zoom-icon" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentAlbumData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={40} />
            </button>
            
            <button className="lightbox-nav prev" onClick={prevImage}>
              <ChevronLeft size={48} />
            </button>
            <button className="lightbox-nav next" onClick={nextImage}>
              <ChevronRight size={48} />
            </button>
            
            <motion.img 
              key={lightboxState.index}
              src={currentAlbumData.images[lightboxState.index]} 
              alt={`Fullscreen Item ${lightboxState.index + 1}`} 
              className="lightbox-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
