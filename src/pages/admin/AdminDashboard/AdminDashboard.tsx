import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, DollarSign, TrendingUp, Activity, CheckCircle, Clock, BarChart3, AlertCircle } from 'lucide-react';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,547', change: '+12%', goal: 70 },
    { label: 'Active Listings', value: '1,234', change: '+8%', goal: 75 },
    { label: 'Total Revenue', value: '$2.4M', change: '+23%', goal: 85 },
    { label: 'Active Bids', value: '456', change: '+15%', goal: 60 },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 85, users: 120, properties: 90 },
    { month: 'Feb', revenue: 95, users: 140, properties: 110 },
    { month: 'Mar', revenue: 110, users: 180, properties: 130 },
    { month: 'Apr', revenue: 125, users: 220, properties: 150 },
    { month: 'May', revenue: 140, users: 260, properties: 180 },
    { month: 'Jun', revenue: 155, users: 310, properties: 210 },
  ];

  const systemHealth = [
    { metric: 'Server Status', status: 'Operational', icon: <CheckCircle size={20} />, color: '#4CAF50' },
    { metric: 'Database', status: 'Healthy', icon: <CheckCircle size={20} />, color: '#4CAF50' },
    { metric: 'API Response', status: '45ms avg', icon: <Activity size={20} />, color: '#2196F3' },
    { metric: 'Security', status: 'Active', icon: <CheckCircle size={20} />, color: '#4CAF50' },
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
        <div className={styles.welcome}>
          <div>
            <h1>Dashboard</h1>
            <p>Dashboard / Sales</p>
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statChange} style={{ color: stat.change.startsWith('+') ? '#4CAF50' : '#F44336' }}>
                {stat.change}
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${stat.goal}%` }} />
              </div>
              <div className={styles.goalText}>
                <span>Monthly Goal</span>
                <span>{stat.goal}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.chartSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.sectionHeader}>
            <h2><BarChart3 size={20} /> Monthly Overview</h2>
          </div>
          <div className={styles.chart}>
            <div className={styles.chartBars}>
              {monthlyData.map((data, index) => {
                const maxValue = 310;
                const revenueHeight = (data.revenue / maxValue) * 100;
                const usersHeight = (data.users / maxValue) * 100;
                const propertiesHeight = (data.properties / maxValue) * 100;
                
                return (
                  <div key={index} className={styles.chartBar}>
                    <div className={styles.barGroup}>
                      <div 
                        className={styles.bar} 
                        style={{ height: `${revenueHeight}%`, background: '#2196F3' }}
                        title={`Revenue: ${data.revenue}`}
                      />
                      <div 
                        className={styles.bar} 
                        style={{ height: `${usersHeight}%`, background: '#4CAF50' }}
                        title={`Users: ${data.users}`}
                      />
                      <div 
                        className={styles.bar} 
                        style={{ height: `${propertiesHeight}%`, background: '#FF9800' }}
                        title={`Properties: ${data.properties}`}
                      />
                    </div>
                    <div className={styles.barLabel}>{data.month}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ background: '#2196F3' }} />
                <span>Revenue</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ background: '#4CAF50' }} />
                <span>Users</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ background: '#FF9800' }} />
                <span>Properties</span>
              </div>
            </div>
          </div>
        </motion.div>

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
