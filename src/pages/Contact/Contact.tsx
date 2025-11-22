import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      value: 'support@qtrustbid.com',
      description: 'We\'ll respond within 24 hours',
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9am-6pm PST',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      value: '123 Tech Street, San Francisco, CA 94102',
      description: 'By appointment only',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Get in Touch</h1>
          <p>Have questions? We're here to help!</p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((info) => (
              <div key={info.title} className={styles.infoCard}>
                <div className={styles.infoIcon}>{info.icon}</div>
                <div>
                  <h3>{info.title}</h3>
                  <p className={styles.infoValue}>{info.value}</p>
                  <p className={styles.infoDescription}>{info.description}</p>
                </div>
              </div>
            ))}

            <div className={styles.liveChat}>
              <MessageCircle size={32} />
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time</p>
              <Button variant="primary" fullWidth>
                Start Chat
              </Button>
            </div>
          </motion.div>

          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h2>Message Sent!</h2>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <Button variant="primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Send us a Message</h2>
                
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  <select
                    className={styles.select}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={loading}
                  icon={<Send size={20} />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
