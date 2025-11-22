# QTrustBid Design System - Part 13
## React Implementation Guide

---

## 14. REACT IMPLEMENTATION GUIDELINES

### 14.1 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Badge/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── Container/
│   ├── property/
│   │   ├── PropertyCard/
│   │   ├── PropertyGrid/
│   │   ├── PropertyDetails/
│   │   └── PropertyFilters/
│   ├── bidding/
│   │   ├── BidModal/
│   │   ├── BidHistory/
│   │   └── BidCard/
│   └── ai/
│       ├── AIRecommendation/
│       ├── AIMatchScore/
│       └── AIInsights/
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ForgotPassword.tsx
│   ├── buyer/
│   │   ├── Dashboard.tsx
│   │   ├── PropertyListing.tsx
│   │   ├── PropertyDetails.tsx
│   │   └── MyBids.tsx
│   ├── seller/
│   │   ├── Dashboard.tsx
│   │   ├── CreateListing.tsx
│   │   └── ManageListings.tsx
│   └── admin/
├── hooks/
│   ├── useAuth.ts
│   ├── useTheme.ts
│   ├── useBidding.ts
│   └── useQuantumEncryption.ts
├── contexts/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── NotificationContext.tsx
├── styles/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── shadows.css
│   ├── themes/
│   │   ├── light.css
│   │   └── dark.css
│   └── global.css
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   └── quantumEncryption.ts
└── types/
    ├── property.ts
    ├── bid.ts
    └── user.ts
```

---

### 14.2 Component Examples

#### Button Component
```typescript
// components/common/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-busy={loading}
    >
      {loading && <span className={styles.spinner} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
};
```

```css
/* components/common/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  font-family: var(--font-primary);
}

.button:hover:not(:disabled) {
  transform: scale(1.02);
}

.button:active:not(:disabled) {
  transform: scale(0.98);
}

.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background: var(--color-primary-500);
  color: white;
}

.primary:hover:not(:disabled) {
  background: var(--color-primary-600);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.secondary {
  background: transparent;
  border: 2px solid var(--color-primary-500);
  color: var(--color-primary-500);
}

/* Sizes */
.small {
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
}

.medium {
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
}

.large {
  height: 56px;
  padding: 0 40px;
  font-size: 18px;
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

#### Property Card Component
```typescript
// components/property/PropertyCard/PropertyCard.tsx
import React from 'react';
import { Property } from '@/types/property';
import { Badge } from '@/components/common/Badge';
import { IconButton } from '@/components/common/IconButton';
import { HeartIcon, LocationIcon } from '@/components/icons';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
  showAIMatch?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavorite,
  onClick,
  showAIMatch = false,
}) => {
  const {
    id,
    images,
    title,
    address,
    price,
    bedrooms,
    bathrooms,
    sqft,
    aiMatchScore,
    isQuantumVerified,
    isFavorited,
  } = property;

  return (
    <article 
      className={styles.card}
      onClick={() => onClick?.(id)}
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className={styles.imageContainer}>
        <img 
          src={images[0]} 
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className={styles.badges}>
          {isQuantumVerified && (
            <Badge variant="quantum">Quantum Safe</Badge>
          )}
          {showAIMatch && aiMatchScore && (
            <Badge variant="ai">{aiMatchScore}% Match</Badge>
          )}
        </div>

        {/* Favorite button */}
        <IconButton
          className={styles.favoriteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(id);
          }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorited} />
        </IconButton>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.location}>
          <LocationIcon size={16} />
          <span>{address}</span>
        </div>

        <div className={styles.specs}>
          <span>{bedrooms} bed</span>
          <span className={styles.divider}>•</span>
          <span>{bathrooms} bath</span>
          <span className={styles.divider}>•</span>
          <span>{sqft.toLocaleString()} sqft</span>
        </div>

        <div className={styles.price}>
          ${price.toLocaleString()}
        </div>
      </div>
    </article>
  );
};
```

---

### 14.3 Theme Implementation

#### Theme Context
```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'auto';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setEffectiveTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    localStorage.setItem('theme', theme);
  }, [theme, effectiveTheme]);

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### CSS Variables
```css
/* styles/themes/light.css */
[data-theme='light'] {
  /* Colors */
  --color-primary-500: #2196F3;
  --color-primary-600: #1E88E5;
  --color-secondary-500: #4CAF50;
  --color-accent-500: #9C27B0;

  /* Backgrounds */
  --bg-app: #F8F9FA;
  --bg-surface: #FFFFFF;
  --bg-elevated: #FFFFFF;
  --bg-hover: #F5F5F5;

  /* Text */
  --text-primary: #1A1A1A;
  --text-secondary: #666666;
  --text-tertiary: #999999;

  /* Borders */
  --border-default: #E0E0E0;
  --border-hover: #BDBDBD;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-primary: rgba(33, 150, 243, 0.3);
}

/* styles/themes/dark.css */
[data-theme='dark'] {
  /* Colors */
  --color-primary-500: #42A5F5;
  --color-primary-600: #64B5F6;
  --color-secondary-500: #66BB6A;
  --color-accent-500: #CE93D8;

  /* Backgrounds */
  --bg-app: #121212;
  --bg-surface: #1E1E1E;
  --bg-elevated: #2A2A2A;
  --bg-hover: #333333;

  /* Text */
  --text-primary: #E0E0E0;
  --text-secondary: #B0B0B0;
  --text-tertiary: #808080;

  /* Borders */
  --border-default: #333333;
  --border-hover: #4A4A4A;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-primary: rgba(66, 165, 245, 0.3);
}
```

---

### 14.4 State Management Recommendations

#### For Small-Medium Apps
- **React Context** for global state (auth, theme, notifications)
- **React Query** for server state (properties, bids, user data)
- **Local state** (useState) for component-specific state

#### For Large Apps
- **Redux Toolkit** or **Zustand** for complex global state
- **React Query** for server state and caching
- **WebSocket** integration for real-time bidding

---

### 14.5 Performance Optimization

#### Code Splitting
```typescript
// Lazy load pages
const PropertyListing = lazy(() => import('@/pages/buyer/PropertyListing'));
const PropertyDetails = lazy(() => import('@/pages/buyer/PropertyDetails'));

// Route-based code splitting
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/properties" element={<PropertyListing />} />
    <Route path="/properties/:id" element={<PropertyDetails />} />
  </Routes>
</Suspense>
```

#### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Use responsive images with srcset
- Optimize image sizes (max 1920px width)

#### Bundle Optimization
- Tree shaking
- Minimize dependencies
- Use production builds
- Enable gzip/brotli compression

---
