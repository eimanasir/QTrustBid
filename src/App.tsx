import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { LiveChat } from '@/components/chat/LiveChat/LiveChat';
import Landing from '@/pages/Landing/Landing';
import { Login } from '@/pages/auth/Login/Login';
import { Signup } from '@/pages/auth/Signup/Signup';
import { OAuthCallback } from '@/pages/auth/OAuthCallback/OAuthCallback';
import { Dashboard } from '@/pages/buyer/Dashboard/Dashboard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard/AdminDashboard';
import { PropertyListing } from '@/pages/buyer/PropertyListing/PropertyListing';
import { PropertyDetails } from '@/pages/buyer/PropertyDetails/PropertyDetails';
import { MyBids } from '@/pages/buyer/MyBids/MyBids';
import { Favorites } from '@/pages/buyer/Favorites/Favorites';
import { Profile } from '@/pages/Profile/Profile';
import { Settings } from '@/pages/Settings/SettingsPage';
import { Notifications } from '@/pages/Notifications/Notifications';
import { Contact } from '@/pages/Contact/Contact';
import { FAQ } from '@/pages/FAQ/FAQ';
// Admin pages
import { Users } from '@/pages/admin/Users/Users';
import { Properties as AdminProperties } from '@/pages/admin/Properties/Properties';
import { Analytics } from '@/pages/admin/Analytics/Analytics';
import { Reports } from '@/pages/admin/Reports/Reports';
// Seller pages
import { MyListings } from '@/pages/seller/MyListings/MyListings';
import { AddProperty } from '@/pages/seller/AddProperty/AddProperty';
import { BidsReceived } from '@/pages/seller/BidsReceived/BidsReceived';
// Buyer pages
import { PersonalizationAssessment } from '@/pages/buyer/PersonalizationAssessment/PersonalizationAssessment';
import { LiveBidding } from '@/pages/buyer/LiveBidding/LiveBidding';
import '@/styles/global.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <Dashboard />;
  }
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardRouter />
          </PrivateRoute>
        }
      />
      <Route
        path="/properties"
        element={
          <PrivateRoute>
            <PropertyListing />
          </PrivateRoute>
        }
      />
      <Route
        path="/properties/:id"
        element={
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-bids"
        element={
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/admin/properties" element={<PrivateRoute><AdminProperties /></PrivateRoute>} />
      <Route path="/admin/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
      <Route path="/admin/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      
      {/* Seller Routes */}
      <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
      <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
      <Route path="/bids-received" element={<PrivateRoute><BidsReceived /></PrivateRoute>} />
      
      {/* Buyer Routes */}
      <Route path="/personalization" element={<PrivateRoute><PersonalizationAssessment /></PrivateRoute>} />
      <Route path="/live-bidding/:id" element={<PrivateRoute><LiveBidding /></PrivateRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <AppRoutes />
            </main>
            <Footer />
            <LiveChat />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;