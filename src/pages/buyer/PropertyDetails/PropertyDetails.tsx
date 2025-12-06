import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Calendar, Eye, TrendingUp, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { mockProperties } from '@/data/mockProperties';
import { BidModal } from '@/components/bidding/BidModal/BidModal';
import styles from './PropertyDetails.module.css';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id) || mockProperties[0];
  const [showBidModal, setShowBidModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(property.isFavorited);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src={property.images[0]} alt={property.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <div className={styles.heroBadges}>
            {property.isVerified && <Badge variant="success">Verified</Badge>}
            {property.matchScore && <Badge variant="info">{property.matchScore}% Match</Badge>}
          </div>
        </div>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.main}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1>{property.title}</h1>
              <div className={styles.location}>
                <MapPin size={20} />
                <span>{property.address}, {property.city}, {property.state}</span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={`${styles.iconBtn} ${isFavorited ? styles.favorited : ''}`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
              <button className={styles.iconBtn}>
                <Share2 size={24} />
              </button>
            </div>
          </motion.div>

          <motion.div
            className={styles.specs}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.spec}>
              <Bed size={24} />
              <div>
                <div className={styles.specValue}>{property.bedrooms}</div>
                <div className={styles.specLabel}>Bedrooms</div>
              </div>
            </div>
            <div className={styles.spec}>
              <Bath size={24} />
              <div>
                <div className={styles.specValue}>{property.bathrooms}</div>
                <div className={styles.specLabel}>Bathrooms</div>
              </div>
            </div>
            <div className={styles.spec}>
              <Maximize size={24} />
              <div>
                <div className={styles.specValue}>{property.sqft.toLocaleString()}</div>
                <div className={styles.specLabel}>Sq Ft</div>
              </div>
            </div>
            <div className={styles.spec}>
              <Calendar size={24} />
              <div>
                <div className={styles.specValue}>{property.yearBuilt}</div>
                <div className={styles.specLabel}>Year Built</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Description</h2>
            <p>{property.description}</p>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Features & Amenities</h2>
            <div className={styles.features}>
              {property.features.map(feature => (
                <div key={feature} className={styles.feature}>✓ {feature}</div>
              ))}
              {property.amenities.map(amenity => (
                <div key={amenity} className={styles.feature}>✓ {amenity}</div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.sidebar}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.priceCard}>
            <div className={styles.priceLabel}>Current Bid</div>
            <div className={styles.price}>
              ${property.currentBid?.toLocaleString() || property.price.toLocaleString()}
            </div>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <Eye size={16} />
                <span>{property.viewCount} views</span>
              </div>
              <div className={styles.stat}>
                <TrendingUp size={16} />
                <span>{property.bidCount} bids</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => setShowBidModal(true)}
            >
              Place Bid
            </Button>

            <div className={styles.sellerInfo}>
              <h3>Seller Information</h3>
              <div className={styles.seller}>
                <div className={styles.sellerAvatar}>
                  {property.sellerName.charAt(0)}
                </div>
                <div>
                  <div className={styles.sellerName}>{property.sellerName}</div>
                  <div className={styles.sellerRating}>⭐ {property.sellerRating}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {showBidModal && (
        <BidModal
          property={property}
          onClose={() => setShowBidModal(false)}
          onSubmit={(amount) => {
            console.log('Bid submitted:', amount);
            setShowBidModal(false);
          }}
        />
      )}
    </div>
  );
};
