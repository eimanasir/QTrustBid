import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, DollarSign, TrendingUp, Users, Plus, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button/Button';
import styles from './SellerDashboard.module.css';

export const SellerDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Listings', value: user?.totalListings || '0', icon: <Home size={24} />, color: '#2196F3' },
    { label: 'Total Sales', value: user?.totalSales || '0', icon: <DollarSign size={24} />, color: '#4CAF50' },
    { label: 'Pending Bids', value: '8', icon: <TrendingUp size={24} />, color: '#FF9800' },
    { label: 'Total Views', value: '1.2K', icon: <Eye size={24} />, color: '#9C27B0' },
  ];

  const recentListings = [
    { id: '1', title: 'Modern Downtown Condo', price: '$450,000', bids: 5, views: 234, status: 'active' },
    { id: '2', title: 'Luxury Beach House', price: '$1,200,000', bids: 12, views: 567, status: 'active' },
    { id: '3', title: 'Suburban Family Home', price: '$650,000', bids: 8, views: 345, status: 'pending' },
  ];

  const recentBids = [
    { property: 'Modern Downtown Condo', bidder: 'John Smith', amount: '$455,000', time: '2 hours ago' },
    { property: 'Luxury Beach House', bidder: 'Emily Davis', amount: '$1,250,000', time: '5 hours ago' },
    { property: 'Suburban Family Home', bidder: 'Michael Chen', amount: '$660,000', time: '1 day ago' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.welcome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Welcome back, {user?.name}!</h1>
            <p>{user?.agencyName || 'Property Seller'}</p>
          </div>
          <Link to="/add-property">
            <Button variant="primary" size="large" icon={<Plus size={20} />}>
              Add New Listing
            </Button>
          </Link>
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

        <div className={styles.grid}>
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.sectionHeader}>
              <h2>Your Listings</h2>
              <Link to="/my-listings">
                <Button variant="ghost" size="small">View All</Button>
              </Link>
            </div>
            <div className={styles.listingsList}>
              {recentListings.map((listing) => (
                <div key={listing.id} className={styles.listingItem}>
                  <div className={styles.listingInfo}>
                    <h3>{listing.title}</h3>
                    <p className={styles.price}>{listing.price}</p>
                  </div>
                  <div className={styles.listingStats}>
                    <span className={styles.stat}>
                      <Users size={16} /> {listing.bids} bids
                    </span>
                    <span className={styles.stat}>
                      <Eye size={16} /> {listing.views} views
                    </span>
                    <span className={`${styles.status} ${styles[listing.status]}`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <h2>Recent Bids</h2>
              <Link to="/bids-received">
                <Button variant="ghost" size="small">View All</Button>
              </Link>
            </div>
            <div className={styles.bidsList}>
              {recentBids.map((bid, index) => (
                <div key={index} className={styles.bidItem}>
                  <div className={styles.bidInfo}>
                    <h4>{bid.property}</h4>
                    <p className={styles.bidder}>{bid.bidder}</p>
                  </div>
                  <div className={styles.bidDetails}>
                    <p className={styles.bidAmount}>{bid.amount}</p>
                    <p className={styles.bidTime}>{bid.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
