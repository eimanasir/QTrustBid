import React from 'react';
import ReactDOM from 'react-dom/client';

// Debug: Check if root element exists
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 40px; font-family: Arial;"><h1 style="color: red;">Error: Root element not found!</h1><p>The #root div is missing from index.html</p></div>';
} else {
  try {
    // Try to import App
    import('./App').then((AppModule) => {
      console.log('App module loaded:', AppModule);
      const App = AppModule.default;
      
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log('App rendered successfully!');
    }).catch((error) => {
      console.error('Failed to load App:', error);
      rootElement.innerHTML = `
        <div style="padding: 40px; font-family: Arial;">
          <h1 style="color: red;">Failed to load App</h1>
          <p>Error: ${error.message}</p>
          <pre style="background: #f0f0f0; padding: 20px; border-radius: 8px; overflow: auto;">${error.stack}</pre>
        </div>
      `;
    });
  } catch (error: any) {
    console.error('Error during initialization:', error);
    rootElement.innerHTML = `
      <div style="padding: 40px; font-family: Arial;">
        <h1 style="color: red;">Initialization Error</h1>
        <p>Error: ${error.message}</p>
      </div>
    `;
  }
}
