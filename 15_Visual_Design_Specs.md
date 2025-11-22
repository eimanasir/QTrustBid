# QTrustBid Design System - Part 15
## Detailed Visual Design Specifications

---

## VISUAL DESIGN SPECIFICATIONS

### Property Card - Complete Specification

#### Desktop (400px width)
```
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │ ← Image Container
│  │                                  │  │   Height: 280px
│  │      [Property Image]            │  │   Border radius: 12px 12px 0 0
│  │                                  │  │   Object-fit: cover
│  │  ┌──────────┐  ┌──────────┐     │  │
│  │  │Quantum ✓│  │85% Match │     │  │ ← Badges (top-left)
│  │  └──────────┘  └──────────┘     │  │   Padding: 12px
│  │                          ❤️      │  │ ← Favorite (top-right)
│  └──────────────────────────────────┘  │   Size: 40x40px
│                                        │
│  Modern Downtown Loft                  │ ← Title (H4, 20px)
│                                        │   Padding: 20px 20px 8px
│  📍 123 Main St, San Francisco, CA    │ ← Location (Body, 14px)
│                                        │   Color: text-secondary
│  3 bed • 2 bath • 1,850 sqft          │ ← Specs (Body, 14px)
│                                        │   Padding: 8px 20px
│  $1,250,000                            │ ← Price (H3, 24px, Bold)
│                                        │   Padding: 12px 20px 20px
└────────────────────────────────────────┘   Color: primary

Card Specs:
- Width: 400px (desktop), 100% (mobile)
- Background: surface color
- Border radius: 12px
- Shadow: shadow-md (default), shadow-lg (hover)
- Transition: all 0.3s ease
- Hover: transform: translateY(-4px)
```

#### States
**Default**:
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Transform: none

**Hover**:
- Shadow: 0 4px 16px rgba(0,0,0,0.12)
- Transform: translateY(-4px)
- Cursor: pointer

**Active/Clicked**:
- Shadow: 0 1px 4px rgba(0,0,0,0.08)
- Transform: translateY(-2px)

---

### Button - Complete Specification

#### Primary Button
```
┌─────────────────────────────┐
│    Place Bid Securely       │  ← Text: 16px, weight 600
└─────────────────────────────┘    Padding: 16px 32px
                                   Height: 48px
                                   Border radius: 8px
```

**CSS Specifications**:
```css
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 32px;
  gap: 8px;
  
  /* Typography */
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  
  /* Colors */
  background: var(--color-primary-500);
  color: #FFFFFF;
  border: none;
  
  /* Effects */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(33, 150, 243, 0.2);
  cursor: pointer;
  
  /* Animation */
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}

.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  transform: scale(1.02);
}

.btn-primary:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(33, 150, 243, 0.2);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}
```

---

### Input Field - Complete Specification

#### Text Input
```
Email Address                    ← Label (14px, weight 500)
┌─────────────────────────────┐    Margin-bottom: 8px
│ john@example.com            │  ← Input (16px)
└─────────────────────────────┘    Height: 48px
                                   Padding: 12px 16px
                                   Border: 1px solid border-default
                                   Border radius: 8px
```

**States**:

**Default**:
```css
.input {
  height: 48px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  background: var(--bg-surface);
  color: var(--text-primary);
  transition: all 0.2s ease;
}
```

**Focus**:
```css
.input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  outline: none;
}
```

**Error**:
```css
.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
}

.error-message {
  margin-top: 8px;
  font-size: 14px;
  color: var(--color-error);
}
```

**Success**:
```css
.input.success {
  border-color: var(--color-success);
  padding-right: 48px; /* Space for checkmark */
}

.input.success::after {
  content: '✓';
  position: absolute;
  right: 16px;
  color: var(--color-success);
}
```

---

### Modal - Complete Specification

#### Bid Modal
```
┌─────────────────────────────────────────────┐
│  Place Your Bid                        ✕    │ ← Header (H3, 24px)
├─────────────────────────────────────────────┤   Height: 64px
│                                             │   Padding: 20px 24px
│  ┌───────────────────────────────────────┐ │
│  │  [Property Thumbnail]                 │ │ ← Property Info
│  │  123 Main Street                      │ │   Padding: 24px
│  │  Current Bid: $1,200,000              │ │   Background: bg-hover
│  └───────────────────────────────────────┘ │   Border radius: 8px
│                                             │
│  Your Bid Amount                            │ ← Label
│  ┌───────────────────────────────────────┐ │
│  │  $ 1,250,000                          │ │ ← Large Input
│  └───────────────────────────────────────┘ │   Height: 64px
│                                             │   Font-size: 28px
│  Quick Bids:                                │
│  [+$5K]  [+$10K]  [+$25K]  [+$50K]         │ ← Chip Buttons
│                                             │
│  ☐ I agree to the bidding terms             │ ← Checkbox
│                                             │
├─────────────────────────────────────────────┤
│  [Cancel]              [Submit Bid]         │ ← Footer
└─────────────────────────────────────────────┘   Height: 80px
                                                  Padding: 20px 24px

Modal Specs:
- Width: 560px (desktop), 90vw (mobile)
- Max-height: 90vh
- Background: surface color
- Border radius: 16px
- Shadow: shadow-5 (0 16px 48px rgba(0,0,0,0.18))
- Backdrop: rgba(0,0,0,0.5) with blur(4px)
```

**Animation**:
```css
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal {
  animation: modalEnter 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}
```

---

### Badge - Complete Specification

#### Quantum Safe Badge
```
┌──────────────────┐
│ 🔒 Quantum Safe  │  ← Icon + Text
└──────────────────┘    Height: 28px
                        Padding: 6px 12px
                        Border radius: 14px (pill)
```

**Specifications**:
```css
.badge-quantum {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  
  font-size: 13px;
  font-weight: 600;
  
  background: var(--color-primary-50);
  color: var(--color-primary-900);
  border-radius: 14px;
  
  /* Subtle glow effect */
  box-shadow: 0 0 12px rgba(33, 150, 243, 0.2);
}

/* Dark mode */
[data-theme='dark'] .badge-quantum {
  background: rgba(66, 165, 245, 0.15);
  color: var(--color-primary-300);
  box-shadow: 0 0 12px rgba(66, 165, 245, 0.3);
}
```

#### AI Match Badge
```css
.badge-ai {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  
  font-size: 13px;
  font-weight: 600;
  
  background: linear-gradient(135deg, #9C27B0 0%, #2196F3 100%);
  color: #FFFFFF;
  border-radius: 14px;
  
  /* Animated gradient */
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

### Navigation - Complete Specification

#### Desktop Header
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Browse  My Bids  Favorites  AI    [🔍] [🔔] [👤]  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Header Specs:
- Height: 72px
- Padding: 0 32px
- Background: surface color
- Border-bottom: 1px solid border-default
- Position: sticky, top: 0
- Z-index: 100
- Backdrop-filter: blur(8px) (semi-transparent)
```

**CSS**:
```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 32px;
  
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-default);
  
  position: sticky;
  top: 0;
  z-index: 100;
  
  transition: box-shadow 0.2s ease;
}

.header.scrolled {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

#### Sidebar Navigation
```
┌──────────────────┐
│                  │
│  [Logo]          │  ← Height: 72px
│                  │
├──────────────────┤
│                  │
│  🏠 Dashboard    │  ← Nav Item
│  🔍 Browse       │    Height: 48px
│  💰 My Bids      │    Padding: 12px 20px
│  ❤️  Favorites   │    Gap: 12px
│  🤖 AI Recs      │
│                  │
├──────────────────┤
│                  │
│  ⚙️  Settings    │  ← Bottom Section
│  🔒 Security     │
│                  │
└──────────────────┘

Sidebar Specs:
- Width: 280px (expanded), 72px (collapsed)
- Background: surface color
- Border-right: 1px solid border-default
- Height: 100vh
- Position: fixed
- Transition: width 0.3s ease
```

---

### Data Visualization - Chart Specifications

#### Line Chart (Analytics)
```
Revenue Over Time
┌─────────────────────────────────────────┐
│                                    •    │ ← Point: 8px circle
│                              •          │   Color: primary
│                        •                │
│                  •                      │ ← Line: 2px stroke
│            •                            │   Color: primary
│      •                                  │   Smooth curve
│ •                                       │
└─────────────────────────────────────────┘
  Jan  Feb  Mar  Apr  May  Jun  Jul

Chart Specs:
- Height: 300px
- Padding: 20px
- Grid lines: 1px, color: border-default, opacity: 0.5
- Axis labels: 12px, color: text-secondary
- Tooltip on hover: shadow-md, 8px radius
```

#### Bar Chart (Bid Comparison)
```
Bids by Property
┌─────────────────────────────────────────┐
│     ████                                │ ← Bar height: data-driven
│     ████  ██████                        │   Width: 40px
│     ████  ██████  ████                  │   Gap: 16px
│     ████  ██████  ████  ████████        │   Color: primary
│     ████  ██████  ████  ████████        │   Border radius: 4px top
└─────────────────────────────────────────┘
     Prop1  Prop2  Prop3   Prop4

Bar Specs:
- Min height: 20px
- Max height: 280px
- Hover: opacity 0.8, cursor pointer
- Animation: height from 0 to value, 0.5s ease-out
```

---

### Loading States

#### Skeleton Screen (Property Card)
```
┌────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Image skeleton
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │   Animated gradient
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                        │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 │ ← Title skeleton
│                                        │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │ ← Location skeleton
│                                        │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓             │ ← Specs skeleton
│                                        │
│  ▓▓▓▓▓▓▓▓▓▓▓▓                         │ ← Price skeleton
└────────────────────────────────────────┘
```

**Animation**:
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-hover) 0%,
    var(--bg-elevated) 50%,
    var(--bg-hover) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  border-radius: 4px;
}
```

#### Spinner
```
    ◐     ← Rotating circle
          Size: 40px
          Border: 4px
          Color: primary
          Animation: 0.8s linear infinite
```

**CSS**:
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-primary-100);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### Notification Toast

```
┌─────────────────────────────────────────┐
│  ✓  Bid submitted successfully!    ✕   │  ← Success toast
└─────────────────────────────────────────┘    Height: 56px
                                               Width: 400px
                                               Border-radius: 8px
                                               Shadow: shadow-lg

Toast Specs:
- Position: fixed, top: 24px, right: 24px
- Z-index: 1000
- Animation: slide in from right, 0.3s
- Auto-dismiss: 5 seconds
- Hover: pause auto-dismiss
```

**Variants**:
```css
.toast-success {
  background: var(--color-success-50);
  border-left: 4px solid var(--color-success-500);
  color: var(--color-success-900);
}

.toast-error {
  background: var(--color-error-50);
  border-left: 4px solid var(--color-error-500);
  color: var(--color-error-900);
}

.toast-warning {
  background: var(--color-warning-50);
  border-left: 4px solid var(--color-warning-500);
  color: var(--color-warning-900);
}

.toast-info {
  background: var(--color-primary-50);
  border-left: 4px solid var(--color-primary-500);
  color: var(--color-primary-900);
}
```

---

### Quantum Encryption Animation

#### During Bid Submission
```
    ⚛️     ← Quantum particle effect
   ⚛️ ⚛️    Multiple particles
  ⚛️   ⚛️   Orbiting animation
   ⚛️ ⚛️    Duration: 2s
    ⚛️     Color: primary with glow
```

**CSS**:
```css
@keyframes quantumOrbit {
  0% {
    transform: rotate(0deg) translateX(30px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) translateX(30px) rotate(-360deg);
    opacity: 0.3;
  }
}

.quantum-particle {
  width: 8px;
  height: 8px;
  background: var(--color-primary-500);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--color-primary-500);
  animation: quantumOrbit 2s ease-in-out infinite;
}

.quantum-particle:nth-child(2) {
  animation-delay: 0.4s;
}

.quantum-particle:nth-child(3) {
  animation-delay: 0.8s;
}
```

---

### AI Match Score Visualization

```
     85%      ← Percentage (H2, 36px)
    ╱───╲     Circular progress
   │     │    Stroke: 6px
   │  🤖 │    Color: gradient (purple to blue)
    ╲───╱     Animation: draw from 0 to 85%
              Duration: 1.5s
```

**SVG Implementation**:
```html
<svg width="120" height="120" viewBox="0 0 120 120">
  <circle
    cx="60"
    cy="60"
    r="54"
    fill="none"
    stroke="var(--color-primary-100)"
    stroke-width="6"
  />
  <circle
    cx="60"
    cy="60"
    r="54"
    fill="none"
    stroke="url(#gradient)"
    stroke-width="6"
    stroke-dasharray="339.292"
    stroke-dashoffset="84.823"
    stroke-linecap="round"
    transform="rotate(-90 60 60)"
    class="progress-circle"
  />
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C27B0" />
      <stop offset="100%" stop-color="#2196F3" />
    </linearGradient>
  </defs>
</svg>
```

**Animation**:
```css
@keyframes drawCircle {
  from {
    stroke-dashoffset: 339.292;
  }
  to {
    stroke-dashoffset: 84.823; /* 85% of circumference */
  }
}

.progress-circle {
  animation: drawCircle 1.5s ease-out forwards;
}
```

---

## Icon Specifications

### Icon Sizes
- **Small**: 16x16px (inline with text)
- **Medium**: 20x20px (buttons, cards)
- **Large**: 24x24px (navigation, headers)
- **XLarge**: 32x32px (empty states, illustrations)

### Icon Style
- **Stroke width**: 2px
- **Corner radius**: 2px (rounded)
- **Color**: Inherit from parent or text-secondary
- **Hover**: Color shifts to primary

### Common Icons
- Home: 🏠
- Search: 🔍
- Heart: ❤️ (favorite)
- Bell: 🔔 (notifications)
- User: 👤 (profile)
- Settings: ⚙️
- Lock: 🔒 (security)
- AI: 🤖
- Location: 📍
- Check: ✓
- Close: ✕
- Arrow: → ↓ ← ↑

---

This completes the visual design specifications for QTrustBid!
