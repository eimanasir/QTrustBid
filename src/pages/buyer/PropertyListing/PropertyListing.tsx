import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard/PropertyCard';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { mockProperties } from '@/data/mockProperties';
import styles from './PropertyListing.module.css';

export const PropertyListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [properties] = useState(mockProperties);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Browse Properties</h1>
            <p>{properties.length} properties available</p>
          </div>
        </motion.div>

        <div className={styles.toolbar}>
          <div className={styles.searchBar}>
            <Input
              type="text"
              placeholder="Search by location, property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={20} />}
            />
          </div>

          <div className={styles.toolbarActions}>
            <Button
              variant="secondary"
              icon={<SlidersHorizontal size={20} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>

            <div className={styles.viewToggle}>
              <button
                className={viewMode === 'grid' ? styles.active : ''}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                className={viewMode === 'list' ? styles.active : ''}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <motion.div
            className={styles.filters}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className={styles.filterGroup}>
              <label>Price Range</label>
              <div className={styles.priceInputs}>
                <Input type="number" placeholder="Min" />
                <span>to</span>
                <Input type="number" placeholder="Max" />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Bedrooms</label>
              <select className={styles.select}>
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Property Type</label>
              <select className={styles.select}>
                <option>All Types</option>
                <option>House</option>
                <option>Condo</option>
                <option>Land</option>
              </select>
            </div>

            <Button variant="primary">Apply Filters</Button>
          </motion.div>
        )}

        <div className={`${styles.propertyGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PropertyCard
                property={property}
                showAIMatch
                onClick={(id) => window.location.href = `/properties/${id}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
