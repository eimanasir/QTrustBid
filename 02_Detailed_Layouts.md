# QTrustBid Design System - Part 2
## Detailed Screen Layouts

---

## 3. DETAILED LAYOUTS FOR KEY SCREENS

### Layout Principles
- **Grid System**: 12-column responsive grid
- **Spacing Scale**: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 96px)
- **Max Content Width**: 1440px for desktop
- **Breakpoints**: 
  - Mobile: 320-767px
  - Tablet: 768-1023px
  - Desktop: 1024-1439px
  - Large Desktop: 1440px+

---

### 3.1 AUTH-01: Login Screen

#### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [Logo]                                    [Dark Mode]  │
│                                                         │
│         ┌───────────────────────────────┐              │
│         │                               │              │
│         │   Welcome Back to QTrustBid   │  ← H1, 32px │
│         │   Quantum-Safe Real Estate    │  ← Body, 16px│
│         │                               │              │
│         │   [🔒 Quantum Protected]      │  ← Badge    │
│         │                               │              │
│         │   Email                       │              │
│         │   [________________]          │  ← Input    │
│         │                               │              │
│         │   Password                    │              │
│         │   [________________] [👁]     │  ← Input+Icon│
│         │                               │              │
│         │   [✓] Remember me             │  ← Checkbox │
│         │              Forgot Password? │  ← Link     │
│         │                               │              │
