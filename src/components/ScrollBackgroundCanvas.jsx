import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 93;
const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 36;

export const ScrollBackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnImgRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, radius: 180 });
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);

  // Initialize Gentle Ambient Particles (Soft festival embers)
  const initParticles = (w, h) => {
    const particles = [];
    const colors = [
      'rgba(236, 72, 153, ', // Soft Magenta
      'rgba(6, 182, 212, ',  // Soft Cyan
      'rgba(139, 92, 246, ', // Soft Violet
      'rgba(245, 158, 11, '  // Soft Amber
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.0 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // Calm upward drift
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.25 + 0.12,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
    particlesRef.current = particles;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 768;
    const dpr = isMobile ? Math.min(1.5, window.devicePixelRatio || 1) : Math.min(2, window.devicePixelRatio || 1);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetW = Math.floor(displayWidth * dpr);
    const targetH = Math.floor(displayHeight * dpr);

    if (Math.abs(canvas.width - targetW) > 10 || Math.abs(canvas.height - targetH) > 10) {
      canvas.width = targetW;
      canvas.height = targetH;
      initParticles(targetW, targetH);
    }
  };

  // Preload all 93 frames smoothly
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          lastDrawnImgRef.current = img;
          resizeCanvas();
        }
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Window resize & orientation change listener
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Mouse & Touch Tracking for Interactive Stage Lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      mouseRef.current = {
        x: e.clientX * dpr,
        y: e.clientY * dpr,
        active: true,
        radius: 200 * dpr
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        mouseRef.current = {
          x: e.touches[0].clientX * dpr,
          y: e.touches[0].clientY * dpr,
          active: true,
          radius: 140 * dpr
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  // Smooth scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const currentScrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, currentScrollY / maxScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let time = 0;

    // High-Performance Flicker-Free Visual Render Loop
    const renderLoop = () => {
      time += 0.016;

      // Silky smooth LERP frame interpolation (no sudden frame snapping or strobe)
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.1;
      }

      const canvas = canvasRef.current;
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));
          const progress = frameIndex / (TOTAL_FRAMES - 1);

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // 1. Draw Base Concert Video Frame with smooth aspect ratio and no blank flash
          const requestedImg = imagesRef.current[frameIndex];
          const imgToDraw = (requestedImg && requestedImg.complete && requestedImg.naturalWidth > 0)
            ? requestedImg
            : lastDrawnImgRef.current;

          if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
            lastDrawnImgRef.current = imgToDraw;

            // Stable, subtle zoom without velocity jerks
            const zoom = 1.0 + progress * 0.04;
            const hRatio = canvasWidth / imgToDraw.naturalWidth;
            const vRatio = canvasHeight / imgToDraw.naturalHeight;
            const baseRatio = Math.max(hRatio, vRatio);
            const ratio = baseRatio * zoom;

            const renderWidth = imgToDraw.naturalWidth * ratio;
            const renderHeight = imgToDraw.naturalHeight * ratio;
            const offsetX = (canvasWidth - renderWidth) / 2;
            const offsetY = (canvasHeight - renderHeight) / 2 + (progress * 12 * (canvasHeight / 1000));

            ctx.drawImage(imgToDraw, 0, 0, imgToDraw.naturalWidth, imgToDraw.naturalHeight, offsetX, offsetY, renderWidth, renderHeight);
          } else {
            ctx.fillStyle = '#07080b';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }

          // 2. Stage Volumetric Light Beams (Soft, elegant concert sweeps with reduced opacity & no flashing)
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          const stageOriginX = canvasWidth * 0.5;
          const stageOriginY = canvasHeight * 0.28;

          const laserCount = 6;
          const laserColors = [
            'rgba(236, 72, 153, ', // Pink / Magenta
            'rgba(6, 182, 212, ',  // Cyan
            'rgba(168, 85, 247, ', // Purple
            'rgba(245, 158, 11, ', // Amber
            'rgba(16, 185, 129, ', // Emerald
            'rgba(59, 130, 246, '  // Electric Blue
          ];

          for (let i = 0; i < laserCount; i++) {
            const angleOffset = ((i - (laserCount - 1) / 2) * 0.26);
            const sweep = Math.sin(time * 0.8 + i * 1.3 + progress * Math.PI * 1.5) * 0.28;
            const angle = Math.PI * 0.5 + angleOffset + sweep;

            const beamLength = Math.max(canvasWidth, canvasHeight) * 1.35;
            const targetX = stageOriginX + Math.cos(angle) * beamLength;
            const targetY = stageOriginY + Math.sin(angle) * beamLength;

            const beamWidth = Math.sin(time * 1.2 + i) * 3 + 14;

            const laserGrad = ctx.createLinearGradient(stageOriginX, stageOriginY, targetX, targetY);
            // Reduced, soft atmospheric opacity (comfortable and gentle on the eyes)
            const baseAlpha = 0.08 + Math.sin(time * 1.5 + i) * 0.02;
            laserGrad.addColorStop(0, `${laserColors[i % laserColors.length]}${baseAlpha * 1.4})`);
            laserGrad.addColorStop(0.4, `${laserColors[i % laserColors.length]}${baseAlpha * 0.7})`);
            laserGrad.addColorStop(1, `${laserColors[i % laserColors.length]}0)`);

            ctx.lineWidth = beamWidth;
            ctx.strokeStyle = laserGrad;
            ctx.beginPath();
            ctx.moveTo(stageOriginX, stageOriginY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();

            // Soft core highlight (subtle, low-contrast, non-glaring)
            ctx.lineWidth = Math.max(1, beamWidth * 0.12);
            ctx.strokeStyle = `${laserColors[i % laserColors.length]}${baseAlpha * 0.85})`;
            ctx.beginPath();
            ctx.moveTo(stageOriginX, stageOriginY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
          }

          // Gentle Ambient Horizon Flare (Soft stage glow)
          const glowGrad = ctx.createRadialGradient(
            stageOriginX, stageOriginY + canvasHeight * 0.05, 10,
            stageOriginX, stageOriginY + canvasHeight * 0.05, canvasWidth * 0.55
          );
          glowGrad.addColorStop(0, 'rgba(236, 72, 153, 0.12)');
          glowGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.06)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGrad;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // 3. Subtle Interactive Mouse / Touch Soft Spotlight
          if (mouseRef.current.active) {
            const { x, y, radius } = mouseRef.current;
            const mouseGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            mouseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
            mouseGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.04)');
            mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = mouseGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }

          // 4. Floating Gentle Ambient Embers (Soft, calm drift with no jarring tails or strobe)
          const particles = particlesRef.current;
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.y += p.speedY;
            p.x += p.speedX + Math.sin(time * 0.8 + i) * 0.15;

            // Wrap boundaries smoothly
            if (p.y < -10) p.y = canvasHeight + 10;
            if (p.y > canvasHeight + 10) p.y = -10;
            if (p.x < -10) p.x = canvasWidth + 10;
            if (p.x > canvasWidth + 10) p.x = -10;

            const alphaPulse = p.baseAlpha + Math.sin(time * 1.5 + p.pulseOffset) * 0.06;
            const currentAlpha = Math.max(0.08, Math.min(0.4, alphaPulse));

            ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();

          // 5. Deep Atmospheric Contrast Vignette (Keeps content crystal clear & completely eye-friendly)
          const vignette = ctx.createRadialGradient(
            canvasWidth * 0.5, canvasHeight * 0.45, canvasWidth * 0.2,
            canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.8
          );
          vignette.addColorStop(0, 'rgba(7, 8, 11, 0.35)');
          vignette.addColorStop(0.6, 'rgba(7, 8, 11, 0.72)');
          vignette.addColorStop(1, 'rgba(7, 8, 11, 0.95)');

          ctx.fillStyle = vignette;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // Smooth bottom gradient transition into cards & footer
          const bottomFade = ctx.createLinearGradient(0, canvasHeight * 0.65, 0, canvasHeight);
          bottomFade.addColorStop(0, 'rgba(7, 8, 11, 0)');
          bottomFade.addColorStop(1, 'rgba(7, 8, 11, 0.92)');
          ctx.fillStyle = bottomFade;
          ctx.fillRect(0, canvasHeight * 0.65, canvasWidth, canvasHeight * 0.35);
        }
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};


