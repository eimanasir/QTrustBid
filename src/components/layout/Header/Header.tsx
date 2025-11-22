import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Moon, Sun, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button/Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { effectiveTheme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [showSearch, setShowSearch] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const notifications = [
    { id: '1', type: 'bid', message: 'You have been outbid on Modern Downtown Condo', time: '5 min ago' },
    { id: '2', type: 'message', message: 'New message from seller', time: '1 hour ago' },
    { id: '3', type: 'success', message: 'Your bid was accepted!', time: '2 hours ago' },
  ];

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Shield size={32} />
          <span>QTrustBid</span>
        </Link>

        {isAuthenticated && (
          <nav className={styles.nav}>
            {user?.role === 'buyer' && (
              <>
                <Link to="/properties">Browse</Link>
                <Link to="/my-bids">My Bids</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/ai-recommendations">AI Recs</Link>
              </>
            )}
            {user?.role === 'seller' && (
              <>
                <Link to="/properties">Browse</Link>
                <Link to="/my-listings">My Listings</Link>
                <Link to="/add-property">Add Property</Link>
                <Link to="/bids-received">Bids Received</Link>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/properties">Properties</Link>
                <Link to="/admin/analytics">Analytics</Link>
                <Link to="/admin/reports">Reports</Link>
              </>
            )}
          </nav>
        )}

        <div className={styles.actions}>
          {isAuthenticated && (
            <>
              <button 
                className={styles.iconBtn} 
                aria-label="Search"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={20} />
              </button>
              <button 
                className={`${styles.iconBtn} ${styles.notificationBtn}`}
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className={styles.notificationBadge}>{notifications.length}</span>
                )}
              </button>
            </>
          )}
          
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {effectiveTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <button className={styles.userBtn}>
                <User size={20} />
                <span>{user?.name}</span>
              </button>
              <div className={styles.dropdown}>
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="ghost" size="small">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="small">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Search Dropdown */}
        {showSearch && isAuthenticated && (
          <div className={styles.searchDropdown}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
            </form>
          </div>
        )}

        {/* Notifications Dropdown */}
        {showNotifications && isAuthenticated && (
          <div className={styles.notificationsDropdown}>
            <div className={styles.notificationsHeader}>
              <h3>Notifications</h3>
              <button className={styles.markAllRead}>Mark all read</button>
            </div>
            <div className={styles.notificationsList}>
              {notifications.map(notif => (
                <div key={notif.id} className={styles.notificationItem}>
                  <div className={`${styles.notifIcon} ${styles[notif.type]}`}>
                    {notif.type === 'bid' && <TrendingUp size={16} />}
                    {notif.type === 'message' && <Bell size={16} />}
                    {notif.type === 'success' && <CheckCircle size={16} />}
                  </div>
                  <div className={styles.notifContent}>
                    <p>{notif.message}</p>
                    <span>{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/notifications" className={styles.viewAll}>
              View All Notifications
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
