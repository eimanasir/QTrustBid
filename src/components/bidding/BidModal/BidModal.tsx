import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Calendar } from 'lucide-react';
import { Property } from '@/types';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './BidModal.module.css';

interface BidModalProps {
  property: Property;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export const BidModal: React.FC<BidModalProps> = ({ property, onClose, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Mock bidding window: starts in 2 hours, lasts 30 minutes
  const biddingStartTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const biddingEndTime = new Date(biddingStartTime.getTime() + 30 * 60 * 1000);
  const isBiddingActive = Date.now() >= biddingStartTime.getTime() && Date.now() < biddingEndTime.getTime();
  const isBiddingUpcoming = Date.now() < biddingStartTime.getTime();

  const currentBid = property.currentBid || property.startingBid;
  const minBid = currentBid + 5000;

  const quickBids = [5000, 10000, 25000, 50000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isBiddingActive) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit(Number(bidAmount));
    setLoading(false);
  };

  const handleQuickBid = (amount: number) => {
    setBidAmount((currentBid + amount).toString());
  };

  const handleBookSlot = () => {
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2>Scheduled Bidding</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className={styles.propertyInfo}>
            <img src={property.images[0]} alt={property.title} className={styles.thumbnail} />
            <div>
              <h3>{property.title}</h3>
              <p>{property.address}</p>
              <div className={styles.biddingSchedule}>
                <Calendar size={16} />
                <span>{biddingStartTime.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {isBiddingUpcoming && !isBooked ? (
            <div className={styles.bookingSection}>
              <div className={styles.bookingInfo}>
                <h3>Book Your Bidding Slot</h3>
                <p>Reserve your spot for the upcoming bidding window. You'll be notified when bidding starts.</p>
              </div>
              <Button variant="primary" onClick={handleBookSlot} fullWidth>
                Book Slot for Bidding
              </Button>
            </div>
          ) : isBiddingUpcoming && isBooked ? (
            <div className={styles.bookedSection}>
              <Badge variant="success">Slot Booked</Badge>
              <p>You're all set! We'll notify you when bidding starts.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label className={styles.label}>Your Bid Amount</label>
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
                      onClick={() => handleQuickBid(amount)}
                    >
                      +${(amount / 1000).toFixed(0)}K
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.encryption}>
                <Shield className={styles.encryptionIcon} size={24} />
                <div>
                  <div className={styles.encryptionTitle}>Secure Encryption</div>
                  <div className={styles.encryptionText}>
                    Your bid is protected with industry-standard encryption
                  </div>
                </div>
                <Badge variant="success" icon={false}>Active</Badge>
              </div>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>I agree to the bidding terms and conditions</span>
              </label>

              <div className={styles.actions}>
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" loading={loading} disabled={!agreed}>
                  Submit Bid Securely
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
