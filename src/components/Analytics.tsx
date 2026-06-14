import { useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { initClickTracking } from '@/lib/track';

export default function Analytics() {
  useEffect(() => {
    initClickTracking();
  }, []);
  return <VercelAnalytics />;
}
