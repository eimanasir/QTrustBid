import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
  showAIMatch?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavorite,
  onClick,
  showAIMatch = false,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(property.id);
  };

  return (
    <motion.article
      className={styles.card}
      onClick={() => onClick?.(property.id)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.imageContainer}>
        <img
          src={property.images[0]}
          alt={property.title}
          className={styles.image}
          loading="lazy"
        />
        
        <div className={styles.badges}>
          {property.isVerified && (
            <Badge variant="success">Verified</Badge>
          )}
          {showAIMatch && property.matchScore && (
            <Badge variant="info">{property.matchScore}% Match</Badge>
          )}
        </div>

        <button
          className={`${styles.favoriteBtn} ${property.isFavorited ? styles.favorited : ''}`}
          onClick={handleFavoriteClick}
          aria-label={property.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={20} fill={property.isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{property.title}</h3>
        
        <div className={styles.location}>
          <MapPin size={16} />
          <span>{property.address}, {property.city}</span>
        </div>

        <div className={styles.specs}>
          <span><Bed size={16} /> {property.bedrooms} bed</span>
          <span className={styles.divider}>•</span>
          <span><Bath size={16} /> {property.bathrooms} bath</span>
          <span className={styles.divider}>•</span>
          <span><Maximize size={16} /> {property.sqft.toLocaleString()} sqft</span>
        </div>

        <div className={styles.price}>
          ${property.currentBid?.toLocaleString() || property.price.toLocaleString()}
        </div>
      </div>
    </motion.article>
  );
};
