
import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Orbits and celestial objects
    const orbits: Array<{ 
      centerX: number; 
      centerY: number; 
      radiusX: number; 
      radiusY: number; 
      angle: number; 
      speed: number;
      opacity: number;
    }> = [];
    
    const satellites: Array<{ 
      orbitIndex: number; 
      angle: number; 
      speed: number; 
      size: number;
    }> = [];

    // Create orbital paths
    for (let i = 0; i < 5; i++) {
      orbits.push({
        centerX: canvas.width * (0.2 + Math.random() * 0.6),
        centerY: canvas.height * (0.2 + Math.random() * 0.6),
        radiusX: 100 + Math.random() * 200,
        radiusY: 60 + Math.random() * 120,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        opacity: 0.1 + Math.random() * 0.3
      });
    }

    // Create satellites on orbits
    for (let i = 0; i < orbits.length; i++) {
      satellites.push({
        orbitIndex: i,
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
        size: 2 + Math.random() * 3
      });
    }

    // Stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number; twinkle: number }> = [];
    
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2,
        twinkle: Math.random() * 0.02
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw orbital paths
      orbits.forEach((orbit, index) => {
        ctx.beginPath();
        ctx.ellipse(orbit.centerX, orbit.centerY, orbit.radiusX, orbit.radiusY, orbit.angle, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 100, 100, ${orbit.opacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Update orbit rotation
        orbit.angle += orbit.speed;
      });

      // Draw satellites on orbits
      satellites.forEach(satellite => {
        const orbit = orbits[satellite.orbitIndex];
        const x = orbit.centerX + Math.cos(satellite.angle) * orbit.radiusX * Math.cos(orbit.angle) - Math.sin(satellite.angle) * orbit.radiusY * Math.sin(orbit.angle);
        const y = orbit.centerY + Math.cos(satellite.angle) * orbit.radiusX * Math.sin(orbit.angle) + Math.sin(satellite.angle) * orbit.radiusY * Math.cos(orbit.angle);
        
        ctx.beginPath();
        ctx.arc(x, y, satellite.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60, 60, 60, 0.8)';
        ctx.fill();
        
        // Draw satellite trail
        const prevX = orbit.centerX + Math.cos(satellite.angle - 0.1) * orbit.radiusX * Math.cos(orbit.angle) - Math.sin(satellite.angle - 0.1) * orbit.radiusY * Math.sin(orbit.angle);
        const prevY = orbit.centerY + Math.cos(satellite.angle - 0.1) * orbit.radiusX * Math.sin(orbit.angle) + Math.sin(satellite.angle - 0.1) * orbit.radiusY * Math.cos(orbit.angle);
        
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(120, 120, 120, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        satellite.angle += satellite.speed;
      });
      
      // Draw twinkling stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 150, ${star.opacity})`;
        ctx.fill();
        
        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.1, Math.min(0.7, star.opacity));
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)' }}
    />
  );
};

export default SpaceBackground;
