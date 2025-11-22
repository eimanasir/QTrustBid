import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Eye, TrendingUp, MapPin, Bed, Bath, Maximize, X } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { mockProperties } from '@/data/mockProperties';
import styles from './MyListings.module.css';

export const MyListings: React.FC = () => {
  const myListings = mockProperties.slice(0, 6);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [deletingProperty, setDeletingProperty] = useState<any>(null);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>My Listings</h1>
            <p>Manage your property listings</p>
          </div>
          <Link to="/add-property">
            <Button variant="primary" icon={<Plus size={20} />}>
              Add New Property
            </Button>
          </Link>
        </motion.div>

        <div className={styles.listingsList}>
          {myListings.map((property, index) => (
            <motion.div
              key={property.id}
              className={styles.listingCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.listingHeader} onClick={() => setExpandedId(expandedId === property.id ? null : property.id)}>
                <div className={styles.listingMainInfo}>
                  <img src={property.images[0]} alt={property.title} className={styles.listingThumb} />
                  <div>
                    <h3>{property.title}</h3>
                    <p className={styles.listingAddress}>
                      <MapPin size={14} />
                      {property.address}, {property.city}
                    </p>
                  </div>
                </div>
                <div className={styles.listingMeta}>
                  <div className={styles.listingPrice}>${property.price.toLocaleString()}</div>
                  <div className={styles.listingStats}>
                    <span><Eye size={14} /> {property.viewCount}</span>
                    <span><TrendingUp size={14} /> {property.bidCount}</span>
                  </div>
                  <Badge variant={property.status === 'active' ? 'success' : 'warning'}>
                    {property.status}
                  </Badge>
                  <button className={styles.expandBtn}>
                    {expandedId === property.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === property.id && (
                  <motion.div
                    className={styles.listingDetails}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailsSection}>
                        <h4>Property Details</h4>
                        <div className={styles.detailsFeatures}>
                          <span><Bed size={16} /> {property.bedrooms} Bedrooms</span>
                          <span><Bath size={16} /> {property.bathrooms} Bathrooms</span>
                          <span><Maximize size={16} /> {property.sqft} sqft</span>
                        </div>
                        <p className={styles.detailsDescription}>{property.description}</p>
                      </div>
                      <div className={styles.detailsSection}>
                        <h4>Performance</h4>
                        <div className={styles.performanceStats}>
                          <div className={styles.performanceStat}>
                            <span className={styles.statLabel}>Total Views</span>
                            <span className={styles.statValue}>{property.viewCount}</span>
                          </div>
                          <div className={styles.performanceStat}>
                            <span className={styles.statLabel}>Total Bids</span>
                            <span className={styles.statValue}>{property.bidCount}</span>
                          </div>
                          <div className={styles.performanceStat}>
                            <span className={styles.statLabel}>Starting Bid</span>
                            <span className={styles.statValue}>${property.startingBid.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.detailsActions}>
                      <Button 
                        variant="primary" 
                        icon={<Edit size={16} />}
                        onClick={() => setEditingProperty(property)}
                      >
                        Edit Property
                      </Button>
                      <Button 
                        variant="ghost" 
                        icon={<Trash2 size={16} />}
                        onClick={() => setDeletingProperty(property)}
                      >
                        Delete Property
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingProperty && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProperty(null)}
            >
              <motion.div
                className={styles.modal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Edit Property</h2>
                  <button className={styles.closeBtn} onClick={() => setEditingProperty(null)}>
                    <X size={24} />
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <p>Edit functionality would open a form here with property details.</p>
                  <div className={styles.editInfo}>
                    <strong>{editingProperty.title}</strong>
                    <span>Price: ${editingProperty.price.toLocaleString()}</span>
                  </div>
                  <div className={styles.modalActions}>
                    <Button variant="ghost" onClick={() => setEditingProperty(null)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        alert('Property updated successfully!');
                        setEditingProperty(null);
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deletingProperty && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingProperty(null)}
            >
              <motion.div
                className={styles.deleteModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Delete Property</h2>
                  <button className={styles.closeBtn} onClick={() => setDeletingProperty(null)}>
                    <X size={24} />
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <p className={styles.warningText}>
                    Are you sure you want to delete this property? This action cannot be undone.
                  </p>
                  <div className={styles.deleteInfo}>
                    <strong>{deletingProperty.title}</strong>
                    <span>{deletingProperty.address}</span>
                  </div>
                  <div className={styles.modalActions}>
                    <Button variant="ghost" onClick={() => setDeletingProperty(null)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        alert('Property deleted successfully!');
                        setDeletingProperty(null);
                      }}
                    >
                      Delete Property
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
