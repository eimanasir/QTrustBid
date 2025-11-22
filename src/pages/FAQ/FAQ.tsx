import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'What is QTrustBid?',
      answer: 'QTrustBid is a revolutionary real estate platform that connects buyers and sellers directly, eliminating the need for traditional real estate agents. We use quantum-safe encryption and AI-powered recommendations to make property transactions secure, transparent, and efficient.',
    },
    {
      category: 'general',
      question: 'How is QTrustBid different from traditional real estate?',
      answer: 'Unlike traditional real estate, QTrustBid removes the middleman (agents), saving you 5-6% in commission fees. We provide direct communication between buyers and sellers, transparent bidding, and use cutting-edge technology including quantum-safe encryption and AI recommendations.',
    },
    {
      category: 'buying',
      question: 'How do I place a bid on a property?',
      answer: 'Simply browse properties, click on one you like, and click the "Place Bid" button. Enter your bid amount (must be above the minimum), agree to the terms, and submit. Your bid is protected with quantum-safe encryption and you\'ll receive instant confirmation.',
    },
    {
      category: 'buying',
      question: 'What happens if I\'m outbid?',
      answer: 'You\'ll receive an instant notification via email and in-app alert. You can then choose to place a higher bid or move on to other properties. There\'s no penalty for being outbid.',
    },
    {
      category: 'selling',
      question: 'How do I list my property?',
      answer: 'Click "Create Listing" from your seller dashboard. You\'ll go through a 4-step process: Basic Info, Photos & Media, Pricing & Bidding, and Review & Publish. The entire process takes about 15-20 minutes.',
    },
    {
      category: 'selling',
      question: 'What fees do sellers pay?',
      answer: 'We charge a flat 1% listing fee (compared to 5-6% with traditional agents). This fee is only charged when your property sells. There are no upfront costs or hidden fees.',
    },
    {
      category: 'security',
      question: 'What is quantum-safe encryption?',
      answer: 'Quantum-safe encryption uses post-quantum cryptography algorithms (like Dilithium) that are resistant to attacks from quantum computers. This ensures your data remains secure even as quantum computing technology advances.',
    },
    {
      category: 'security',
      question: 'Is my personal information safe?',
      answer: 'Absolutely. All your personal information, bid amounts, and communications are protected with quantum-safe encryption. We never share your data with third parties without your explicit consent.',
    },
    {
      category: 'ai',
      question: 'How does AI matching work?',
      answer: 'Our AI analyzes your search history, favorited properties, budget, and preferences to recommend properties that match your needs. The more you use the platform, the better the recommendations become.',
    },
    {
      category: 'ai',
      question: 'Can I trust AI recommendations?',
      answer: 'Our AI is a tool to help you discover properties you might like, but the final decision is always yours. We provide transparency about why each property is recommended, and you can adjust your preferences at any time.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'buying', label: 'Buying' },
    { id: 'selling', label: 'Selling' },
    { id: 'security', label: 'Security' },
    { id: 'ai', label: 'AI Features' },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HelpCircle size={64} />
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about QTrustBid</p>
        </motion.div>

        <div className={styles.search}>
          <Input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={20} />}
          />
        </div>

        <div className={styles.categories}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.faqList}>
          {filteredFAQs.length === 0 ? (
            <div className={styles.noResults}>
              <p>No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`${styles.chevron} ${openIndex === index ? styles.open : ''}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        <div className={styles.cta}>
          <h2>Still have questions?</h2>
          <p>Our support team is here to help</p>
          <Button variant="primary" size="large">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
