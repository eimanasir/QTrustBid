import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, DollarSign, TrendingUp, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '2,547', change: '+12%', icon: <Users size={24} />, color: '#2196F3' },
    { label: 'Active Listings', value: '1,234', change: '+8%', icon: <Home size={24} />, color: '#4CAF50' },
    { label: 'Total Revenue', value: '$2.4M', change: '+23%', icon: <DollarSign size={24} />, color: '#FF9800' },
    { label: 'Active Bids', value: '456', change: '+15%', icon: <TrendingUp size={24} />, color: '#9C27B0' },
  ];

  const systemHealth = [
    { metric: 'Server Status', status: 'Operational', icon: <CheckCircle size={20} />, color: '#4CAF50' },
    { metric: 'Database', status: 'Healthy', icon: <CheckCircle size={20} />, color: '#4CAF50' },
    { metric: 'API Response', status: '45ms avg', icon: <Activity size={20} />, color: '#2196F3' },
    { metric: 'Quantum Encryption', status: 'Active', icon: <CheckCircle size={20} />, color: '#4CAF50' },
  ];

  const recentActivity = [
    { user: 'John Smith', action: 'Placed bid on Modern Downtown Condo', time: '2 min ago', type: 'bid' },
    { user: 'Sarah Johnson', action: 'Listed new property: Luxury Beach House', time: '15 min ago', type: 'listing' },
    { user: 'Emily Davis', action: 'Registered as new buyer', time: '1 hour ago', type: 'user' },
    { user: 'Michael Chen', action: 'Won bid on Suburban Family Home', time: '2 hours ago', type: 'sale' },
    { user: 'Admin', action: 'System backup completed', time: '3 hours ago', type: 'system' },
  ];

  const pendingReviews = [
    { type: 'Property Verification', count: 12, priority: 'high' },
    { type: 'User KYC', count: 8, priority: 'medium' },
    { type: 'Dispute Resolution', count: 3, priority: 'high' },
    { type: 'Payment Issues', count: 5, priority: 'medium' },
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
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name} • System Overview</p>
          </div>
          <div className={styles.timestamp}>
            Last updated: {new Date().toLocaleTimeString()}
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
                <div className={styles.statChange} style={{ color: stat.color }}>
                  {stat.change} from last month
                </div>
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
              <h2>System Health</h2>
              <span className={styles.badge}>All Systems Operational</span>
            </div>
            <div className={styles.healthList}>
              {systemHealth.map((item, index) => (
                <div key={index} className={styles.healthItem}>
                  <div className={styles.healthIcon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className={styles.healthInfo}>
                    <h4>{item.metric}</h4>
                    <p>{item.status}</p>
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
              <h2>Pending Reviews</h2>
              <span className={styles.badge}>{pendingReviews.reduce((a, b) => a + b.count, 0)} items</span>
            </div>
            <div className={styles.reviewsList}>
              {pendingReviews.map((item, index) => (
                <div key={index} className={styles.reviewItem}>
                  <div className={styles.reviewInfo}>
                    <h4>{item.type}</h4>
                    <span className={`${styles.priority} ${styles[item.priority]}`}>
                      {item.priority} priority
                    </span>
                  </div>
                  <div className={styles.reviewCount}>
                    <Clock size={16} />
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.activitySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Recent Activity</h2>
            <button className={styles.refreshBtn}>
              <Activity size={16} /> Refresh
            </button>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                  {activity.type === 'bid' && <TrendingUp size={16} />}
                  {activity.type === 'listing' && <Home size={16} />}
                  {activity.type === 'user' && <Users size={16} />}
                  {activity.type === 'sale' && <DollarSign size={16} />}
                  {activity.type === 'system' && <AlertCircle size={16} />}
                </div>
                <div className={styles.activityInfo}>
                  <p className={styles.activityUser}>{activity.user}</p>
                  <p className={styles.activityAction}>{activity.action}</p>
                </div>
                <div className={styles.activityTime}>{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
