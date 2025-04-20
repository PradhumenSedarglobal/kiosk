'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function NetworkStatus({ children }) {
  const [hasMounted, setHasMounted] = useState(false);
  const isOnline = useOnlineStatus();
  const router = useRouter();
  const wasOffline = useRef(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (!isOnline && router.pathname !== '/offline') {
      wasOffline.current = true;
      router.push('/offline');
    }

    if (isOnline && wasOffline.current && router.pathname === '/offline') {
      wasOffline.current = false;
      router.back(); // or router.push('/') based on your logic
    }
  }, [isOnline, hasMounted, router]);

  if (!hasMounted) {
    // Prevent rendering mismatched content until client hydration completes
    return null;
  }

  return children;
}
