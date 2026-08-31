import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 93;
const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 64;

export const ScrollBackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, radius: 180 });
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);

  // Initialize Particles (Festival Embers & Cosmic Sparks)
  const initParticles = (w, h) => {
    const particles = [];
    const colors = [
      'rgba(236, 72, 153, ', // Magenta
      'rgba(6, 182, 212, ',  // Cyan
      'rgba(139, 92, 246, ', // Violet
      'rgba(245, 158, 11, ', // Amber
      'rgba(255, 255, 255, ' // Pure White
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.8 + 0.8,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: -Math.random() * 0.65 - 0.2, // Drifting upward
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
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

  // Mouse & Touch Tracking for Interactive Stage Lighting Spotlights
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      mouseRef.current = {
        x: e.clientX * dpr,
        y: e.clientY * dpr,
        active: true,
        radius: 220 * dpr
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
          radius: 160 * dpr
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

  // Smooth scroll listener with linear interpolation & velocity calculation
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const now = Date.now();
      const dt = Math.max(1, now - lastScrollTimeRef.current);
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current);
      
      // Calculate instantaneous scroll velocity
      scrollVelocityRef.current = Math.min(15, (scrollDiff / dt) * 12);

      lastScrollYRef.current = currentScrollY;
      lastScrollTimeRef.current = now;

      const progress = Math.max(0, Math.min(1, currentScrollY / maxScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let time = 0;

    // Master High-Performance Visual Render Loop
    const renderLoop = () => {
      time += 0.016;

      // Decay scroll velocity gradually
      scrollVelocityRef.current *= 0.92;

      // Smooth LERP frame interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.002) {
        currentFrameRef.current += diff * 0.16;
      }

      const canvas = canvasRef.current;
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));
          const progress = frameIndex / (TOTAL_FRAMES - 1);
          const velocity = scrollVelocityRef.current;

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // 1. Draw Base Concert Video Frame with Camera Parallax & Subtle Zoom
          const img = imagesRef.current[frameIndex];
          if (img && img.complete && img.naturalWidth > 0) {
            // True 'background-size: cover' algorithm with dynamic subtle zoom (1.00 -> 1.08)
            const zoom = 1.0 + progress * 0.07 + Math.min(0.04, velocity * 0.003);
            const hRatio = canvasWidth / img.naturalWidth;
            const vRatio = canvasHeight / img.naturalHeight;
            const baseRatio = Math.max(hRatio, vRatio);
            const ratio = baseRatio * zoom;

            const renderWidth = img.naturalWidth * ratio;
            const renderHeight = img.naturalHeight * ratio;
            const offsetX = (canvasWidth - renderWidth) / 2;
            const offsetY = (canvasHeight - renderHeight) / 2 + (progress * 18 * (canvasHeight / 1000));

            ctx.fillStyle = '#07080b';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, renderWidth, renderHeight);
          } else {
            ctx.fillStyle = '#07080b';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }

          // 2. Kinetic Volumetric Stage Laser Beams (Multi-colored concert light sweeps)
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          const stageOriginX = canvasWidth * 0.5;
          const stageOriginY = canvasHeight * 0.28; // Emitted from cathedral arch apex

          const laserCount = 6;
          const laserColors = [
            'rgba(236, 72, 153, ', // Pink / Magenta
            'rgba(6, 182, 212, ',  // Cyan
            'rgba(168, 85, 247, ', // Purple
            'rgba(245, 158, 11, ', // Gold / Amber
            'rgba(16, 185, 129, ', // Emerald
            'rgba(59, 130, 246, '  // Electric Blue
          ];

          for (let i = 0; i < laserCount; i++) {
            const angleOffset = ((i - (laserCount - 1) / 2) * 0.28);
            const sweep = Math.sin(time * 1.2 + i * 1.5 + progress * Math.PI * 2) * (0.35 + velocity * 0.05);
            const angle = Math.PI * 0.5 + angleOffset + sweep;

            const beamLength = Math.max(canvasWidth, canvasHeight) * 1.4;
            const targetX = stageOriginX + Math.cos(angle) * beamLength;
            const targetY = stageOriginY + Math.sin(angle) * beamLength;

            const beamWidth = (Math.sin(time * 2 + i) * 6 + 18) * (1 + velocity * 0.08);

            const laserGrad = ctx.createLinearGradient(stageOriginX, stageOriginY, targetX, targetY);
            const baseAlpha = 0.22 + Math.sin(time * 3 + i) * 0.08 + Math.min(0.35, velocity * 0.04);
            laserGrad.addColorStop(0, `${laserColors[i % laserColors.length]}${baseAlpha * 1.4})`);
            laserGrad.addColorStop(0.35, `${laserColors[i % laserColors.length]}${baseAlpha * 0.7})`);
            laserGrad.addColorStop(1, `${laserColors[i % laserColors.length]}0)`);

            ctx.lineWidth = beamWidth;
            ctx.strokeStyle = laserGrad;
            ctx.beginPath();
            ctx.moveTo(stageOriginX, stageOriginY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();

            // Core laser beam highlight (thin white intense laser line)
            ctx.lineWidth = Math.max(1.5, beamWidth * 0.15);
            ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha * 0.85})`;
            ctx.beginPath();
            ctx.moveTo(stageOriginX, stageOriginY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
          }

          // 3. Stage Horizon Pulsing Glow (Simulating massive stage lights & pyros)
          const glowGrad = ctx.createRadialGradient(
            stageOriginX, stageOriginY + canvasHeight * 0.05, 10,
            stageOriginX, stageOriginY + canvasHeight * 0.05, canvasWidth * 0.65
          );
          const glowAlpha = 0.25 + Math.sin(time * 2) * 0.08 + Math.min(0.2, velocity * 0.03);
          const hueShift = Math.sin(time * 0.5 + progress * Math.PI) > 0 ? '236, 72, 153, ' : '139, 92, 246, ';
          glowGrad.addColorStop(0, `rgba(${hueShift}${glowAlpha * 1.5})`);
          glowGrad.addColorStop(0.5, `rgba(${hueShift}${glowAlpha * 0.4})`);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGrad;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // 4. Interactive Mouse / Touch Spotlight Flashlight
          if (mouseRef.current.active) {
            const { x, y, radius } = mouseRef.current;
            const mouseGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            mouseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
            mouseGrad.addColorStop(0.4, 'rgba(236, 72, 153, 0.12)');
            mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = mouseGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }

          // 5. Floating Festival Embers & Cosmic Sparks
          const particles = particlesRef.current;
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Upward drift with scroll velocity kick
            p.y += p.speedY - velocity * 0.8;
            p.x += p.speedX + Math.sin(time + i) * 0.35;

            // Wrap around screen boundaries smoothly
            if (p.y < -20) p.y = canvasHeight + 20;
            if (p.y > canvasHeight + 20) p.y = -20;
            if (p.x < -20) p.x = canvasWidth + 20;
            if (p.x > canvasWidth + 20) p.x = -20;

            const alphaPulse = p.alpha + Math.sin(time * 3 + p.pulseOffset) * 0.18;
            const currentAlpha = Math.max(0.1, Math.min(0.9, alphaPulse + velocity * 0.05));
            const particleRadius = p.size * (1 + velocity * 0.06);

            // Draw glowing particle spark
            ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
            ctx.fill();

            // Particle light tail when scrolling fast
            if (velocity > 1.5) {
              ctx.strokeStyle = `${p.colorPrefix}${currentAlpha * 0.5})`;
              ctx.lineWidth = particleRadius * 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x, p.y + velocity * 4.5);
              ctx.stroke();
            }
          }

          ctx.restore();

          // 6. Refined Atmospheric Vignette & Contrast Shading
          // Keeps typography crisp while letting the stadium stage & lasers shine brilliantly
          const vignette = ctx.createRadialGradient(
            canvasWidth * 0.5, canvasHeight * 0.45, canvasWidth * 0.2,
            canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.78
          );
          vignette.addColorStop(0, 'rgba(7, 8, 11, 0.25)');
          vignette.addColorStop(0.65, 'rgba(7, 8, 11, 0.68)');
          vignette.addColorStop(1, 'rgba(7, 8, 11, 0.94)');

          ctx.fillStyle = vignette;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // Subtle Bottom Stage Fade to blend seamlessly with cards and footer
          const bottomFade = ctx.createLinearGradient(0, canvasHeight * 0.7, 0, canvasHeight);
          bottomFade.addColorStop(0, 'rgba(7, 8, 11, 0)');
          bottomFade.addColorStop(1, 'rgba(7, 8, 11, 0.85)');
          ctx.fillStyle = bottomFade;
          ctx.fillRect(0, canvasHeight * 0.7, canvasWidth, canvasHeight * 0.3);
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
      {/* Full-width full-height high-performance canvas */}
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

