'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface ScratchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onScratch: () => void;
}

const ScratchPopup: React.FC<ScratchPopupProps> = ({
  isOpen,
  onClose,
  onScratch
}) => {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [showGiftAnimation, setShowGiftAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsScratched(false);
      setScratchProgress(0);
      
      // Initialize scratch layer
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Create silver scratch layer
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#C0C0C0');
          gradient.addColorStop(0.5, '#E8E8E8');
          gradient.addColorStop(1, '#A8A8A8');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add some texture
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          for (let i = 0; i < 50; i++) {
            ctx.fillRect(
              Math.random() * canvas.width,
              Math.random() * canvas.height,
              Math.random() * 3 + 1,
              Math.random() * 3 + 1
            );
          }
        }
      }
    }
  }, [isOpen]);

  const handleScratch = (e: React.MouseEvent) => {
    if (isScratched) return;
    
    setIsScratching(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create scratch effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Simple progress calculation - just count scratches
    setScratchProgress(prev => {
      const newProgress = Math.min(prev + 3, 100);
      console.log(`Scratch progress: ${newProgress}%`);
      
      // If scratched at least 80%, trigger the result
      if (newProgress >= 80) {
        console.log('Scratch threshold reached! Opening coupon...');
        setIsScratched(true);
        setShowGiftAnimation(true);
        
        // Show gift box opening animation for 1.5 seconds, then open coupon
        setTimeout(() => {
          setShowGiftAnimation(false);
          onScratch();
        }, 1500);
      }
      
      return newProgress;
    });
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    handleScratch(mouseEvent as any);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    handleScratch(mouseEvent as any);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMouseUp();
  };

  if (!isOpen) return null;

  const GiftBoxIcon = () => (
    <Image
      src="/giftbox.png"
      alt="Gift Box"
      width={60}
      height={60}
      style={{ objectFit: 'contain' }}
    />
  );

  const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
    <Box
      sx={{
        position: 'absolute',
        width: '4px',
        height: '4px',
        backgroundColor: 'white',
        borderRadius: '50%',
        ...style
      }}
    />
  );

  const StarConfetti = ({ style }: { style: React.CSSProperties }) => (
    <Box
      sx={{
        position: 'absolute',
        width: '6px',
        height: '6px',
        backgroundColor: 'white',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        ...style
      }}
    />
  );

  const StreamerPiece = ({ style }: { style: React.CSSProperties }) => (
    <Box
      sx={{
        position: 'absolute',
        width: '8px',
        height: '2px',
        backgroundColor: 'white',
        borderRadius: '1px',
        ...style
      }}
    />
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Main Popup Content */}
      <Box
        sx={{
          position: 'relative',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Confetti and Decorations */}
        <ConfettiPiece style={{ top: '20px', left: '30px' }} />
        <ConfettiPiece style={{ top: '40px', right: '25px' }} />
        <ConfettiPiece style={{ bottom: '60px', left: '20px' }} />
        <ConfettiPiece style={{ bottom: '30px', right: '40px' }} />
        <ConfettiPiece style={{ top: '60px', left: '50%' }} />
        <ConfettiPiece style={{ bottom: '80px', left: '60%' }} />
        
        <StarConfetti style={{ top: '30px', left: '60px' }} />
        <StarConfetti style={{ top: '70px', right: '30px' }} />
        <StarConfetti style={{ bottom: '50px', left: '40px' }} />
        <StarConfetti style={{ bottom: '20px', right: '60px' }} />
        
        <StreamerPiece style={{ top: '50px', left: '80px', transform: 'rotate(45deg)' }} />
        <StreamerPiece style={{ top: '80px', right: '50px', transform: 'rotate(-30deg)' }} />
        <StreamerPiece style={{ bottom: '70px', left: '70px', transform: 'rotate(60deg)' }} />
        <StreamerPiece style={{ bottom: '40px', right: '80px', transform: 'rotate(-45deg)' }} />

        {/* Gift Box Opening Animation Overlay */}
        {showGiftAnimation && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 10,
              animation: 'fadeIn 0.3s ease-in'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'giftBoxOpen 1.5s ease-in-out'
              }}
            >
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  marginBottom: '20px'
                }}
              >
                <GiftBoxIcon />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                Opening Gift Box...
              </Typography>
            </Box>
          </Box>
        )}

        {/* Scratch Card Area */}
        <Box
          sx={{
            width: '200px',
            height: '200px',
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            cursor: isScratching ? 'grabbing' : 'grab'
          }}
        >
          {/* Gift Box Background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <GiftBoxIcon />
          </Box>

          {/* Scratch Layer Canvas */}
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              cursor: isScratching ? 'grabbing' : 'grab',
              touchAction: 'none'
            }}
            onMouseDown={handleScratch}
            onMouseMove={handleScratch}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => {
              // Fallback: if user clicks without dragging, still trigger
              if (scratchProgress < 5) {
                console.log('Click fallback triggered');
                setScratchProgress(85);
                setIsScratched(true);
                setShowGiftAnimation(true);
                
                setTimeout(() => {
                  setShowGiftAnimation(false);
                  onScratch();
                }, 1500);
              }
            }}
          />

          {/* Scratch Instructions */}
          {!isScratched && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontSize: '12px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}
              >
                Scratch to reveal!
              </Typography>
            </Box>
          )}
        </Box>


      </Box>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes giftBoxOpen {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          80% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default ScratchPopup;
