import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendingUp, CheckCircle, Home, Mail, AlertCircle, Filter, Check } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './Notifications.module.css';

export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'bid', title: 'Outbid Alert', message: 'You have been outbid on Modern Downtown Condo', time: '5 min ago', read: false },
    { id: '2', type: 'message', title: 'New Message', message: 'Sarah Johnson sent you a message about Luxury Beach House', time: '1 hour ago', read: false },
    { id: '3', type: 'success', title: 'Bid Accepted', message: 'Your bid of $455,000 was accepted for Suburban Family Home', time: '2 hours ago', read: false },
    { id: '4', type: 'property', title: 'New Property Match', message: 'A new property matching your preferences is available', time: '3 hours ago', read: true },
    { id: '5', type: 'bid', title: 'Bid Placed', message: 'You successfully placed a bid of $450,000', time: '5 hours ago', read: true },
    { id: '6', type: 'alert', title: 'Price Drop', message: 'Mountain Retreat price dropped by $50,000', time: '1 day ago', read: true },
    { id: '7', type: 'success', title: 'Verification Complete', message: 'Your account has been verified', time: '2 days ago', read: true },
    { id: '8', type: 'message', title: 'New Message', message: 'Michael Chen replied to your inquiry', time: '2 days ago', read: true },
  ]);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'bid': return <TrendingUp size={20} />;
      case 'message': return <Mail size={20} />;
      case 'success': return <CheckCircle size={20} />;
      case 'property': return <Home size={20} />;
      case 'alert': return <AlertCircle size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Notifications</h1>
            <p>Stay updated with your activity</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="primary" icon={<Check size={16} />} onClick={markAllAsRead}>
              Mark All as Read ({unreadCount})
            </Button>
          )}
        </motion.div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            <Filter size={16} />
            All ({notifications.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
            onClick={() => setFilter('unread')}
          >
            <Bell size={16} />
            Unread ({unreadCount})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'read' ? styles.active : ''}`}
            onClick={() => setFilter('read')}
          >
            <CheckCircle size={16} />
            Read ({notifications.length - unreadCount})
          </button>
        </motion.div>

        <div className={styles.notificationsList}>
          {filteredNotifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              className={`${styles.notificationCard} ${!notif.read ? styles.unread : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => !notif.read && markAsRead(notif.id)}
            >
              <div className={`${styles.notifIcon} ${styles[notif.type]}`}>
                {getIcon(notif.type)}
              </div>
              <div className={styles.notifContent}>
                <div className={styles.notifHeader}>
                  <h3>{notif.title}</h3>
                  {!notif.read && <Badge variant="info">New</Badge>}
                </div>
                <p>{notif.message}</p>
                <span className={styles.notifTime}>{notif.time}</span>
              </div>
              {!notif.read && (
                <button 
                  className={styles.markReadBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notif.id);
                  }}
                >
                  <Check size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bell size={64} />
            <h2>No notifications</h2>
            <p>You're all caught up!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
