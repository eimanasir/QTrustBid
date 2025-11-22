import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import styles from '../Analytics/Analytics.module.css';

export const Reports: React.FC = () => {
  const reports = [
    { name: 'Monthly Revenue Report', date: '2024-11-01', type: 'Financial', size: '2.4 MB' },
    { name: 'User Activity Report', date: '2024-11-01', type: 'Analytics', size: '1.8 MB' },
    { name: 'Property Listings Report', date: '2024-11-01', type: 'Operations', size: '3.2 MB' },
    { name: 'Bid Analytics Report', date: '2024-10-01', type: 'Analytics', size: '2.1 MB' },
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
            <h1>Reports</h1>
            <p>Generate and download platform reports</p>
          </div>
          <Button variant="primary" icon={<FileText size={20} />}>
            Generate New Report
          </Button>
        </motion.div>

        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Available Reports</h2>
          </div>
          <div className={styles.propertiesTable}>
            <div className={styles.tableHeader}>
              <div>Report Name</div>
              <div>Type</div>
              <div>Date</div>
              <div>Size</div>
              <div>Actions</div>
            </div>
            {reports.map((report, idx) => (
              <div key={idx} className={styles.tableRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={20} />
                  {report.name}
                </div>
                <div>{report.type}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  {report.date}
                </div>
                <div>{report.size}</div>
                <div>
                  <Button variant="ghost" size="small" icon={<Download size={16} />}>
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
