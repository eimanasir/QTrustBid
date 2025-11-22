import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Eye, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PropertyCard } from '@/components/property/PropertyCard/PropertyCard';
import { Button } from '@/components/common/Button/Button';
import { mockProperties } from '@/data/mockProperties';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const recommendedProperties = mockProperties.slice(0, 3);

  const stats = [
    { label: 'Saved Properties', value: '12', icon: <Heart size={24} /> },
    { label: 'Active Bids', value: '3', icon: <TrendingUp size={24} /> },
    { label: 'AI Matches', value: '8', icon: <Sparkles size={24} /> },
    { label: 'Properties Viewed', value: '45', icon: <Eye size={24} /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.welcome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Welcome back, {user?.name}!</h1>
          <p>Find your dream property with AI-powered recommendations</p>
        </motion.div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Recommended for You</h2>
              <p>Based on your preferences and browsing history</p>
            </div>
            <Link to="/ai-recommendations">
              <Button variant="ghost" icon={<Sparkles size={20} />}>
                View All
              </Button>
            </Link>
          </div>

          <div className={styles.propertyGrid}>
            {recommendedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
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

        <div className={styles.actions}>
          <Link to="/properties">
            <Button variant="primary" size="large">
              Browse All Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
