# QTrustBid Design System - Part 11
## Responsive Design Guidelines

---

## 12. RESPONSIVE DESIGN SYSTEM

### 12.1 Breakpoint Strategy

#### Breakpoint Definitions
```css
/* Mobile First Approach */
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 576px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-xxl: 1440px; /* Large desktops */
```

#### Container Max Widths
- Mobile (< 768px): 100% width, 16px padding
- Tablet (768-1023px): 100% width, 24px padding
- Desktop (1024-1439px): 100% width, 32px padding
- Large Desktop (1440px+): 1440px max-width, centered

---

### 12.2 Grid System

#### 12-Column Grid
**Desktop (1024px+)**:
- Columns: 12
- Gutter: 24px
- Margin: 32px

**Tablet (768-1023px)**:
- Columns: 12 (can collapse to 8)
- Gutter: 20px
- Margin: 24px

**Mobile (< 768px)**:
- Columns: 4
- Gutter: 16px
- Margin: 16px

---

### 12.3 Component Responsive Behavior

#### Navigation
**Desktop (1024px+)**:
- Full horizontal navbar
- Sidebar visible (collapsible)
- All menu items visible

**Tablet (768-1023px)**:
- Horizontal navbar
- Sidebar collapses to icons only
- Hamburger menu for secondary items

**Mobile (< 768px)**:
- Hamburger menu (full-screen overlay)
- Bottom navigation bar (sticky)
- Logo centered or left-aligned

---

#### Property Cards
**Desktop (1024px+)**:
- Grid: 3 columns
- Card size: ~400px width
- Image height: 280px
- All details visible

**Tablet (768-1023px)**:
- Grid: 2 columns
- Card size: ~360px width
- Image height: 240px
