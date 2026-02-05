import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    const error = searchParams.get('error');

    console.log('OAuth Callback - Token:', token);
    console.log('OAuth Callback - User:', user);
    console.log('OAuth Callback - Error:', error);

    if (error) {
      console.error('OAuth Error:', error);
      navigate('/login', { state: { error } });
      return;
    }

    if (token) {
      try {
        // Store token
        localStorage.setItem('access_token', token);
        
        // Parse and store user if provided
        if (user) {
          const userData = JSON.parse(decodeURIComponent(user));
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        console.log('Redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Error processing OAuth callback:', err);
        navigate('/login', { state: { error: 'Authentication failed' } });
      }
    } else {
      console.error('No token received');
      navigate('/login', { state: { error: 'No token received' } });
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ 
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
      }} />
      <p>Completing authentication...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};