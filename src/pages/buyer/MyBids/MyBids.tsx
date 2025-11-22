import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Bid } from '@/types';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import styles from './MyBids.module.css';

export const MyBids: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'won' | 'lost' | 'all'>('active');

  const mockBids: Bid[] = [
    {
      id: '1',
      propertyId: '1',
      bidderId: '1',
      bidderName: 'You',
      amount: 1250000,
      timestamp: new Date().toISOString(),
      status: 'active',
      isPreApproved: true,
      quantumSignature: 'QS-1234-5678-9012',
    },
    {
      id: '2',
      propertyId: '2',
      bidderId: '1',
      bidderName: 'You',
      amount: 2900000,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'outbid',
      isPreApproved: true,
      quantumSignature: 'QS-2345-6789-0123',
    },
    {
      id: '3',
      propertyId: '3',
      bidderId: '1',
      bidderName: 'You',
      amount: 3400000,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      status: 'won',
      isPreApproved: true,
      quantumSignature: 'QS-3456-7890-1234',
    },
  ];

  const filteredBids = mockBids.filter(bid => {
    if (activeTab === 'all') return true;
    return bid.status === activeTab;
  });

  const getStatusIcon = (status: Bid['status']) => {
    switch (status) {
      case 'active':
        return <TrendingUp size={20} />;
      case 'outbid':
        return <TrendingDown size={20} />;
      case 'won':
        return <CheckCircle size={20} />;
      case 'lost':
        return <XCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusBadge = (status: Bid['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="info">Leading</Badge>;
      case 'outbid':
        return <Badge variant="warning">Outbid</Badge>;
      case 'won':
        return <Badge variant="success">Won</Badge>;
      case 'lost':
        return <Badge variant="error">Lost</Badge>;
      default:
        return <Badge variant="info">Pending</Badge>;
    }
  };

  const stats = [
    { label: 'Active Bids', value: mockBids.filter(b => b.status === 'active').length, icon: <TrendingUp size={24} /> },
    { label: 'Won Bids', value: mockBids.filter(b => b.status === 'won').length, icon: <CheckCircle size={24} /> },
    { label: 'Total Bid Amount', value: `$${(mockBids.reduce((sum, b) => sum + b.amount, 0) / 1000000).toFixed(1)}M`, icon: <AlertCircle size={24} /> },
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
            <h1>My Bids</h1>
            <p>Track and manage all your property bids</p>
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
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.tabs}>
          {(['all', 'active', 'won', 'lost'] as const).map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className={styles.tabCount}>
                {tab === 'all' ? mockBids.length : mockBids.filter(b => b.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.bidsContainer}>
          {filteredBids.length === 0 ? (
            <div className={styles.emptyState}>
              <AlertCircle size={64} />
              <h3>No bids found</h3>
              <p>You haven't placed any bids in this category yet.</p>
              <Button variant="primary">Browse Properties</Button>
            </div>
          ) : (
            filteredBids.map((bid, index) => (
              <motion.div
                key={bid.id}
                className={styles.bidCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.bidHeader}>
                  <div className={styles.bidProperty}>
                    <img 
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200" 
                      alt="Property"
                      className={styles.bidImage}
                    />
                    <div>
                      <h3>Modern Downtown Loft</h3>
                      <p>123 Main Street, San Francisco, CA</p>
                    </div>
                  </div>
                  {getStatusBadge(bid.status)}
                </div>

                <div className={styles.bidDetails}>
                  <div className={styles.bidInfo}>
                    <div className={styles.bidAmount}>
                      <span className={styles.label}>Your Bid</span>
                      <span className={styles.value}>${bid.amount.toLocaleString()}</span>
                    </div>
                    <div className={styles.bidTime}>
                      <Clock size={16} />
                      <span>{new Date(bid.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className={styles.bidMeta}>
                    <div className={styles.metaItem}>
                      {getStatusIcon(bid.status)}
                      <span>Status: {bid.status}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Badge variant="quantum" icon={false}>Quantum Signed</Badge>
                    </div>
                  </div>
                </div>

                <div className={styles.bidActions}>
                  {bid.status === 'active' && (
                    <>
                      <Button variant="secondary" size="small">View Property</Button>
                      <Button variant="primary" size="small">Update Bid</Button>
                    </>
                  )}
                  {bid.status === 'outbid' && (
                    <>
                      <Button variant="secondary" size="small">View Property</Button>
                      <Button variant="primary" size="small">Place New Bid</Button>
                    </>
                  )}
                  {bid.status === 'won' && (
                    <>
                      <Button variant="secondary" size="small">View Details</Button>
                      <Button variant="primary" size="small">Proceed to Checkout</Button>
                    </>
                  )}
                  {bid.status === 'lost' && (
                    <Button variant="secondary" size="small">View Property</Button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
