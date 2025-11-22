import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import styles from './BidsReceived.module.css';

export const BidsReceived: React.FC = () => {
  const [bids, setBids] = useState([
    { id: '1', property: 'Modern Downtown Condo', bidder: 'John Smith', amount: 455000, time: '2 hours ago', status: 'pending' },
    { id: '2', property: 'Luxury Beach House', bidder: 'Emily Davis', amount: 1250000, time: '5 hours ago', status: 'pending' },
    { id: '3', property: 'Suburban Family Home', bidder: 'Michael Chen', amount: 660000, time: '1 day ago', status: 'accepted' },
    { id: '4', property: 'Modern Downtown Condo', bidder: 'Sarah Johnson', amount: 445000, time: '2 days ago', status: 'rejected' },
  ]);

  const handleAcceptBid = (bidId: string, bidder: string, amount: number) => {
    if (window.confirm(`Accept bid of $${amount.toLocaleString()} from ${bidder}?`)) {
      setBids(prevBids =>
        prevBids.map(bid =>
          bid.id === bidId ? { ...bid, status: 'accepted' } : bid
        )
      );
      alert('Bid accepted successfully!');
    }
  };

  const handleRejectBid = (bidId: string, bidder: string) => {
    if (window.confirm(`Reject bid from ${bidder}?`)) {
      setBids(prevBids =>
        prevBids.map(bid =>
          bid.id === bidId ? { ...bid, status: 'rejected' } : bid
        )
      );
      alert('Bid rejected.');
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
            <h1>Bids Received</h1>
            <p>Review and manage bids on your properties</p>
          </div>
        </motion.div>

        <div className={styles.bidsList}>
          {bids.map((bid, index) => (
            <motion.div
              key={bid.id}
              className={styles.bidCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.bidHeader}>
                <div>
                  <h3>{bid.property}</h3>
                  <div className={styles.bidder}>
                    <User size={16} />
                    {bid.bidder}
                  </div>
                </div>
                <div className={`${styles.status} ${styles[bid.status]}`}>
                  {bid.status}
                </div>
              </div>
              <div className={styles.bidDetails}>
                <div className={styles.amount}>
                  <DollarSign size={24} />
                  ${bid.amount.toLocaleString()}
                </div>
                <div className={styles.time}>
                  <Clock size={16} />
                  {bid.time}
                </div>
              </div>
              {bid.status === 'pending' && (
                <div className={styles.actions}>
                  <Button 
                    variant="primary" 
                    icon={<CheckCircle size={16} />} 
                    fullWidth
                    onClick={() => handleAcceptBid(bid.id, bid.bidder, bid.amount)}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="ghost" 
                    icon={<XCircle size={16} />} 
                    fullWidth
                    onClick={() => handleRejectBid(bid.id, bid.bidder)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
