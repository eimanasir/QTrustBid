import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/common/Button/Button';
import styles from './Settings.module.css';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [loading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Settings</h1>
          <p>Manage your account preferences and security</p>
        </motion.div>

        <div className={styles.sections}>
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
              </div>
              <div>
                <h2>Appearance</h2>
                <p>Customize how QTrustBid looks</p>
              </div>
            </div>
            
            <div className={styles.settingItem}>
              <div>
                <label>Theme</label>
                <p className={styles.settingDescription}>Choose your preferred color scheme</p>
              </div>
              <div className={styles.themeButtons}>
                <button
                  className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <Sun size={20} />
                  Light
                </button>
                <button
                  className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <Moon size={20} />
                  Dark
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Bell size={24} />
              </div>
              <div>
                <h2>Notifications</h2>
                <p>Manage how you receive updates</p>
              </div>
            </div>

            <div className={styles.sectionActions}>
              <Button variant="primary" onClick={() => {}} loading={loading}>
                Save Preferences
              </Button>
            </div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.sectionHeader}>
              <div>
                <h2>Account</h2>
                <p>User: {user?.email}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
