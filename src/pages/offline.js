import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const router = useRouter();
  const [online, setOnline] = useState(false);

  // Watch for connection restoration
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    setOnline(navigator.onLine); // initial status

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (online) {
      router.push('/'); // move to home page without reload
    } else {
      alert('Still offline. Please check your connection.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>You're Offline</h1>
      <p>Please check your internet connection and try again.</p>
      <button 
        onClick={handleRetry}
        style={{
          padding: '10px 20px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Retry Connection
      </button>
    </div>
  );
}
