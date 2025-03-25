
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from './components/ui/sonner';

// Get the root element and check if it exists
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Create root and render the application
createRoot(rootElement).render(
  <React.StrictMode>
    <Toaster position="top-right" richColors closeButton />
    <App />
  </React.StrictMode>
);

// Add console logs for debugging
console.log('Main.tsx loaded and rendered');
