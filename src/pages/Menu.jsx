import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Menu.css';

const menuData = [
  {
    id: 'beer',
    title: 'Beer',
    image: `${import.meta.env.BASE_URL}assets/Beer.png`,
    items: [
      { subtitle: 'Draft & Domestic' },
      { name: 'Kozel Premium Lager / Dark (500 ml)', price: '13 Lei' },
      { name: 'Kozel Premium Lager / Dark (300 ml)', price: '10 Lei' },
      { name: 'Ursus Premium (500/330 ml)', price: '10 Lei' },
      { name: 'Ursus Retro (500 ml)', price: '10 Lei' },
      { name: 'Ursus IPA / Nefiltrată (330 ml)', price: '15 Lei' },
      { name: 'Timișoreana (500 ml)', price: '10 Lei' },
      { subtitle: 'Imported & Specialty' },
      { name: 'Peroni / Peroni Capri', price: '14 Lei' },
      { name: 'Azuga (Märzen / Weißbier)', price: '18 Lei' },
      { name: 'Pilsner Urquell / Budweiser', price: '14-15 Lei' },
      { name: 'Csíki Sör Varieties', price: '14 Lei' },
      { name: 'Corona / Asahi', price: '15 Lei' },
      { name: 'Paulaner (500 ml)', price: '19 Lei' },
      { subtitle: 'Craft Beer (Bers Nova) - 500ml' },
      { name: 'Vulturar (Blondă/Pilsner/Brună)', price: '16 Lei' },
      { name: 'No Indie Rock – IPA (330 ml)', price: '16 Lei' }
    ]
  },
  {
    id: 'wines',
    title: 'Wines & Organic Selection',
    image: `${import.meta.env.BASE_URL}assets/Wines & Organic Selection.png`,
    items: [
      { subtitle: 'By the Glass (100 ml)' },
      { name: 'Caloian (Sauvignon/Fetească/Rosé)', price: '8 Lei' },
      { name: 'Navigo Compass Varieties', price: '8 Lei' },
      { subtitle: 'Szőnyi József Winery (Organic)' },
      { name: 'Cuvée / Riesling / Rosé', price: '9 Lei' },
      { name: 'Orange Wine 2021', price: '10 Lei' },
      { subtitle: 'Petro Vaselo' },
      { name: 'Chardonnay / Pinot Noir / Cabernet', price: '11 Lei' }
    ]
  },
  {
    id: 'shots',
    title: 'Shots & Spirits (25 ml)',
    image: `${import.meta.env.BASE_URL}assets/Shots & Spirits (25 ml).png`,
    items: [
      { name: 'Pălincă / Aperol / Jagermeister', price: '8 Lei' },
      { name: 'Unicum / Jack Daniel\'s / Absolut', price: '9 Lei' },
      { name: 'Tequila Olmeca (Silver/Gold)', price: '8 Lei' },
      { name: 'Hennessy VS / Bumbu Rum', price: '12-14 Lei' },
      { name: 'Tatratea / Tubi 60', price: '10 Lei' },
      { subtitle: 'Shot Cocktails' },
      { name: 'B52 / B54 / Kamikaze', price: '10 Lei' },
      { name: 'Alien Brain (Single / 4 Shots)', price: '10 / 40 Lei' }
    ]
  },
  {
    id: 'cocktails',
    title: 'Cocktails & Long Drinks',
    image: `${import.meta.env.BASE_URL}assets/Cocktails & Long Drinks.png`,
    items: [
      { subtitle: 'Long Drinks' },
      { name: 'Cuba Libre / Gin Tonic', price: '20 Lei' },
      { name: 'Mojito / Tequila Sunrise', price: '22 Lei' },
      { name: 'Tubi Soda / Tatratea Mix', price: '24 Lei' },
      { subtitle: 'Classic Cocktails' },
      { name: 'Aperol Spritz / Hugo', price: '23 Lei' },
      { name: 'Margarita / Negroni', price: '22 Lei' },
      { name: 'Long Island Tea', price: '30 Lei' }
    ]
  },
  {
    id: 'softdrinks',
    title: 'Soft Drinks & Snacks',
    image: `${import.meta.env.BASE_URL}assets/Soft Drinks & Snacks.png`,
    items: [
      { name: 'Pepsi / 7UP / Mirinda (330ml)', price: '9 Lei' },
      { name: 'Aqua Carpatica (500ml)', price: '8 Lei' },
      { name: 'Red Bull / Rockstar', price: '10-13 Lei' },
      { name: 'Lemonade (Fresh)', price: '13 Lei' },
      { subtitle: 'Snacks' },
      { name: 'Chips (Lay\'s/Mogyi)', price: '7 Lei' },
      { name: 'Vape / Cigarettes', price: 'At Bar' }
    ]
  },
  {
    id: 'coffee',
    title: 'Coffee & Tea',
    image: `${import.meta.env.BASE_URL}assets/Coffee & Tea.png`,
    items: [
      { name: 'Espresso / Ristretto', price: '8 Lei' },
      { name: 'Cappuccino / Latte', price: '9-10 Lei' },
      { name: 'Frappe / Ice Coffee', price: '10-12 Lei' },
      { name: 'Tea Selection', price: '9 Lei' }
    ]
  }
];

const Menu = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="menu-page section pt-20"
    >
      <div className="container">
        <div className="menu-header text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="section-title text-gradient"
          >
            Our Menu
          </motion.h1>
          <p className="menu-subtitle">Discover our wide selection of drinks and bites.</p>
        </div>

        <div className="menu-accordion">
          {menuData.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`menu-item glass ${expanded === category.id ? 'expanded' : ''}`}
            >
              <button 
                className="menu-item-header"
                onClick={() => toggleAccordion(category.id)}
              >
                <div className="menu-category-info">
                  <div className="category-image-wrapper">
                     <img src={category.image} alt={category.title} className="category-image" />
                  </div>
                  <h2>{category.title}</h2>
                </div>
                <motion.div 
                  animate={{ rotate: expanded === category.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={28} className="chevron-icon" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === category.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="menu-item-content-wrapper"
                  >
                    <div className="menu-item-content">
                      {category.items.map((item, idx) => (
                        <div key={idx} className={item.subtitle ? 'menu-subtitle-row' : 'menu-row'}>
                          {item.subtitle ? (
                            <h3 className="item-subtitle">{item.subtitle}</h3>
                          ) : (
                            <>
                              <span className="item-name">{item.name}</span>
                              <span className="item-separator"></span>
                              <span className="item-price text-gradient">{item.price}</span>
                            </>
                          )}
                        </div>
                      ))}
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

export default Menu;
