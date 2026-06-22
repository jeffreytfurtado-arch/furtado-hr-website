import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/globals.css';

// Add robots meta tag only in development mode
if (import.meta.env.MODE === 'development') {
  const meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex, nofollow';
  document.head.appendChild(meta);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Auto-recover from stale code chunks after a new deploy.
// When a lazy-loaded chunk fails (its hashed filename no longer exists on the
// server because a newer build replaced it), reload once to pull the fresh build.
// A timestamp guard prevents any reload loop.
window.addEventListener('vite:preloadError', () => {
  const last = Number(sessionStorage.getItem('chunk-reload-ts') || 0);
  if (Date.now() - last > 10000) {
    sessionStorage.setItem('chunk-reload-ts', String(Date.now()));
    window.location.reload();
  }
});

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Root element not found');

const appJsx = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

if (rootElement.innerHTML.trim()) {
  ReactDOM.hydrateRoot(rootElement, appJsx);
} else {
  ReactDOM.createRoot(rootElement).render(appJsx);
}
