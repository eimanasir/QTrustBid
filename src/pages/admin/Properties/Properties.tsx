import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Eye, TrendingUp, CheckCircle, AlertCircle, X, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import { mockProperties } from '@/data/mockProperties';
import styles from './Properties.module.css';

export const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  
  // Initialize properties with stable verification status
  const [properties, setProperties] = useState(() => 
    mockProperties.map((p, index) => ({
      ...p,
      seller: p.sellerName,
      verificationStatus: index % 3 === 0 ? 'pending' : 'verified', // Stable assignment
    }))
  );

  const handleVerify = (propertyId: string) => {
    setProperties(prev => 
      prev.map(p => 
        p.id === propertyId 
          ? { ...p, verificationStatus: 'verified' }
          : p
      )
    );
    alert('Property verified successfully!');
    setShowVerifyModal(false);
    setSelectedProperty(null);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Properties', value: properties.length, color: '#2196F3', icon: <Home size={24} /> },
    { label: 'Active Listings', value: properties.filter(p => p.status === 'active').length, color: '#4CAF50', icon: <CheckCircle size={24} /> },
    { label: 'Pending Review', value: properties.filter(p => p.verificationStatus === 'pending').length, color: '#FF9800', icon: <AlertCircle size={24} /> },
    { label: 'Total Views', value: properties.reduce((sum, p) => sum + p.viewCount, 0).toLocaleString(), color: '#9C27B0', icon: <Eye size={24} /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Property Management</h1>
            <p>Monitor and manage all property listings</p>
          </div>
        </motion.div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ borderTopColor: stat.color }}
            >
              <div className={styles.statIcon} style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.tableSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.tableHeader}>
            <div className={styles.searchBar}>
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={20} />}
              />
            </div>
            <div className={styles.filters}>
              <button
                className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button
                className={`${styles.filterBtn} ${filterStatus === 'active' ? styles.active : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                Active
              </button>
              <button
                className={`${styles.filterBtn} ${filterStatus === 'pending' ? styles.active : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button
                className={`${styles.filterBtn} ${filterStatus === 'sold' ? styles.active : ''}`}
                onClick={() => setFilterStatus('sold')}
              >
                Sold
              </button>
            </div>
          </div>

          <div className={styles.propertyGrid}>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className={styles.propertyCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.propertyImage}>
                  <img src={property.images[0]} alt={property.title} />
                  <div className={styles.propertyBadges}>
                    <Badge variant={property.status === 'active' ? 'success' : property.status === 'pending' ? 'warning' : 'info'}>
                      {property.status}
                    </Badge>
                    {property.verificationStatus === 'verified' && (
                      <Badge variant="quantum">
                        <CheckCircle size={14} /> Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={styles.propertyInfo}>
                  <h3>{property.title}</h3>
                  <p className={styles.propertyAddress}>{property.address}, {property.city}</p>
                  <div className={styles.propertyPrice}>${property.price.toLocaleString()}</div>
                  <div className={styles.propertyStats}>
                    <span><Eye size={16} /> {property.viewCount}</span>
                    <span><TrendingUp size={16} /> {property.bidCount} bids</span>
                  </div>
                  <div className={styles.propertySeller}>
                    Seller: {property.seller}
                  </div>
                  <div className={styles.propertyActions}>
                    <Button variant="ghost" size="small" onClick={() => setSelectedProperty(property)}>
                      View Details
                    </Button>
                    {property.verificationStatus === 'pending' && (
                      <Button 
                        variant="primary" 
                        size="small"
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowVerifyModal(true);
                        }}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Property Details Modal */}
        <AnimatePresence>
          {selectedProperty && !showVerifyModal && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
            >
              <motion.div
                className={styles.modal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>{selectedProperty.title}</h2>
                  <button className={styles.closeBtn} onClick={() => setSelectedProperty(null)}>
                    <X size={24} />
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <img src={selectedProperty.images[0]} alt={selectedProperty.title} className={styles.modalImage} />
                  <div className={styles.modalInfo}>
                    <div className={styles.modalPrice}>${selectedProperty.price.toLocaleString()}</div>
                    <div className={styles.modalLocation}>
                      <MapPin size={16} />
                      {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}
                    </div>
                    <div className={styles.modalFeatures}>
                      <span><Bed size={16} /> {selectedProperty.bedrooms} beds</span>
                      <span><Bath size={16} /> {selectedProperty.bathrooms} baths</span>
                      <span><Maximize size={16} /> {selectedProperty.sqft} sqft</span>
                    </div>
                    <div className={styles.modalDescription}>
                      <h3>Description</h3>
                      <p>{selectedProperty.description}</p>
                    </div>
                    <div className={styles.modalStats}>
                      <div><Eye size={16} /> {selectedProperty.viewCount} views</div>
                      <div><TrendingUp size={16} /> {selectedProperty.bidCount} bids</div>
                    </div>
                    <div className={styles.modalSeller}>
                      <strong>Seller:</strong> {selectedProperty.seller}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify Modal */}
        <AnimatePresence>
          {showVerifyModal && selectedProperty && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVerifyModal(false)}
            >
              <motion.div
                className={styles.verifyModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>Verify Property</h2>
                  <button className={styles.closeBtn} onClick={() => setShowVerifyModal(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <p>Are you sure you want to verify this property?</p>
                  <div className={styles.verifyInfo}>
                    <strong>{selectedProperty.title}</strong>
                    <span>{selectedProperty.address}</span>
                  </div>
                  <div className={styles.modalActions}>
                    <Button variant="ghost" onClick={() => setShowVerifyModal(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      icon={<CheckCircle size={16} />}
                      onClick={() => handleVerify(selectedProperty.id)}
                    >
                      Verify Property
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
