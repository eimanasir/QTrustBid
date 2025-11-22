import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, MapPin, DollarSign, Home } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard/PropertyCard';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { mockProperties } from '@/data/mockProperties';
import styles from './AIRecommendations.module.css';

export const AIRecommendations: React.FC = () => {
  const recommendations = mockProperties.map(p => ({
    ...p,
    aiMatchScore: Math.floor(Math.random() * 20) + 80,
  })).sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));

  const insights = [
    {
      icon: <TrendingUp size={24} />,
      title: 'Price Trends',
      description: 'Properties in your preferred areas are trending up 5% this month',
      action: 'View Analysis',
    },
    {
      icon: <MapPin size={24} />,
      title: 'New Neighborhoods',
      description: 'Palo Alto matches your lifestyle preferences with great schools',
      action: 'Explore Area',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Budget Optimization',
      description: 'You could get 15% more space by expanding your search radius',
      action: 'See Options',
    },
    {
      icon: <Home size={24} />,
      title: 'Similar Properties',
      description: '12 new listings match properties you\'ve favorited',
      action: 'View Matches',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerContent}>
            <Badge variant="ai">AI Powered</Badge>
            <h1>
              <Sparkles size={48} />
              Personalized Recommendations
            </h1>
            <p>Properties curated just for you based on your preferences and behavior</p>
          </div>
        </motion.div>

        <div className={styles.insights}>
          <h2>AI Insights</h2>
          <div className={styles.insightGrid}>
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                className={styles.insightCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.insightIcon}>{insight.icon}</div>
                <div className={styles.insightContent}>
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                  <Button variant="ghost" size="small">{insight.action}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.recommendations}>
          <div className={styles.sectionHeader}>
            <h2>Top Matches for You</h2>
            <p>Based on your search history and preferences</p>
          </div>

          <div className={styles.propertyGrid}>
            {recommendations.map((property, index) => (
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
                <div className={styles.matchReasons}>
                  <h4>Why this match?</h4>
                  <ul>
                    <li>✓ Matches your price range</li>
                    <li>✓ In your preferred location</li>
                    <li>✓ Similar to properties you liked</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.preferences}>
          <h3>Refine Your Preferences</h3>
          <p>Help us find better matches by updating your preferences</p>
          <Button variant="primary" size="large">
            Update Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
