import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Lock, Zap, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { PropertyCard } from '@/components/property/PropertyCard/PropertyCard';
import { mockProperties } from '@/data/mockProperties';
import styles from './Landing.module.css';

const Landing: React.FC = () => {
  const featuredProperties = mockProperties.slice(0, 3);

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Quantum-Safe Security',
      description: 'Your data protected with post-quantum cryptography that\'s future-proof against quantum computers.',
    },
    {
      icon: <Sparkles size={32} />,
      title: 'AI-Powered Matching',
      description: 'Smart recommendations based on your preferences, budget, and browsing behavior.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Real-Time Bidding',
      description: 'Live bid updates, instant notifications, and transparent bidding process.',
    },
    {
      icon: <Lock size={32} />,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no agent commissions. Save thousands on your purchase.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Close deals faster without the middleman. Direct communication with sellers.',
    },
    {
      icon: <Users size={32} />,
      title: 'Verified Users',
      description: 'All users are verified with quantum-safe identity verification for your safety.',
    },
  ];

  const benefits = [
    'No real estate agent fees',
    'Quantum-safe encryption',
    'AI property recommendations',
    'Real-time bidding system',
    'Direct seller communication',
    'Transparent pricing',
  ];

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="quantum">Powered by Quantum-Safe Technology</Badge>
            <h1 className={styles.heroTitle}>
              The Future of Real Estate Bidding
            </h1>
            <p className={styles.heroSubtitle}>
              Buy and sell properties directly with quantum-safe encryption, AI-powered recommendations, 
              and transparent real-time bidding. No agents. No hidden fees.
            </p>
            <div className={styles.heroActions}>
              <Link to="/signup">
                <Button variant="primary" size="large" icon={<ArrowRight size={20} />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="secondary" size="large">
                  Browse Properties
                </Button>
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>$2.5B+</div>
                <div className={styles.statLabel}>Properties Listed</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>50K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" 
            alt="Modern home"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose QTrustBid?</h2>
            <p>Revolutionary technology meets transparent real estate transactions</p>
          </motion.div>

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
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className={styles.properties}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Featured Properties</h2>
            <p>Discover your dream home from our curated selection</p>
          </motion.div>

          <div className={styles.propertyGrid}>
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} showAIMatch />
              </motion.div>
            ))}
          </div>

          <div className={styles.ctaCenter}>
            <Link to="/properties">
              <Button variant="primary" size="large">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <motion.div
              className={styles.benefitsText}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Save Thousands. Buy Smarter.</h2>
              <p>
                Traditional real estate transactions cost you 5-6% in agent fees. 
                With QTrustBid, you deal directly with sellers and keep more money in your pocket.
              </p>
              <ul className={styles.benefitsList}>
                {benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button variant="primary" size="large">
                  Start Saving Today
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className={styles.benefitsImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600" 
                alt="Happy family"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Join thousands of buyers and sellers using quantum-safe technology</p>
            <div className={styles.ctaActions}>
              <Link to="/signup">
                <Button variant="primary" size="large">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="large">
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
