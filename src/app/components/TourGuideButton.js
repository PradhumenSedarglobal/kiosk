'use client';

import { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { Button } from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';

const TourGuideButton = ({ steps }) => {
  const [runTour, setRunTour] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleStartTour = () => {
    setRunTour(true);
    setButtonVisible(false); // Hide after starting the tour
  };

  const handleTourCallback = (data) => {
    const { action, status } = data;

    // Immediately stop the tour if close button is clicked
    if (action === 'close') {
      setRunTour(false);
      setButtonVisible(false);
      return;
    }

    if (['finished', 'skipped'].includes(status)) {
      setRunTour(false);
      setButtonVisible(false); // Hide button permanently on skip/close
    }
  };

  if (!hasMounted) {
    // Avoid hydration mismatch
    return <div style={{ width: 0, height: 0 }} />;
  }

  return (
    <>
      {buttonVisible && (
        <Button
          onClick={handleStartTour}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #ff9800, #ffb74d)',
            color: '#ffffff',
            position: "fixed",
            zIndex: 999,
            top: "10px",
            right: {
              lg: "calc(100vw - 58%)",
            },
            "@media (min-width: 375px) and (max-width: 959px)": {
              right: "calc(100vw - 98%)",
            },
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '8px',
            padding: 0,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #fb8c00, #ffa726)',
            }
          }}
          aria-label="start-tour"
        >
          <TourIcon sx={{ fontSize: '1.25rem', color: '#fff' }} />
        </Button>
      )}

      <Joyride
        steps={steps}
        run={runTour}
        callback={handleTourCallback}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        hideCloseButton={false} // Ensure close button is visible
        styles={{
          options: {
            zIndex: 1400,
            primaryColor: '#ff9800',
          },
        }}
      />
    </>
  );
};

export default TourGuideButton;