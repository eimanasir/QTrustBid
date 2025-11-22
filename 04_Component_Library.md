# QTrustBid Design System - Part 4
## Component Library

---

## 5. COMPONENT LIBRARY (React-Ready)

### 5.1 Button Components

#### Primary Button
**Component Name**: `<Button variant="primary">`
**Usage**: Main CTAs, form submissions
**Specs**:
- Height: 48px (desktop), 44px (mobile)
- Padding: 16px 32px
- Border radius: 8px
- Font: 16px, weight 600
- Transition: all 0.2s ease
**States**:
- Default: Primary color background, white text
- Hover: 10% darker, slight scale (1.02), shadow elevation
- Active: 5% darker, scale (0.98)
- Disabled: 40% opacity, no pointer events
- Loading: Spinner animation, disabled state

#### Secondary Button
**Component Name**: `<Button variant="secondary">`
**Usage**: Alternative actions, cancel operations
**Specs**:
- Height: 48px (desktop), 44px (mobile)
- Padding: 16px 32px
- Border radius: 8px
- Border: 2px solid primary color
- Background: transparent
- Font: 16px, weight 600
**States**:
- Default: Border + primary text color
- Hover: Light primary background (10% opacity)
- Active: Medium primary background (20% opacity)
- Disabled: 40% opacity

#### Icon Button
**Component Name**: `<IconButton>`
**Usage**: Favorites, share, close modals
**Specs**:
- Size: 40x40px
- Border radius: 50% (circular) or 8px (rounded square)
- Icon size: 20px
