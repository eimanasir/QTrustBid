import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import styles from './AddProperty.module.css';

export const AddProperty: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Home size={48} />
          <h1>Add New Property</h1>
          <p>List your property on QTrustBid</p>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.section}>
            <h2>Basic Information</h2>
            <div className={styles.grid}>
              <Input label="Property Title" placeholder="Modern Downtown Condo" required />
              <Input label="Property Type" placeholder="Condo, House, Land..." required />
              <Input label="Price" type="number" placeholder="450000" icon={<DollarSign size={20} />} required />
              <Input label="Starting Bid" type="number" placeholder="400000" icon={<DollarSign size={20} />} required />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Location</h2>
            <div className={styles.grid}>
              <Input label="Address" placeholder="123 Main Street" icon={<MapPin size={20} />} required />
              <Input label="City" placeholder="San Francisco" required />
              <Input label="State" placeholder="CA" required />
              <Input label="ZIP Code" placeholder="94102" required />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Property Details</h2>
            <div className={styles.grid}>
              <Input label="Bedrooms" type="number" placeholder="3" required />
              <Input label="Bathrooms" type="number" placeholder="2" required />
              <Input label="Square Feet" type="number" placeholder="1500" required />
              <Input label="Year Built" type="number" placeholder="2020" required />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Description</h2>
            <textarea
              className={styles.textarea}
              rows={6}
              placeholder="Describe your property..."
              required
            />
          </div>

          <div className={styles.section}>
            <h2>Photos</h2>
            <div className={styles.uploadArea}>
              <Upload size={48} />
              <p>Click to upload or drag and drop</p>
              <span>PNG, JPG up to 10MB</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="ghost" size="large">
              Save as Draft
            </Button>
            <Button type="submit" variant="primary" size="large" loading={loading}>
              Publish Listing
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};
