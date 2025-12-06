import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, Share2, Filter } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard/PropertyCard';
import { Button } from '@/components/common/Button/Button';
import { mockProperties } from '@/data/mockProperties';
import styles from './Favorites.module.css';

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState(mockProperties.map(p => ({ ...p, isFavorited: true })));
  const [sortBy, setSortBy] = useState<'recent' | 'price' | 'match'>('recent');

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(p => p.id !== id));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'match':
        return (b.matchScore || 0) - (a.matchScore || 0);
      default:
        return 0;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>
              <Heart size={48} fill="currentColor" />
              Favorite Properties
            </h1>
            <p>{favorites.length} properties saved</p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="secondary" icon={<Share2 size={20} />}>
              Share List
            </Button>
            <Button variant="primary" icon={<Filter size={20} />}>
              Compare
            </Button>
          </div>
        </motion.div>

        <div className={styles.toolbar}>
          <div className={styles.sortOptions}>
            <span>Sort by:</span>
            <button
              className={sortBy === 'recent' ? styles.active : ''}
              onClick={() => setSortBy('recent')}
            >
              Recently Added
            </button>
            <button
              className={sortBy === 'price' ? styles.active : ''}
              onClick={() => setSortBy('price')}
            >
              Price
            </button>
            <button
              className={sortBy === 'match' ? styles.active : ''}
              onClick={() => setSortBy('match')}
            >
              AI Match
            </button>
          </div>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart size={64} />
            <h2>No favorites yet</h2>
            <p>Start exploring properties and save your favorites here</p>
            <Button variant="primary" size="large">
              Browse Properties
            </Button>
          </motion.div>
        ) : (
          <div className={styles.propertyGrid}>
            {sortedFavorites.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={styles.propertyWrapper}
              >
                <PropertyCard
                  property={property}
                  showAIMatch
                  onClick={(id) => window.location.href = `/properties/${id}`}
                  onFavorite={handleRemoveFavorite}
                />
                <div className={styles.cardActions}>
                  <button className={styles.actionBtn}>
                    <Share2 size={16} />
                    Share
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleRemoveFavorite(property.id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
