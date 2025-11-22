import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Search, MoreVertical, Shield, CheckCircle, XCircle, Mail } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './Users.module.css';

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'buyer' | 'seller' | 'admin'>('all');

  const users = [
    { id: '1', name: 'John Smith', email: 'buyer@qtrustbid.com', role: 'buyer', verified: true, joined: '2024-04-10', bids: 5, status: 'active' },
    { id: '2', name: 'Emily Davis', email: 'bidder@qtrustbid.com', role: 'buyer', verified: true, joined: '2024-05-20', bids: 12, status: 'active' },
    { id: '3', name: 'Sarah Johnson', email: 'seller@qtrustbid.com', role: 'seller', verified: true, joined: '2024-02-15', listings: 12, status: 'active' },
    { id: '4', name: 'Michael Chen', email: 'agent@qtrustbid.com', role: 'seller', verified: true, joined: '2024-03-01', listings: 25, status: 'active' },
    { id: '5', name: 'Admin User', email: 'admin@qtrustbid.com', role: 'admin', verified: true, joined: '2024-01-01', status: 'active' },
    { id: '6', name: 'David Wilson', email: 'david@example.com', role: 'buyer', verified: false, joined: '2024-11-15', bids: 0, status: 'pending' },
    { id: '7', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'seller', verified: false, joined: '2024-11-18', listings: 2, status: 'pending' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: 'Total Users', value: users.length, color: '#2196F3' },
    { label: 'Buyers', value: users.filter(u => u.role === 'buyer').length, color: '#4CAF50' },
    { label: 'Sellers', value: users.filter(u => u.role === 'seller').length, color: '#FF9800' },
    { label: 'Pending Verification', value: users.filter(u => !u.verified).length, color: '#F44336' },
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
            <h1>User Management</h1>
            <p>Manage and monitor all platform users</p>
          </div>
          <Button variant="primary" icon={<UsersIcon size={20} />}>
            Add User
          </Button>
        </motion.div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ borderLeftColor: stat.color }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={20} />}
              />
            </div>
            <div className={styles.filters}>
              <button
                className={`${styles.filterBtn} ${filterRole === 'all' ? styles.active : ''}`}
                onClick={() => setFilterRole('all')}
              >
                All
              </button>
              <button
                className={`${styles.filterBtn} ${filterRole === 'buyer' ? styles.active : ''}`}
                onClick={() => setFilterRole('buyer')}
              >
                Buyers
              </button>
              <button
                className={`${styles.filterBtn} ${filterRole === 'seller' ? styles.active : ''}`}
                onClick={() => setFilterRole('seller')}
              >
                Sellers
              </button>
              <button
                className={`${styles.filterBtn} ${filterRole === 'admin' ? styles.active : ''}`}
                onClick={() => setFilterRole('admin')}
              >
                Admins
              </button>
            </div>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHead}>
              <div>User</div>
              <div>Role</div>
              <div>Status</div>
              <div>Activity</div>
              <div>Joined</div>
              <div>Actions</div>
            </div>
            <div className={styles.tableBody}>
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  className={styles.tableRow}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </div>
                  <div>
                    <Badge variant={user.role === 'admin' ? 'error' : user.role === 'seller' ? 'success' : 'info'}>
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <div className={styles.statusBadge}>
                      {user.verified ? (
                        <span className={styles.verified}>
                          <CheckCircle size={16} /> Verified
                        </span>
                      ) : (
                        <span className={styles.pending}>
                          <XCircle size={16} /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.activity}>
                    {user.role === 'buyer' && `${user.bids} bids`}
                    {user.role === 'seller' && `${user.listings} listings`}
                    {user.role === 'admin' && 'Full access'}
                  </div>
                  <div className={styles.date}>
                    {new Date(user.joined).toLocaleDateString()}
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Mail size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <Shield size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
