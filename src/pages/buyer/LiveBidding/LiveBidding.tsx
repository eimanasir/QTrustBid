import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './LiveBidding.module.css';

export const LiveBidding: React.FC = () => {
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 29, seconds: 45 });
  const [loading, setLoading] = useState(false);

  const currentHighestBid = 2900000;
  const minBid = currentHighestBid + 5000;
  const totalBidders = 12;
  const yourCurrentBid = 2850000;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setBidAmount('');
  };

  const quickBids = [5000, 10000, 25000, 50000];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back to My Bids
        </button>

        {/* Countdown Timer */}
        <motion.div
          className={styles.countdown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.countdownHeader}>
            <Clock size={24} />
            <span>Bidding Ends In</span>
            <Badge variant="success">
              <span className={styles.liveDot}></span>
              Live Now
            </Badge>
          </div>
          <div className={styles.countdownTimer}>
            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className={styles.timeLabel}>Hours</div>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className={styles.timeLabel}>Minutes</div>
            </div>
            <div className={styles.timeSeparator}>:</div>
            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className={styles.timeLabel}>Seconds</div>
            </div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {/* Property Info */}
          <div className={styles.propertySection}>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" 
              alt="Property"
              className={styles.propertyImage}
            />
            <div className={styles.propertyInfo}>
              <h1>Modern Downtown Loft</h1>
              <p>123 Main Street, San Francisco, CA</p>
              <div className={styles.propertyMeta}>
                <span>3 bed</span>
                <span>•</span>
                <span>2 bath</span>
                <span>•</span>
                <span>1,850 sqft</span>
              </div>
            </div>
          </div>

          {/* Bidding Panel */}
          <div className={styles.biddingPanel}>
            {/* Highest Bid */}
            <div className={styles.highestBid}>
              <div className={styles.highestBidHeader}>
                <TrendingUp size={20} />
                <span>Current Highest Bid</span>
              </div>
              <div className={styles.highestBidAmount}>${currentHighestBid.toLocaleString()}</div>
              <div className={styles.bidderInfo}>
                <Users size={16} />
                <span>{totalBidders} active bidders</span>
              </div>
            </div>

            {/* Your Current Bid */}
            <div className={styles.yourBid}>
              <div className={styles.yourBidLabel}>Your Current Bid</div>
              <div className={styles.yourBidAmount}>${yourCurrentBid.toLocaleString()}</div>
              <Badge variant="warning">Outbid</Badge>
            </div>

            {/* Bid Form */}
            <form onSubmit={handleSubmit} className={styles.bidForm}>
              <div>
                <label className={styles.label}>Place Your Bid</label>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Minimum: $${minBid.toLocaleString()}`}
                  required
                  min={minBid}
                />
                <p className={styles.helperText}>
                  Minimum bid: ${minBid.toLocaleString()}
                </p>
              </div>

              <div>
                <label className={styles.label}>Quick Bids</label>
                <div className={styles.quickBids}>
                  {quickBids.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      className={styles.quickBidBtn}
                      onClick={() => setBidAmount((currentHighestBid + amount).toString())}
                    >
                      +${(amount / 1000).toFixed(0)}K
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="primary" loading={loading} fullWidth>
                Submit Bid
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
