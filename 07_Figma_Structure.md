# QTrustBid Design System - Part 7
## Figma Structure & Implementation Guide

---

## 8. FIGMA STRUCTURE & NAMING CONVENTIONS

### 8.1 File Organization

#### Main Figma File Structure
```
QTrustBid Design System
│
├── 📄 Cover Page
│   ├── Project overview
│   ├── Version history
│   └── Contributors
│
├── 🎨 Design Tokens
│   ├── Colors (Light & Dark)
│   ├── Typography Scale
│   ├── Spacing Scale
│   ├── Border Radius
│   ├── Shadows & Elevation
│   └── Breakpoints
│
├── 🧩 Components
│   ├── Buttons
│   ├── Form Elements
│   ├── Cards
│   ├── Navigation
│   ├── Modals
│   ├── Icons
│   ├── Badges & Tags
│   └── Data Display
│
├── 📱 Screens - Authentication
│   ├── Login (Light)
│   ├── Login (Dark)
│   ├── Signup (Light)
│   ├── Signup (Dark)
│   └── [All auth screens...]
│
├── 📱 Screens - Buyer Module
│   ├── Dashboard (Light)
│   ├── Dashboard (Dark)
│   ├── Property Listing (Light)
│   ├── Property Listing (Dark)
│   └── [All buyer screens...]
│
├── 📱 Screens - Seller Module
│   └── [All seller screens...]
│
├── 📱 Screens - Admin Module
│   └── [All admin screens...]
│
├── 🔄 User Flows
│   ├── Buyer Journey Map
│   ├── Seller Journey Map
│   └── Admin Journey Map
│
└── 📚 Documentation
    ├── Component Usage Guide
    ├── Accessibility Notes
    └── Developer Handoff
```

---

### 8.2 Naming Conventions

#### Page Naming
Format: `[Module] - [Screen Name] - [Theme]`
Examples:
- `Auth - Login - Light`
- `Buyer - Dashboard - Dark`
- `Seller - Create Listing Step 1 - Light`
