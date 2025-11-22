import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Shield, Award, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import styles from './Profile.module.css';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    agencyName: user?.agencyName || '',
    licenseNumber: user?.licenseNumber || '',
  });

  const handleSave = async () => {
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      agencyName: user?.agencyName || '',
      licenseNumber: user?.licenseNumber || '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <User size={48} />
                )}
              </div>
              <div className={styles.userInfo}>
                <h1>{user.name}</h1>
                <p className={styles.email}>{user.email}</p>
                <div className={styles.badges}>
                  <Badge variant={user.role === 'admin' ? 'error' : user.role === 'seller' ? 'success' : 'info'}>
                    {user.role.toUpperCase()}
                  </Badge>
                  {user.verified && <Badge variant="quantum">✓ Verified</Badge>}
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              {!isEditing ? (
                <Button
                  variant="primary"
                  icon={<Edit2 size={18} />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className={styles.editActions}>
                  <Button
                    variant="primary"
                    icon={<Save size={18} />}
                    onClick={handleSave}
                    loading={loading}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<X size={18} />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.mainSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.card}>
              <h2>Personal Information</h2>
              
              {isEditing ? (
                <div className={styles.form}>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <div className={styles.inputGroup}>
                    <label>Bio</label>
                    <textarea
                      className={styles.textarea}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  {user.role === 'seller' && (
                    <>
                      <Input
                        label="Agency Name"
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                      />
                      <Input
                        label="License Number"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <Mail size={20} />
                    <div>
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={20} />
                    <div>
                      <label>Phone</label>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Calendar size={20} />
                    <div>
                      <label>Member Since</label>
                      <p>{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  {user.bio && (
                    <div className={styles.infoItem}>
                      <User size={20} />
                      <div>
                        <label>Bio</label>
                        <p>{user.bio}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.role === 'seller' && (
                    <>
                      {user.agencyName && (
                        <div className={styles.infoItem}>
                          <MapPin size={20} />
                          <div>
                            <label>Agency</label>
                            <p>{user.agencyName}</p>
                          </div>
                        </div>
                      )}
                      {user.licenseNumber && (
                        <div className={styles.infoItem}>
                          <Shield size={20} />
                          <div>
                            <label>License Number</label>
                            <p>{user.licenseNumber}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.card}>
              <h3>Activity Stats</h3>
              <div className={styles.stats}>
                {user.role === 'buyer' && (
                  <>
                    <div className={styles.stat}>
                      <TrendingUp size={24} />
                      <div>
                        <div className={styles.statValue}>{user.totalBids || 0}</div>
                        <div className={styles.statLabel}>Total Bids</div>
                      </div>
                    </div>
                  </>
                )}
                
                {user.role === 'seller' && (
                  <>
                    <div className={styles.stat}>
                      <MapPin size={24} />
                      <div>
                        <div className={styles.statValue}>{user.totalListings || 0}</div>
                        <div className={styles.statLabel}>Active Listings</div>
                      </div>
                    </div>
                    <div className={styles.stat}>
                      <Award size={24} />
                      <div>
                        <div className={styles.statValue}>{user.totalSales || 0}</div>
                        <div className={styles.statLabel}>Total Sales</div>
                      </div>
                    </div>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <div className={styles.stat}>
                    <Shield size={24} />
                    <div>
                      <div className={styles.statValue}>Admin</div>
                      <div className={styles.statLabel}>Full Access</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <h3>Security</h3>
              <div className={styles.securityList}>
                <div className={styles.securityItem}>
                  <Shield size={20} />
                  <div>
                    <p>Quantum-Safe Encryption</p>
                    <span className={styles.securityStatus}>Active</span>
                  </div>
                </div>
                <div className={styles.securityItem}>
                  <Shield size={20} />
                  <div>
                    <p>Two-Factor Authentication</p>
                    <span className={styles.securityStatus}>
                      {user.verified ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
