# QTrustBid - Quantum-Safe Real Estate Bidding Platform

A modern, secure real estate bidding platform featuring quantum-safe encryption, AI-powered recommendations, and role-based access control.

## 🚀 Features

### For Buyers
- **AI-Powered Property Recommendations** - Personalized suggestions based on preferences
- **Real-Time Bidding** - Secure, transparent bidding system
- **Personalization Assessment** - 5-step wizard to understand your needs
- **Favorites & Tracking** - Save properties and track your bids
- **Quantum-Safe Encryption** - Post-quantum cryptography protection

### For Sellers/Agents
- **Property Management** - Add, edit, and manage listings
- **Bid Management** - Accept or reject bids in real-time
- **Performance Analytics** - Track views, bids, and engagement
- **Expandable Listings** - Detailed view of each property

### For Admins
- **User Management** - Monitor and manage all platform users
- **Property Verification** - Approve and verify listings
- **Analytics Dashboard** - Revenue trends, user growth, performance metrics
- **Reports Center** - Generate and download platform reports

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Dark/Light Mode** - Theme switcher for user preference
- **Responsive Design** - Works seamlessly on all devices
- **Role-Based Navigation** - Adaptive menu based on user type
- **Interactive Modals** - Beautiful overlays for actions and details

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **CSS Modules** for scoped styling
- **Lucide React** for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Test Credentials

### Admin Account
```
Email: admin@qtrustbid.com
Password: admin123
```

### Seller Accounts
```
Email: seller@qtrustbid.com
Password: seller123

Email: agent@qtrustbid.com
Password: agent123
```

### Buyer Accounts
```
Email: buyer@qtrustbid.com
Password: buyer123

Email: bidder@qtrustbid.com
Password: bidder123
```

## 🗂️ Project Structure

```
qtrustbid/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Button, Input, Badge
│   │   ├── layout/         # Header, Footer
│   │   ├── property/       # PropertyCard
│   │   └── bidding/        # BidModal
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard, users, properties, analytics
│   │   ├── seller/         # Seller dashboard, listings, bids
│   │   ├── buyer/          # Buyer dashboard, properties, bids
│   │   ├── auth/           # Login, Signup
│   │   ├── Profile/        # User profile
│   │   └── Settings/       # User settings
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/               # Mock data
│   │   ├── mockProperties.ts
│   │   └── mockUsers.ts
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets
└── docs/                   # Documentation files
```

## 🎯 Key Features Implementation

### Role-Based Access Control
- Different dashboards for Admin, Seller, and Buyer
- Adaptive navigation menu based on user role
- Protected routes with authentication

### Property Management
- Add new properties with comprehensive form
- Edit and delete existing listings
- Expandable cards with detailed information
- Performance tracking (views, bids)

### Bid Management
- Real-time bid submission with quantum encryption
- Accept/reject bids for sellers
- Track bid history for buyers
- Status indicators (pending, accepted, rejected)

### Admin Tools
- User management with search and filters
- Property verification system
- Analytics with charts and metrics
- Report generation

### Personalization
- 5-step assessment wizard
- Property type preferences
- Budget range selection
- Location and amenity preferences
- Lifestyle matching

## 🔒 Security Features

- **Quantum-Safe Encryption** - Post-quantum cryptography
- **Secure Authentication** - Protected routes and sessions
- **Data Validation** - Input validation on all forms
- **Confirmation Dialogs** - Prevent accidental actions

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Adaptive layouts

## 🎨 Theming

- Light and dark mode support
- Consistent color palette
- CSS custom properties
- Smooth theme transitions

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Vite**
