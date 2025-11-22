import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Home, DollarSign, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './Analytics.module.css';

export const Analytics: React.FC = () => {
  const metrics = [
    { label: 'Total Revenue', value: '$2.4M', change: '+23%', trend: 'up', icon: <DollarSign size={24} />, color: '#4CAF50' },
    { label: 'New Users', value: '1,234', change: '+12%', trend: 'up', icon: <Users size={24} />, color: '#2196F3' },
    { label: 'Properties Listed', value: '456', change: '+8%', trend: 'up', icon: <Home size={24} />, color: '#FF9800' },
    { label: 'Avg. Bid Value', value: '$425K', change: '-3%', trend: 'down', icon: <TrendingUp size={24} />, color: '#9C27B0' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 180000, users: 120 },
    { month: 'Feb', revenue: 220000, users: 145 },
    { month: 'Mar', revenue: 195000, users: 132 },
    { month: 'Apr', revenue: 245000, users: 178 },
    { month: 'May', revenue: 280000, users: 195 },
    { month: 'Jun', revenue: 310000, users: 220 },
  ];

  const topProperties = [
    { title: 'Luxury Beach House', views: 2340, bids: 45, revenue: '$1.2M' },
    { title: 'Modern Downtown Condo', views: 1890, bids: 38, revenue: '$450K' },
    { title: 'Suburban Family Home', views: 1560, bids: 32, revenue: '$650K' },
    { title: 'Mountain Retreat', views: 1420, bids: 28, revenue: '$890K' },
    { title: 'Urban Loft', views: 1280, bids: 25, revenue: '$380K' },
  ];

  const userGrowth = [
    { category: 'Buyers', count: 1547, percentage: 61 },
    { category: 'Sellers', count: 823, percentage: 32 },
    { category: 'Admins', count: 177, percentage: 7 },
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
            <h1>Analytics Dashboard</h1>
            <p>Platform performance and insights</p>
          </div>
          <div className={styles.period}>
            <button className={styles.periodBtn}>Last 7 days</button>
            <button className={`${styles.periodBtn} ${styles.active}`}>Last 30 days</button>
            <button className={styles.periodBtn}>Last 90 days</button>
          </div>
        </motion.div>

        <div className={styles.metrics}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={styles.metricCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ borderTopColor: metric.color }}
            >
              <div className={styles.metricIcon} style={{ color: metric.color }}>
                {metric.icon}
              </div>
              <div className={styles.metricContent}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={`${styles.metricChange} ${styles[metric.trend]}`}>
                  {metric.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {metric.change} from last period
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.chartSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.sectionHeader}>
              <h2>Revenue Trend</h2>
              <Activity size={20} />
            </div>
            <div className={styles.chart}>
              {revenueData.map((data) => (
                <div key={data.month} className={styles.chartBar}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(data.revenue / 310000) * 100}%` }}
                  >
                    <span className={styles.barValue}>${(data.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className={styles.barLabel}>{data.month}</div>
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
              <h2>User Distribution</h2>
            </div>
            <div className={styles.userDistribution}>
              {userGrowth.map((item) => (
                <div key={item.category} className={styles.distributionItem}>
                  <div className={styles.distributionInfo}>
                    <span className={styles.distributionLabel}>{item.category}</span>
                    <span className={styles.distributionCount}>{item.count}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className={styles.percentage}>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Top Performing Properties</h2>
          </div>
          <div className={styles.propertiesTable}>
            <div className={styles.tableHeader}>
              <div>Property</div>
              <div>Views</div>
              <div>Bids</div>
              <div>Revenue</div>
            </div>
            {topProperties.map((property, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.propertyName}>{property.title}</div>
                <div className={styles.views}>{property.views.toLocaleString()}</div>
                <div className={styles.bids}>{property.bids}</div>
                <div className={styles.revenue}>{property.revenue}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
