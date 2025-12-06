import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Shield, Users, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import styles from './Landing.module.css';

const Landing: React.FC = () => {
  const features = [
    { icon: <Home size={20} />, title: 'Browse Properties', desc: 'Explore verified listings' },
    { icon: <TrendingUp size={20} />, title: 'Place Bids', desc: 'Real-time bidding' },
    { icon: <Shield size={20} />, title: 'Secure Deals', desc: 'Protected transactions' },
    { icon: <Users size={20} />, title: 'Direct Contact', desc: 'Connect instantly' },
  ];

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToNext = () => {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.scrollY;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      
      if (sectionTop > currentScroll + 100) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  };

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.heroTitle}>
              Real Estate Bidding<br />Made Simple
            </h1>
            <p className={styles.heroSubtitle}>
              QTrustBid is a secure, transparent platform that connects buyers and sellers directly. 
              No agents. No hidden fees. Just simple, efficient real estate transactions.
            </p>
            <div className={styles.heroActions}>
              <Link to="/signup">
                <Button variant="primary" size="large">
                  Get Started
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="secondary" size="large">
                  Browse Properties
                </Button>
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>2,500+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>1,200+</div>
                <div className={styles.statLabel}>Properties</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>$2.4M+</div>
                <div className={styles.statLabel}>Transactions</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll to next section">
          <ChevronDown size={24} />
        </button>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits} id="benefits">
        <div className={styles.container}>
          <motion.div
            className={styles.benefitsContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.benefitsTitle}>Why Choose QTrustBid?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <CheckCircle size={20} />
                </div>
                <div className={styles.benefitText}>
                  <h3>No Agent Fees</h3>
                  <p>Save thousands on commissions</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <Shield size={20} />
                </div>
                <div className={styles.benefitText}>
                  <h3>Secure Transactions</h3>
                  <p>Industry-standard encryption</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <TrendingUp size={20} />
                </div>
                <div className={styles.benefitText}>
                  <h3>Real-Time Bidding</h3>
                  <p>Live updates and notifications</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <Users size={20} />
                </div>
                <div className={styles.benefitText}>
                  <h3>Direct Communication</h3>
                  <p>Connect with sellers instantly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} id="cta">
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Get Started?</h2>
            <p>Join thousands using QTrustBid for secure real estate transactions</p>
            <div className={styles.ctaActions}>
              <Link to="/signup">
                <Button variant="primary" size="large">
                  Create Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="large">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
